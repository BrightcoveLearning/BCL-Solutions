    var lucidchart = {
        $: {
            create: function(tag) {
                return document.createElement(tag);
            },
            getStyle: function(elem) {
                return document.defaultView ? document.defaultView.getComputedStyle( elem, null ) : elem.currentStyle;
            },
            normalizeEvent: function(e) {
                if (!e) e = window.event;
                return e;
            },
            preventDefault: function(e) {
                if (!e) e = window.event;

                // if preventDefault exists run it on the original event
                if (e.preventDefault) {
                    e.preventDefault();
                } // otherwise set the returnValue property of the original event to false (IE)
                else {
                    e.returnValue = false;
                }
            },
            stopPropagation: function(e) {
                if (!e) e = window.event;

                // if stopPropagation exists run it on the original event
                if ( e.stopPropagation ) {
                    e.stopPropagation();
                }
                // otherwise set the cancelBubble property of the original event to true (IE)
                e.cancelBubble = true;
            },
            withinElement: function(elem, e) {
                if (!e) e = window.event;

                // Check if mouse(over|out) are still within the same parent element
                var parent = e.relatedTarget;

                // Firefox sometimes assigns relatedTarget a XUL element
                // which we cannot access the parentNode property of
                try {

                    // Chrome does something similar, the parentNode property
                    // can be accessed but is null.
                    if ( parent && parent !== document && !parent.parentNode ) {
                        return true;
                    }

                    // Traverse up the tree
                    while ( parent && parent !== elem ) {
                        parent = parent.parentNode;
                    }

                    if ( parent !== elem ) {
                        return false;
                    }

                    return true;

                // assuming we've left the element since we most likely mousedover a xul element
                } catch(er) { }

                return true;
            },
            pageX: function(e) {
                if (!e) e = window.event;

                if (e.pageX != null)
                    return e.pageX;

                // Calculate pageX if missing and clientX available
                if ( e.pageX == null && e.clientX != null ) {
                    var eventDocument = e.target.ownerDocument || document,
                        doc = eventDocument.documentElement,
                        body = eventDocument.body;

                    return e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                }
            },
            pageY: function(e) {
                if (!e) e = window.event;

                if (e.pageY != null)
                    return e.pageY;

                // Calculate pageY if missing and clientY available
                if ( e.pageY == null && e.clientY != null ) {
                    var eventDocument = e.target.ownerDocument || document,
                        doc = eventDocument.documentElement,
                        body = eventDocument.body;

                    return e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
                }
            },
            offset: function(elem) {
                return {
                    top: elem.offsetTop,
                    left: elem.offsetLeft
                };
            },
            addClass: function(elem, value) {
                var classNames = (value || "").split(/ /g);
                if ( !elem.className ) {
                    elem.className = value;
                }
                else {
                    var className = " " + elem.className + " ",
                        setClass = elem.className;

                    for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
                        if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
                            setClass += " " + classNames[c];
                        }
                    }
                    elem.className = setClass.replace(/^\s+/, "").replace(/\s+$/, "");
                }
            },
            removeClass: function(elem, value) {
                var classNames = (value || "").split(/ /g);
                if (elem.className) {
                    if (value) {
                        var className = (" " + elem.className + " ").replace(/[\n\t\r]/g, " ");
                        for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
                            className = className.replace(" " + classNames[c] + " ", " ");
                        }
                        elem.className = className.replace(/^\s+/, "").replace(/\s+$/, "");

                    }
                    else {
                        elem.className = "";
                    }
                }
            },
            map: function(ar, func) {
                var arLen = ar.length;
                for (var i = 0; i < arLen; i++) {
                    if (func(ar[i], i) == false)
                        return;
                }
            }
        },
        setupViewer: function(container, images, options) {
            var viewer = lucidchart.$.create('div');
            // single instance of the rich viewer iframe shared by all diagrams
            var richViewer = jQuery('#richViewerFrame');
            viewer.className = 'lucidchart-viewer';
            viewer.id = container.id + '-viewer';
            container.appendChild(viewer);

            var doc = document,
                $ = lucidchart.$,
                imgContainer = $.create('div'),
                zoomControls = $.create('div'),
                zoomButtonIn = $.create('div'),
                zoomButtonOut = $.create('div'),
                zoomInActive = false,
                zoomOutActive = false,
                viewerBorderW,
                viewerW,
                viewerH,
                activeImage = null,
                activeImageMetrics = null,
                activeImageIndex = null,
                loadedImages = [],
                dragging = false,
                dragX = null,
                dragY = null,
                keyDown = null,
                panAccel = 0,
                panDelta = 0,
                panInterval = null,
                totalPages = images.length,
                finished = false;


            imgContainer.className = 'img-container';

            viewer.appendChild(imgContainer);


            /* UTILITY FUNCTIONS
            ==================================================================*/

            function setActiveImageMetrics() {
                if (!activeImage)
                    activeImageMetrics = null;
                else {
                    var imgOffset = $.offset(activeImage.img),
                        imgContainerOffset = $.offset(imgContainer),
                        top = imgOffset.top - imgContainerOffset.top,
                        left = imgOffset.left - imgContainerOffset.left,
                        width = activeImage.img.offsetWidth,
                        height = activeImage.img.offsetHeight;

                    activeImageMetrics = {
                        t: top,
                        l: left,
                        w: width,
                        h: height,
                        b: top + height,
                        r: left + width,
                        ratio: width/height
                    };
                }
            }

            function moveActiveImage(newImgLeft, newImgTop) {
                if (!activeImageMetrics)
                    return;

                // don't let dragging go past edges
                newImgLeft = Math.max(viewerW - activeImageMetrics.w, Math.min(0, newImgLeft));
                newImgTop = Math.max(viewerH - activeImageMetrics.h, Math.min(0, newImgTop));

                // letterboxing in one direction or another (force to center)
                if (activeImageMetrics.h < viewerH) // thumbnail has vertical letterboxing
                    newImgTop = (viewerH - activeImageMetrics.h)/2;
                if (activeImageMetrics.w < viewerW) // thumbnail has horizontal letterboxing
                    newImgLeft = (viewerW - activeImageMetrics.w)/2;

                activeImage.img.style.left = Math.round(newImgLeft) + 'px';
                activeImage.img.style.top = Math.round(newImgTop) + 'px';
            }

            function displayImage(i) {
                $.map(loadedImages, function(loadedImage, idx) {
                    if (loadedImage && idx != i) {
                        loadedImage.img.style.display = 'none';
                    }
                });

                if (loadedImages[i]) {
                    activeImageIndex = i;
                    activeImage = loadedImages[i];
                    activeImage.img.style.display = '';

                    if (activeImage['reset']) {
                        activeImage['reset'] = false;
                        zoom(1);
                        moveActiveImage(0, 0);
                    }

                    if (pageCounter)
                        pageCounter.innerHTML = 'Page ' + (i+1) + '/' + totalPages;
                }

                updateZoomButtons();
            }

            function nextPage() {
                if (activeImageIndex != null)
                    displayImage((activeImageIndex + 1)%totalPages);
            }

            function prevPage() {
                if (activeImageIndex != null)
                    displayImage((totalPages + activeImageIndex - 1)%totalPages);
            }

            function updateImage(i) {
                if (!loadedImages[i])
                    return;

                var image = loadedImages[i],
                    vFillZoom = 100*viewerH/image['origH'],
                    hFillZoom = 100*viewerW/image['origW'];

                image['hFillZoom'] = hFillZoom;
                image['vFillZoom'] = vFillZoom;
                image['minZoom'] = Math.min(hFillZoom, vFillZoom);
                image['extraZoomSteps'] = [Math.sqrt(vFillZoom), Math.sqrt(hFillZoom)];
                image['reset'] = true;

                if (image == activeImage) {
                    updateZoomButtons();
                }
            }

            function updateAllImages() {
                $.map(loadedImages, function(loadedImage, idx) {
                    updateImage(idx);
                });
            }



            /* RESIZING
            ==================================================================*/

            function resizeViewer() {
                viewerBorderW = parseFloat($.getStyle(viewer).borderLeftWidth);
                var border = 2 * viewerBorderW;
                var viewerBox = viewer.getBoundingClientRect ?
                                    viewer.getBoundingClientRect() :
                                    {width: viewer.offsetWidth, height: viewer.offsetHeight};

                viewerW = Math.max(0, viewerBox.width - border);
                if(viewerW <= 1) {  // account for borderLeftWidth rounding errors
                    viewerW = Math.max(0, parseFloat(viewer.style.width) - border);
                }

                viewerH = Math.max(0, viewerBox.height - border);
                if(viewerH <= 1) {
                    viewerH = Math.max(0, viewerW);
                }

                viewer.style.width = viewerW + 'px';
                viewer.style.height = viewerH + 'px';

                if (finished) {
                    updateAllImages();
                    zoom(1);
                }
            }

            // immediately resize the viewer
            if (options.width) {
                viewer.style.width = options.width + 'px';
            }
            if (options.height) {
                viewer.style.height = options.height + 'px';
            }
            resizeViewer();

            var oldResize = window.onresize;

            window.onresize = function(e) {
                if (oldResize)
                    oldResize(e);

                resizeViewer();
            }


            /* DRAGGING
            ==================================================================*/

            function startDrag(e) {
                $.addClass(viewer, 'dragging');
                dragging = true;

                setActiveImageMetrics();

                dragX = $.pageX(e);
                dragY = $.pageY(e);
            }

            function endDrag() {
                $.removeClass(viewer, 'dragging');
                dragging = false;
            }

            function drag(e) {
                if (!dragging || !activeImage)
                    return;

                var pageX = $.pageX(e),
                    pageY = $.pageY(e),
                    newImgLeft = (pageX - dragX) + activeImageMetrics.l,
                    newImgTop = (pageY - dragY) + activeImageMetrics.t;

                moveActiveImage(newImgLeft, newImgTop);
            }

            viewer.makeFullscreen = function() {
                var maxSize = Math.min(jQuery(window).width(), jQuery(window).height()) - 100;

                var richViewerForm = jQuery(container).find('.rich-viewer-form');
                var state = richViewerForm.find('.input-state').val();

                if(!state) {
                    // simple viewer
                    jQuery.fancybox({
                        content: viewer,
                        onStart: function() {
                            if (totalPages > 1) {
                                jQuery(pageCounter).hide();
                            }
                            jQuery(container).hide();
                            jQuery(viewer).css('width', maxSize + 'px');
                            jQuery(viewer).css('height', '');
                            resizeViewer();
                        },
                        onCleanup: function() {
                            if (totalPages > 1) {
                                jQuery(pageCounter).show();
                            }
                            jQuery(viewer).css('width', options.width ? (options.width + 'px') : '');
                            jQuery(viewer).css('height', options.height ? (options.height + 'px') : '');
                            jQuery(container).prepend(viewer).show();
                            resizeViewer();
                        }
                    });
                } else {
                    // rich viewer
                    jQuery.fancybox({
                        content: richViewer,
                        onStart: function() {
                            jQuery(richViewer).css('width', maxSize + 'px');
                            jQuery(richViewer).css('height', maxSize + 'px');
                        },
                        onCleanup: function() {
                            jQuery(richViewer).css('width', '');
                            jQuery(richViewer).css('height', '');
                        }
                    });

                    richViewerForm.submit();
                }
            };

            viewer.onmousedown = function(e) {
                $.preventDefault(e);
                $.stopPropagation(e);
                startDrag(e);
                lucidchart.activeWidget = viewer;
            };

            viewer.onmousemove = function(e) {
                $.preventDefault(e);
                $.stopPropagation(e);
                drag(e);
            };

            viewer.onmouseout = function(e) {
                $.preventDefault(e);
                // if we are outside the viewer
                if (!$.withinElement(viewer,e)) {
                    endDrag();
                }
            };

            viewer.onmouseup = function(e) {
                $.preventDefault(e);
                endDrag();
            };

            var oldMouseDown = document.onmousedown;

            document.onmousedown = function(e) {
                if (oldMouseDown)
                    oldMouseDown(e);

                if (lucidchart.activeWidget == viewer) {
                    lucidchart.activeWidget = null;
                }
            };

            var oldKeyDown = document.onkeydown;

            document.onkeydown = function(e) {
                if (oldKeyDown)
                    oldKeyDown(e);

                if (lucidchart.activeWidget == viewer) {
                    e = $.normalizeEvent(e);

                    var newKey = e.keyCode != keyDown,
                        panning = false;

                    keyDown = e.keyCode;

                    if (newKey) {
                        panAccel = 0;
                        panDelta = 0;
                    }

                    switch (e.keyCode) {
                        case 37: case 38: case 39: case 40: // arrow keys
                            panning = true;
                            $.preventDefault(e);

                            if (newKey)
                                setActiveImageMetrics();
                            break;
                        case 188: // comma (<)
                            prevPage();
                            break;
                        case 190: // period (>)
                            nextPage();
                            break;
                        case 189: case 109: // -
                            zoomDirection(-1);
                            break;
                        case 187: case 107: // +
                            zoomDirection(1);
                            break;
                        default:
                            break;
                    }

                    if (panInterval == null && panning) {
                        panInterval = setInterval(function() {
                            switch (keyDown) {
                                case 37: case 38: case 39: case 40: // arrow keys
                                    panAccel++;
                                    panDelta += 2*panAccel;
                                    break;
                                default:
                                    break;
                            }

                            switch (keyDown) {
                                case 37: // left
                                    moveActiveImage(activeImageMetrics.l + panDelta, activeImageMetrics.t);
                                    break;
                                case 38: // up
                                    moveActiveImage(activeImageMetrics.l, activeImageMetrics.t + panDelta);
                                    break;
                                case 39: // right
                                    moveActiveImage(activeImageMetrics.l - panDelta, activeImageMetrics.t);
                                    break;
                                case 40: // down
                                    moveActiveImage(activeImageMetrics.l, activeImageMetrics.t - panDelta);
                                    break;
                                default:
                                    break;
                            }
                        }, 33);
                    }
                }
            }

            var oldKeyUp = document.onkeyup;

            document.onkeyup = function(e) {
                if (oldKeyUp)
                    oldKeyUp(e);

                keyDown = null;
                panAccel = 0;
                panDelta = 0;

                if (panInterval) {
                    clearInterval(panInterval);
                    panInterval = null;
                }
            }


            /* PAGING
            ==================================================================*/

            // add page controls if more than one page
            if (totalPages > 1) {
                var pageControlsLeft = $.create('div'),
                    pageButtonLeft = $.create('div'),
                    pageControlsRight = $.create('div'),
                    pageButtonRight = $.create('div'),
                    pageCounter = $.create('div');

                pageControlsLeft.className = 'page-control page-left';
                pageButtonLeft.className = 'page-button page-button-left';
                pageControlsRight.className = 'page-control page-right';
                pageButtonRight.className = 'page-button page-button-right';
                pageCounter.className = 'page-counter';

                viewer.appendChild(pageControlsLeft);
                pageControlsLeft.appendChild(pageButtonLeft);
                viewer.appendChild(pageControlsRight);
                pageControlsRight.appendChild(pageButtonRight);
                viewer.appendChild(pageCounter);

                pageButtonLeft.onclick = function() {
                    prevPage();
                };

                pageButtonRight.onclick = function() {
                    nextPage();
                };
            }


            /* ZOOMING
            ==================================================================*/

            // Zoom controls
            zoomControls.className = 'zoom-controls';
            zoomButtonIn.className = 'zoom-button zoom-button-in';
            zoomButtonOut.className = 'zoom-button zoom-button-out';

            viewer.appendChild(zoomControls);
            zoomControls.appendChild(zoomButtonIn);
            zoomControls.appendChild(zoomButtonOut);

            function getZoomSteps() {
                var zoomSteps = [1,1.41,2,2.83,4,5,5.77,7.07,8.66,10,12.25,14.14,17.32,20];

                // extra zoom steps are added for fit to height and fit to width
                zoomSteps = zoomSteps.concat(activeImage.extraZoomSteps);
                zoomSteps.sort(function(a,b) {
                    return a-b;
                });

                return zoomSteps;
            }

            function zoomDirection(dir) {
                setActiveImageMetrics();

                var zoomSteps = getZoomSteps();
                var sqrtZoom = Math.sqrt(activeImage.zoom);

                var i;
                if (dir > 0) { // Zoom in
                    for (i = 0; i < zoomSteps.length - 1; i++) {
                        if (sqrtZoom < zoomSteps[i]) {
                            break;
                        }
                    }
                }
                else { // Zoom out
                    if (activeImage.zoom <= activeImage.minZoom) {
                        updateZoomButtons();
                        return;
                    }

                    for (i = zoomSteps.length - 1; i > 0; i--) {
                        if (sqrtZoom > zoomSteps[i]) {
                            break;
                        }
                    }
                }

                zoom(zoomSteps[i]);
            }

            function zoom(step) {
                setActiveImageMetrics();

                var newZoom = Math.max(step*step, activeImage.minZoom),
                    zoomRatio = newZoom/activeImage.zoom,
                    centerX = viewerW/2,
                    centerY = viewerH/2,
                    newImgLeft = centerX - zoomRatio*(centerX - activeImageMetrics.l),
                    newImgTop = centerY - zoomRatio*(centerY - activeImageMetrics.t),
                    newWidth = Math.round(newZoom*activeImage.origW/100),
                    newHeight = Math.round(newZoom*activeImage.origH/100);

                activeImage.zoom = newZoom;
                activeImageMetrics.w = newWidth;
                activeImageMetrics.h = newHeight;
                activeImageMetrics.r = activeImageMetrics.l + newWidth;
                activeImageMetrics.b = activeImageMetrics.t + newHeight;
                activeImage.img.width = newWidth;
                if (lucidchart.useragent.isIE)
                    activeImage.img.height = newHeight;

                moveActiveImage(newImgLeft, newImgTop);

                updateZoomButtons();
            }

            function deactivateZoomIn() {
                zoomInActive = false;
                $.removeClass(zoomButtonIn, 'active');
            }

            function deactivateZoomOut() {
                zoomOutActive = false;
                $.removeClass(zoomButtonOut, 'active');
            }

            function activateZoomIn() {
                zoomInActive = true;
                $.addClass(zoomButtonIn, 'active');
            }

            function activateZoomOut() {
                zoomOutActive = true;
                $.addClass(zoomButtonOut, 'active');
            }

            function updateZoomButtons() {
                if (activeImage) {
                    if (activeImage.minZoom >= activeImage.zoom)
                        deactivateZoomOut();
                    else
                        activateZoomOut();

                    if (activeImage.zoom >= 400)
                        deactivateZoomIn();
                    else
                        activateZoomIn();
                }
                else {
                    deactivateZoomOut();
                    deactivateZoomIn();
                }
            }

            zoomButtonIn.onclick = function() {
                if (activeImage && zoomInActive)
                    zoomDirection(1);
            };

            zoomButtonOut.onclick = function() {
                if (activeImage && zoomOutActive)
                    zoomDirection(-1);
            };


            $.map(images, function(url, i) {
                var img = $.create('img');

                img.onload = (function(i) {
                    return function() {
                        var newHeight = Math.round(viewerW*this.height/this.width);

                        loadedImages[i] = {
                            img: this,
                            origW: this.width,
                            origH: this.height,
                            reset: false
                        };

                        // only show the first page
                        if (i == 0)
                            displayImage(i);
                        else
                            img.style.display = 'none';

                        if (lucidchart.useragent.isIE)
                            this.height = newHeight;

                        this.width = viewerW;

                        if (newHeight < viewerH)
                            this.style.top = Math.round((viewerH - newHeight)/2) + 'px';

                        imgContainer.appendChild(this);

                        updateImage(i);
                        loadedImages[i]['zoom'] = loadedImages[i]['hFillZoom'];
                    };
                })(i)

                img.src = url;
            });

            finished = true;
        },
        activeWidget: null,
        useragent: {
            isIE: navigator.userAgent.toLowerCase().indexOf("msie") != -1
        }
    };