(function () {

    /**
     * Registers a new hotspot tour. Hotspot tours are little pulsating dots that are placed on elements,
     * allowing you to guide a user through a path or just call out an item on the page.
     *
     * @param {Object} opts
     * ... {Array[Object]} steps - array of steps in the tour. Check the StepModel for object properties
     * ... {String} syncKey - unique key that will be used on the server to persist whether the tour has been dismissed
     * ... {Function} shouldRegisterTourCheck - an optional function that contains business logic to check if the tour
     *  should be registered. The function should return a boolean or a $.Deferred that resolves to a boolean. "true"
     *  means that the tour should be registered, "false" means that it won't be register
     * @param deps
     * ... {Object} brace - backbone brace library reference
     * ... {Object} jQuery - jQuery brace library reference
     * ... {Object} _ - underscore library reference
     */
    Chaperone.registerHotspotTour = function (opts, deps) {
        deps = deps || {};

        var syncing = Chaperone._internal.syncing;

        var _jQuery = deps.jQuery || window.jQuery;
        var defaultLibs = {
            underscore: window._,
            brace: window.Brace
        };

        deps = _jQuery.extend(defaultLibs, deps);

        var __ = deps.underscore;
        var _Brace = deps.brace;

        var StepModel = _Brace.Model.extend({
            namedAttributes: {
                selector: undefined,
                dismissingSelectors: undefined,
                tooltipText: String,
                tooltipOptions: Object,
                styleClass: String,
                dismissed: Boolean,
                onDismiss: Function,
                onShow: Function,
                offsetRight: String,
                offsetTop: String
            },
            /**
             * Resolves the css selector string for target. The target being the element the callout will be positioned against.
             * @returns {String} selector
             */
            resolveSelector: function () {
                var selector = this.getSelector();
                if (__.isFunction(selector)) {
                    selector = selector();
                }
                return selector;
            },
            /**
             * Resolves the css selector string for dismissing elements. The elements that when clicked will dismiss the step.
             * @returns {String} selector
             */
            resolveDismissingSelectors: function () {
                if (this.getDismissingSelectors()) {
                    var selector = this.getDismissingSelectors();
                    if (__.isFunction(selector)) {
                        selector = selector();
                    }
                    return selector;
                } else {
                    return this.resolveSelector();
                }
            }
        });

        var StepCollection = _Brace.Collection.extend({
            model: StepModel
        });

        var StepView = _Brace.View.extend({
            template: chaperone.hotspot.spot,

            render: function ($elem) {
                var $html = _jQuery(this.template(this.model.toJSON()));
                if (this.model.getOffsetRight() !== undefined) {
                    $html.css("right", this.model.getOffsetRight());
                }
                if (this.model.getOffsetTop() !== undefined) {
                    $html.css("top", this.model.getOffsetTop());
                }
                var tooltipDefaults = {
                    gravity: 's',
                    delayIn: 0
                };
                $html.tooltip(_jQuery.extend(tooltipDefaults, this.model.getTooltipOptions()));
                $html.click(function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $elem.click();
                });
                $elem.addClass("chaperone-hotspot-anchor");
                $elem.append($html);
                this.$elem = $elem;
                this.$el = $html;
            },

            dismiss: function () {
                this.trigger("dismissed");
                if (this.$el) {
                    this.$el.remove();
                }
                if (this.$elem) {
                    this.$elem.removeClass("chaperone-hotspot-anchor");
                }
            }
        });


        var HotspotModule = _Brace.View.extend({

            initialize: function (opts) {
                this._shouldRegisterTour(opts).done(__.bind(function (shouldRegister) {
                    if (typeof shouldRegister !== 'boolean') {
                        throw new Error('shouldRegisterTourCheck() function should return, or resolve to, a boolean');
                    }

                    if (!shouldRegister) {
                        return;
                    }

                    this.stepCollection = new StepCollection(opts.steps);
                    this.stepViews = this.stepCollection.map(__.bind(function (model) {
                        var view = new StepView({model: model});
                        this.listenTo(view, "dismissed", function () {
                            // Do all the dismiss stuff here
                            view.model.setDismissed(true);
                            if (view.model.getOnDismiss()) {
                                view.model.getOnDismiss()();
                            }
                            if (opts.syncKey) {
                                syncing.syncToServer(opts.syncKey, JSON.stringify({dismissed: true}));
                            }
                            _jQuery(document).unbindArrive(view.model.resolveSelector());
                            this.renderNextStep()
                        }.bind(this));
                        return view;
                    }, this));
                    this.renderNextStep();
                }, this));
            },

            /**
             * Adds the hotspot to the element found by the selector for that step (if not found immediately, it sets
             * up a mutation observer to wait for that element to appear)
             */
            renderNextStep: function () {
                var nextStep = __.find(this.stepViews, function (step) {
                    return !step.model.getDismissed();
                });
                if (nextStep) {
                    var selector = nextStep.model.resolveSelector();
                    var $target = _jQuery(selector);
                    if ($target.length === 0) {
                        var that = this;
                        _jQuery(document).arrive(selector, function () {
                            that._renderStep(nextStep, _jQuery(this));
                        });
                    } else {
                        this._renderStep(nextStep, $target);
                    }
                }
            },

            _renderStep: function (step, $elem) {
                step.render($elem);
                if (step.model.getOnShow()) {
                    step.model.getOnShow()();
                }
                // Apply the dismissers
                var dismissingSelectors = step.model.resolveDismissingSelectors();
                if (dismissingSelectors) {
                    _jQuery(dismissingSelectors).one("click", __.bind(step.dismiss, step));
                }
            },

            dismissTour: function () {
                __.each(this.stepViews, function (step) {
                    step.model.setOnShow(function () {
                    });
                    step.model.setOnDismiss(function () {
                    });
                    step.dismiss();
                });
            },

            _shouldRegisterTour: function (opts) {
                if (opts.syncKey) {
                    const customCheck = opts.shouldRegisterTourCheck;

                    return syncing.syncFromServer(opts.syncKey, _jQuery)
                        // TODO (JSDS-1849): we're just checking if we get any data back from the server, without checking the format
                        // because the same tour might be dismissed via hotspot-tour and chaperone. hotspot-tour persist an object and 
                        // chaperone persists an array of dismissed steps
                        .pipe(function (data) {
                            if(data) {
                                return false;
                            } else if ( __.isFunction(customCheck)) {
                                return customCheck();
                            } else {
                                return true;
                            }
                        });
                }

                var defaultDeferred = $.Deferred();

                defaultDeferred.resolve(true);

                return defaultDeferred;

            }
        });

        // Cancel any running hotspot tours
        if (Chaperone.currentHotspotTour) {
            Chaperone.currentHotspotTour.dismissTour();
        }
        Chaperone.currentHotspotTour = new HotspotModule(opts);

        return Chaperone.currentHotspotTour;
    };

})();

