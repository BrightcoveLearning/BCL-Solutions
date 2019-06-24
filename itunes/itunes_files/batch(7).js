;
/* module-key = 'com.atlassian.jira.plugins.jira-transition-triggers-plugin:dev-status-common-resources', location = 'js/workflow/TriggersPluginBackboneDefine.js' */
if(Backbone&&!Backbone.define){Backbone.define=function(name,ctor){eval("Backbone['Class: "+name+"'] = function() { Backbone['Class: "+name+"'].__ctor.apply(this, arguments); }");var cls=Backbone["Class: "+name];cls.__ctor=ctor;ctor.prototype.name=name;cls.prototype=ctor.prototype;_.extend(cls,ctor);_.each(ctor.prototype,function(fn,fnName){if(typeof fn==="function"){fn.displayName=name+"."+fnName}});var context=window;var parts=name.split(".");_.each(parts,function(part,i){if(i===parts.length-1){context[part]=cls}else{context=context[part]==null?(context[part]={}):context[part]}});return cls}};;
;
/* module-key = 'com.atlassian.jira.plugins.jira-transition-triggers-plugin:dev-status-common-resources', location = 'js/devstatus/FeedbackDialog.js' */
Backbone.define("JIRA.DevStatus.FeedbackDialog",Backbone.Model.extend({properties:["collectorId","summary"],defaults:{summary:"Tell us what you think.",collectorId:"effe8b72"},show:function(){var a=this.get("collectorId");window.ATL_JQ_PAGE_PROPS=window.ATL_JQ_PAGE_PROPS||{};window.ATL_JQ_PAGE_PROPS[a]={fieldValues:{summary:this.get("summary")},triggerFunction:function(b){_.defer(function(){b()})}};AJS.$.getScript(this._collectorUrlFor(a))},_collectorUrlFor:function(a){return"https://jira.atlassian.com/s/d41d8cd98f00b204e9800998ecf8427e/en_UK-7m3tmj-1988229788/6307/131/1.4.8/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?collectorId="+a}}));;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:7', location = 'dist/7.0ce9e40d2820bfa71df7.js' */
jiraDevelopmentIntegrationPluginJsonp([7],{

/***/ "./js/component/tooltip.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')"), __webpack_require__("jira.webresources:jquery/require('jquery')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, jquery) {
    'use strict';

    var TOOLTIP_MARGIN = 20;

    /**
     * Tipsy leaves its tooltip element around even if the element it is attached to
     * is removed from the document or becomes hidden.
     * This function checks at a short interval whether the tooltip should be hidden to prevent "detached" tooltips.
     * @param tipsyObject
     */
    function hideTipsyWhenDetached(tipsyObject) {
        var CHECK_INTERVAL = 250;

        setTimeout(function () {
            // If the tipsy isn't visible any more we stop checking as well
            if (tipsyObject.$tip.is(':visible')) {
                if (tipsyObject.$element.is(':visible')) {
                    hideTipsyWhenDetached(tipsyObject);
                } else {
                    tipsyObject.hide();
                }
            }
        }, CHECK_INTERVAL);
    }

    /**
     * Show the tipsy, with our special behaviour
     * @param tipsyObject
     */
    function showTipsy(tipsyObject) {
        if (tipsyObject) {
            tipsyObject.show();
            if (tipsyObject.$tip) {
                // If title is empty there is no tip element even after calling show
                hideTipsyWhenDetached(tipsyObject);
            }
        }
    }

    var tooltip = {};

    /**
     * Initialise tooltip
     * @param {Object} options
     * @param {string|Node} options.selector the element(s) to show tooltips for
     * @param {string|Node} [options.context] if specified, use event delegation on this element
     */
    tooltip.tipsify = function (options) {
        options = _.extend({}, options, {
            trigger: 'manual',
            title: 'data-tooltip'
        });

        // return if no selector defined
        if (!options.selector) {
            return;
        }

        jquery(options.context).on({
            mouseenter: function mouseenter() {
                // Re-init the tooltip and show it immediately
                var tipsy = jquery(this).tooltip(options).tipsy(true);
                showTipsy(tipsy);
            },
            mouseleave: function mouseleave() {
                // Check if tipsy is still present to be safe
                var tipsy = jquery(this).tipsy(true);
                if (tipsy) {
                    tipsy.hide();
                }
            }
        }, options.selector);
    };

    return tooltip;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/development-column/column-model.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/util/Strings.js"), __webpack_require__("./js/util/Helpers.js"), __webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:jquery/require('jquery')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Strings, Helpers, backbone, jquery) {
    'use strict';

    var model = backbone.Model.extend({
        shouldUpdateData: function shouldUpdateData(selectedTab) {
            return false;
        },

        /**
         * Updates the data from the back-end.
         */
        updateData: function updateData(selectedTab, projectKey, versionId) {}
    });

    return model;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/development-column/column-utils.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (exports) {
    'use strict';

    var ISSUE_PROP_REGEX = /( |^)issue.property\[development\]/;
    var DEV_SYNTAX_REGEX = /( |^)development\[/;

    exports.jqlContainsDevInfo = function (jql) {
        if (ISSUE_PROP_REGEX.test(jql)) {
            return true;
        }

        return DEV_SYNTAX_REGEX.test(jql);
    };

    return exports;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/development-column/column-view.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(28);

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/releasereport/release-report-metadata.js"), __webpack_require__("./js/releasereport/dev-status-dialog-bridge.js"), __webpack_require__("./js/component/tooltip.js"), __webpack_require__("jira.webresources:ajs-backbone-amd-shim/require('backbone')"), __webpack_require__("jira.webresources:jquery/require('jquery')"), __webpack_require__("./js/util/analytics.js"), __webpack_require__], __WEBPACK_AMD_DEFINE_RESULT__ = function (RRMetadata, DevStatusDialogBridge, tooltip, backbone, jquery, analytics) {
    'use strict';

    var DEV_INFO_CLICKED_EVENT = 'devstatus.issue-navigator.dev-info.clicked';

    return backbone.View.extend({
        events: {
            'click .fusion-widget': '_showDevStatusDialog'
        },

        initialize: function initialize(options) {
            tooltip.tipsify({
                selector: '[data-tooltip]',
                context: this.el,
                html: true
            });
        },

        onRender: function onRender() {},

        _getEl$: function _getEl$() {
            return jquery(this.el);
        },

        _showDevStatusDialog: function _showDevStatusDialog(e) {
            var $target = jquery(e.currentTarget);
            var issueId = parseInt($target.data('issue-id'), 10);
            var issueKey = $target.data('issue-key');
            var dataType = $target.data('dev-type');
            var devSummary = $target.data('dev-summary').cachedValue.summary[dataType];
            var showContactAdminForm = RRMetadata.shouldShowContactAdminForm();

            DevStatusDialogBridge.showDialog(issueKey, issueId, devSummary, dataType, showContactAdminForm);

            analytics.sendEvent(DEV_INFO_CLICKED_EVENT, {
                type: dataType
            });
        }
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/releasereport/dev-status-dialog-bridge.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

__webpack_require__(4);

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (_) {
    'use strict';

    var fusionDialogFactoryPerType = {
        repository: _createDetailDialogCommit,
        pullrequest: _createDetailDialogPullRequest,
        branch: _createDetailDialogBranch,
        build: _createDetailDialogBuild,
        review: _createDetailDialogReview,
        'deployment-environment': _createDetailDialogDeployment
    };

    function _getDetailDialogParameters(commonParams, specificParams) {
        return _.extend({
            issueKey: commonParams.issueKey,
            issueId: commonParams.issueId,
            tabs: commonParams.devSummary.byInstanceType,
            dataType: commonParams.dataType,
            showContactAdminForm: commonParams.showContactAdminForm,
            count: commonParams.devSummary.overall.count
        }, specificParams);
    }

    function _createDetailDialogCommit(params) {
        return new Promise(function (resolve) {
            __webpack_require__.e/* require */(2).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/DetailDialogCommitView.js")]; (function (JIRADevStatusDetailDialogCommitView) {
                var view = new JIRADevStatusDetailDialogCommitView(_getDetailDialogParameters(params, {
                    id: 'devstatus-commit-detail-dialog'
                }));
                resolve(view);
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        });
    }

    function _createDetailDialogPullRequest(params) {
        return new Promise(function (resolve) {
            __webpack_require__.e/* require */(3).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/DetailDialogPullRequestView.js")]; (function (JIRADevStatusDetailDialogPullRequestView) {
                var view = new JIRADevStatusDetailDialogPullRequestView(_getDetailDialogParameters(params, {
                    id: 'devstatus-pullrequest-detail-dialog',
                    reviewersThreshold: 2
                }));
                resolve(view);
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        });
    }

    function _createDetailDialogBranch(params) {
        // Note: analyticIssueData parameter is ommited when calling JIRA.DevStatus.DetailDialogBranchView() because
        // isAssignee/isAssignable properties are expensive to obtain per issue for the release reports.
        return new Promise(function (resolve) {
            __webpack_require__.e/* require */(6).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/DetailDialogBranchView.js")]; (function (JIRADevStatusDetailDialogBranchView) {
                var view = new JIRADevStatusDetailDialogBranchView(_getDetailDialogParameters(params, {
                    id: 'devstatus-branch-detail-dialog'
                }));
                resolve(view);
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        });
    }

    function _createDetailDialogBuild(params) {
        return new Promise(function (resolve) {
            __webpack_require__.e/* require */(5).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/build/DetailDialogBuildView.js")]; (function (JIRADevStatusDetailDialogBuildView) {
                var view = new JIRADevStatusDetailDialogBuildView(_getDetailDialogParameters(params, {
                    id: 'devstatus-build-detail-dialog'
                }));
                resolve(view);
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        });
    }

    function _createDetailDialogReview(params) {
        return new Promise(function (resolve) {
            __webpack_require__.e/* require */(1).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/DetailDialogReviewView.js")]; (function (JIRADevStatusDetailDialogReviewView) {
                var view = new JIRADevStatusDetailDialogReviewView(_getDetailDialogParameters(params, {
                    id: 'devstatus-review-detail-dialog',
                    reviewersThreshold: 2
                }));
                resolve(view);
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        });
    }

    function _createDetailDialogDeployment(params) {
        return new Promise(function (resolve) {
            __webpack_require__.e/* require */(4).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./js/viewissue/dialog/deployment/DetailDialogDeploymentView.js")]; (function (JIRADevStatusDetailDialogDeploymentView) {
                var view = new JIRADevStatusDetailDialogDeploymentView(_getDetailDialogParameters(params, {
                    id: 'devstatus-deployment-detail-dialog'
                }));
                resolve(view);
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);
        });
    }

    function showDialog(issueKey, issueId, devSummary, dataType, showContactAdminForm) {
        var self = this;

        var createDialogView = fusionDialogFactoryPerType[dataType];
        var params = {
            issueKey: issueKey,
            issueId: issueId,
            devSummary: devSummary,
            dataType: dataType,
            showContactAdminForm: showContactAdminForm
        };
        createDialogView(params).then(function (dialogView) {
            self.devStatusDialogView = dialogView;
            dialogView.show();
        });
    }

    return {
        showDialog: showDialog
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/releasereport/release-report-metadata.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Module for fetching metadata about the release report.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:jquery/require('jquery')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (jquery) {
    'use strict';

    var $rrMetadata;

    function getMetadataElem() {
        if (!$rrMetadata) {
            $rrMetadata = jquery('.release-report-metadata');
        }
        return $rrMetadata;
    }

    return {
        getProjectKey: function getProjectKey() {
            return getMetadataElem().data('project-key');
        },

        getVersionId: function getVersionId() {
            return getMetadataElem().data('version-id');
        },

        getStatusCategoryCounts: function getStatusCategoryCounts() {
            return getMetadataElem().data('status-category-counts');
        },

        shouldShowContactAdminForm: function shouldShowContactAdminForm() {
            return getMetadataElem().data('show-contact-admin-form') === 'true';
        },

        getTotalIssueCount: function getTotalIssueCount() {
            return getMetadataElem().data('issue-count');
        }
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/util/EventPublisher.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
    'use strict';

    return {
        trigger: AJS.trigger
    };
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/util/Helpers.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:wrm-context-path/require('wrm/context-path')"), __webpack_require__("jira.webresources:ajs-underscorejs-amd-shim/require('underscore')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (wrmContextPath, _) {
    'use strict';

    /**
     * Return a function to mark a string object as sanitised so that soy doesn't escape it.
     *
     * We can remove this and just use soydata.VERY_UNSAFE.ordainSanitizedHtml once we only support JIRA >= 7
     *
     * @returns a function to sanitise a string for unescaped usage in a soy template.
     */

    var sanitiserFunction = function sanitiserFunction() {
        if (soydata.VERY_UNSAFE) {
            return soydata.VERY_UNSAFE.ordainSanitizedHtml;
        } else {
            return function (stringToMarkAsSafe) {
                return new soydata.SanitizedHtml(stringToMarkAsSafe);
            };
        }
    };

    return {
        getContextPath: wrmContextPath,

        /**
         * Make a copy of object with all String properties of this new object marked as sanitised html,
         * so that soy doesn't try to escape them if we use the strings in a soy template context.
         *
         * DO NOT sanitise strings to be used in a soy template unless you know they are safe.
         *
         * @param object {Object} has some string properties that we want to sanitise so that soy doesn't escape them
         * @return object {Object} a copy of object with the string properties marked as sanitised
         */
        copyAndMarkStringPropertiesAsSanitised: function copyAndMarkStringPropertiesAsSanitised(object) {
            var sanitiserFn = sanitiserFunction();
            var sanitisedObject = Array.isArray(object) ? [] : {};
            _.each(_.keys(object), function (key) {
                var val = object[key];
                if (val) {
                    if (typeof val === 'string') {
                        sanitisedObject[key] = sanitiserFn(val);
                    } else if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
                        if (_.keys(val).length > 0) {
                            sanitisedObject[key] = copyAndMarkStringPropertiesAsSanitised(val);
                        }
                    } else {
                        sanitisedObject[key] = val;
                    }
                }
            });
            return sanitisedObject;
        }
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/util/Strings.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("jira.webresources:jira-formatter/require('jira/util/formatter')")], __WEBPACK_AMD_DEFINE_RESULT__ = function (formatter) {
    'use strict';

    return {
        format: formatter.format
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./js/util/analytics.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./js/util/EventPublisher.js"), exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (eventPublisher, exports) {
    'use strict';

    /**
     * fires an analytics event
     * @param name of event
     * @param data data to be send with it
     */

    exports.sendEvent = function (name) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        eventPublisher.trigger('analyticsEvent', {
            name: name,
            data: data
        });
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = undefined;

/***/ }),

/***/ "jira.webresources:ajs-backbone-amd-shim/require('backbone')":
/***/ (function(module, exports) {

module.exports = require('backbone');

/***/ }),

/***/ "jira.webresources:ajs-underscorejs-amd-shim/require('underscore')":
/***/ (function(module, exports) {

module.exports = require('underscore');

/***/ }),

/***/ "jira.webresources:jira-formatter/require('jira/util/formatter')":
/***/ (function(module, exports) {

module.exports = require('jira/util/formatter');

/***/ }),

/***/ "jira.webresources:jquery/require('jquery')":
/***/ (function(module, exports) {

module.exports = require('jquery');

/***/ }),

/***/ "jira.webresources:wrm-context-path/require('wrm/context-path')":
/***/ (function(module, exports) {

module.exports = require('wrm/context-path');

/***/ })

});
//# sourceMappingURL=7.0ce9e40d2820bfa71df7.js.map;