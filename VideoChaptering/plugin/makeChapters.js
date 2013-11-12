(function () {
    var defaults = {
        "position": "bottom",
        "showThumbnails": true,
        "showTitles": true,
        "showTimelineMarkers": true,
        "chapterData": []
    },
        /**
         * extend used to merge options and defaults into settings
         */
        extend = function () {
            var args, target, i, object, property;
            args = Array.prototype.slice.call(arguments);
            target = args.shift() || {};
            for (i in args) {
                object = args[i];
                for (property in object) {
                    if (object.hasOwnProperty(property)) {
                        if (typeof object[property] === "object") {
                            target[property] = extend(target[property], object[property]);
                        } else {
                            target[property] = object[property];
                        }
                    }
                }
            }
            return target;
        },
        // test for is number
        isNumber = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        /**
         * timeToSeconds()
         * arguments: time: hh:mm:ss:mmm string
         * returns: seconds: float
         */
        timeToSeconds = function (hmsm) {
            var seconds = 0,
                len = 0,
                timeArray,
                secondsArray;
            // make sure we have the right kind of string
            if (hmsm.indexOf(":") === -1) {
                return;
            }
            // split at :'s
            timeArray = hmsm.split(":");
            // split last item at .
            len = timeArray.length;
            secondsArray = timeArray[len - 1];
            // calculation depends on how many items
            if (secondsArray.length === 2) {
                timeArray[len - 1] = parseFloat(secondsArray[0]) + (secondsArray[1] / 1000);
            }
            if (timeArray.length === 3) {
                // must have milliseconds
                seconds = (timeArray[0] * 3660) + (timeArray[1] * 60) + parseFloat(timeArray[2]);
            } else if (timeArray.length === 2) {
                seconds = (timeArray[0] * 60) + parseFloat(timeArray[1]);
            } else if (timeArray.length === 1) {
                seconds = parseFloat(timeArray[0]);
            }
            return seconds;
        };
    /**
     * register the makeChapters plugin
     */
    videojs.plugin("makeChapters", function (options) {
        var player, playerID, playerTracksDisplay, textTrack, trackKind, chapters, videoDivList, videoDiv, videoElement, nextNode, nextNodeParent, playerWrapper, chapterData = [], chapterClass, chapterList, currentChapterIndex = 0, timelineMarker, timelineMarkers = [],
            highlighted = false,
            unHighlightChapter = function (index) {
                chapterList[index].setAttribute("class", chapterClass);
            },
            highlightChapter = function (index) {
                chapterList[index].setAttribute("class", chapterClass + " chapter-highlight");
                highlighted = true;
            },
            onTimeUpdate = function (evt) {
                var chapterItem, currentTime, k = 0,
                    kmax = settings.chapterData.length;
                for (k = 0; k < kmax; k++) {
                    chapterItem = settings.chapterData[k];
                    currentTime = player.currentTime();
                    if (currentTime >= chapterItem.startTime && currentTime <= chapterItem.endTime) {
                        if (highlighted === false) {
                            currentChapterIndex = k;
                            highlightChapter(currentChapterIndex);
                        } else if (currentChapterIndex !== k) {
                            unHighlightChapter(currentChapterIndex);
                            currentChapterIndex = k;
                            highlightChapter(currentChapterIndex);
                            break;
                        }
                    }
                }
            },
            buildChapterString = function (chapters, chapterClass) {
                var str = "",
                    i = 0,
                    imax = chapters.length,
                    chapter;
                for (i = 0; i < imax; i++) {
                    chapter = chapters[i];
                    str += "<div class=\"" + chapterClass + "\" data-time=\"" + chapter.startTime + "\">";
                    if (settings.showThumbnails) {
                        str += "<img class=\"chapter-thumbnail\" src=\"" + chapter.chapterInfo.thumbnail + "\" alt=\"" + chapter.chapterInfo.title + "\"/>";
                    }
                    if (settings.showTitles) {
                        str += "<div class=\"chapter-title\">" + chapter.chapterInfo.title + "</div>";
                    }
                    str += "</div>";
                }
                return str;
            },
            playChapter = function (evt) {
                // seek to time saved in data-index attribute
                player.currentTime(parseFloat(this.getAttribute("data-time")));
                player.play();
                // highlight the new chapter
                highlightChapter(this.getAttribute("data-index"));
            },
            /**
             * wrapPlayer
             * wraps player in a new div
             * arguments: videoDiv: div that contains the video tag
             */
            wrapPlayer = function (videoDiv) {
                // create a new div to wrap the player div
                playerWrapper = document.createElement("div");
                playerWrapper.setAttribute("id", "playerWrapper");
                playerWrapper.setAttribute("class", "player-wrapper");
                /**
                 * get the next sibling of the videoDiv and its parent (if any)
                 * to put the new div in the right place
                 */
                nextNode = videoDiv.nextElementSibling;
                if (nextNode === null) {
                    nextNodeParent = videoDiv.parentNode;
                    playerWrapper = nextNodeParent.insertBefore(playerWrapper, null);
                } else {
                    nextNodeParent = nextNode.parentNode;
                    playerWrapper = nextNodeParent.insertBefore(playerWrapper, nextNode);
                }
                // append the video div to the new wrapper div
                playerWrapper.appendChild(videoDiv);
            },
            addTimelineMarker = function (chapter) {
              var left, top, playerWidth = player.width(), playerHeight = player.height(), videoDuration = player.duration(), markerTime = chapter.startTime, str;
              console.log(markerTime + " , " + videoDuration + " , " + playerWidth)
              left = ((markerTime / videoDuration) * playerWidth) - 5;
              top = playerHeight - 40;
              str = "<span id=\"" + markerTime + "\" class=\"timeline-marker\" style=\"left:" + left + "px;top:" + top + "px;opacity:0;\" title=\"" + chapter.chapterInfo.title + "\" />"
              playerWrapper.insertAdjacentHTML("beforeend", str);
              timelineMarker = document.getElementById(markerTime.toString());
              timelineMarker.addEventListener("click", function () {
                  player.currentTime(markerTime);
                  player.play();
              });
              timelineMarkers.push(timelineMarker);
              videoDiv.addEventListener("mouseover" , function () {
                 var i, max = timelineMarkers.length;
                 for  (i = 0; i < max; i++) {
                     timelineMarkers[i].style.opacity = 1;
                 }
              });
              videoDiv.addEventListener("mouseout" , function () {
                 var i, max = timelineMarkers.length;
                 for  (i = 0; i < max; i++) {
                     timelineMarkers[i].style.opacity = 0;
                 }
              });
            },
            buildChapterDisplay = function (chapterData) {
                var dataObj = {
                    "chapters": chapterData,
                    "playerWidth": player.width(),
                    "playerHeight": player.height()
                },
                    chapterString,
                    chapterTemplate,
                    chapterItem,
                    i = 0,
                    max = chapterData.length,
                    item;
                // check format of time strings and convert to seconds if needed
                if (isNumber(chapterData[0].startTime) === false) {
                    for (i = 0; i < max; i++) {
                        item = chapterData[i];
                        item.startTime = timeToSeconds(item.startTime);
                        item.endTime = timeToSeconds(item.endTime);
                    }
                }
                switch (options.position) {
                case "top":
                    chapterTemplate = "<div id=\"chapterList\" class=\"chapter-list chapter-list-top-bottom\" style=\"width:" + dataObj.playerWidth + ";\">";
                    chapterClass = "chapter chapter-top-bottom";
                    chapterString = buildChapterString(dataObj.chapters, chapterClass);
                    chapterTemplate += chapterString + "</div>";
                    playerWrapper.insertAdjacentHTML("afterbegin", chapterTemplate);
                    break;
                case "right":
                    chapterTemplate = "<div id=\"chapterList\" class=\"chapter-list chapter-list-right\" style=\"height:" + dataObj.playerHeight + "px;left:" + dataObj.playerWidth + "px\">";
                    chapterClass = "chapter chapter-right";
                    chapterString = buildChapterString(dataObj.chapters, chapterClass);
                    chapterTemplate += chapterString + "</div>";
                    playerWrapper.insertAdjacentHTML("beforeend", chapterTemplate);
                    break;
                case "bottom":
                    chapterTemplate = "<div id=\"chapterList\" class=\"chapter-list chapter-list-top-bottom\" style=\"width:" + dataObj.playerWidth + ";\">";
                    chapterClass = "chapter chapter-top-bottom";
                    chapterString = buildChapterString(dataObj.chapters, chapterClass);
                    chapterTemplate += chapterString + "</div>";
                    playerWrapper.insertAdjacentHTML("beforeend", chapterTemplate);
                    break;
                    // if no valid value given for position, use bottom
                default:
                    chapterTemplate = "<div id=\"chapterList\" class=\"chapter-list chapter-list-top-bottom\" style=\"width:" + dataObj.playerWidth + ";\">";
                    chapterClass = "chapter chapter-top-bottom";
                    chapterString = buildChapterString(dataObj.chapters, chapterClass);
                    chapterTemplate += chapterString + "</div>";
                    playerWrapper.insertAdjacentHTML("beforeend", chapterTemplate);
                    break;
                }
                chapterList = document.getElementsByClassName("chapter");
                for (i = 0; i < max; i++) {
                    chapterItem = chapterList[i];
                    chapterItem.setAttribute("data-index", i);
                    chapterItem.addEventListener("click", playChapter);
                    if (settings.showTimelineMarkers) {
                        addTimelineMarker(settings.chapterData[i]);
                    }
                }
                player.on("timeupdate", onTimeUpdate);
            },
            buildChapterData = function (chapters) {
                var i = 0, max = chapters.length, chapter, item = {};
                for (i = 0; i < max; i++) {
                    chapter = chapters[i];
                    item.chapterInfo = JSON.parse(chapter.text);
                    item.startTime = chapter.startTime;
                    item.endTime = chapter.endTime;
                    chapterData.push(item);
                }
                buildChapterDisplay(chapter);
            };
        // initial actions
        settings = extend(defaults, options);
        console.log(settings);
        player = this;
        // get a reference to the div that wraps the video tag
        /**
         * actually gets a node list and this
         * won't work if there are multiple players
         * on the page, unless the chapter player
         * is the first one - but I couldn't find a
         * reliable path to get a reference to the div
         * (or its ID) through the player object
         */
        videoDiv = document.getElementById(player.id());
        // assume our player is the first or only video node
        // videoDiv = videoDivList[0];
        // wrap the player in a new div
        wrapPlayer(videoDiv);
        // check to make sure chapterData was passed
        if (settings.chapterData === []) {
            window.alert("Could not find chapter data");
        } else {
            buildChapterDisplay(settings.chapterData);
        }
        return playChapter;
    });
})();