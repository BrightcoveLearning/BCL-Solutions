(function () {
    var defaults = {
            "position ": "bottom ",
            "chapterData " : []
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
                        if (typeof object[property] === "object ") {
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
            var seconds = 0, len = 0, timeArray, secondsArray;
            // make sure we have the right kind of string
            if (hmsm.indexOf(": ") === -1) {
                return;
            }
            // split at :'s
            timeArray = hmsm.split(": ");
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
    videojs.plugin("makeChapters ", function (options) {
        var player, playerID, playerTracksDisplay, textTrack, trackKind, chapters, videoDivList, videoDiv, videoElement, nextNode, nextNodeParent, playerWrapper, chapterClass, chapterList, currentChapterIndex = 0, highlighted = false,
            unHighlightChapter = function (index) {
                chapterList[index].setAttribute("class ", chapterClass);
            },
            highlightChapter = function (index) {
                chapterList[index].setAttribute("class ", chapterClass + "chapter - highlight ");
                highlighted = true;
            },
            onTimeUpdate = function (evt) {
                var chapterItem, currentTime, k, kmax;
                for (k = 0, kmax = settings.chapterData.length; k < kmax; k++) {
                    chapterItem = settings.chapterData[k];
                    currentTime = player.currentTime();
                    if (currentTime >= chapterItem.startTime && currentTime <= chapterItem.endTime) {
                        if (highlighted === false) {
                            currentChapterIndex = k;
                            highlightChapter(currentChapterIndex);
                        }
                        else if (currentChapterIndex != k) {
                            unHighlightChapter(currentChapterIndex);
                            currentChapterIndex = k;
                            highlightChapter(currentChapterIndex);
                            break;
                        }
                    }
                }
            },
        buildChapterString = function(chapters, chapterClass) {
            var str = "";
            for (var i = 0, imax = chapters.length; i < imax; i++) {
                var chapter = chapters[i];
                str += " < div class = \"" + chapterClass + "\" data-time=\"" + chapter.startTime + "\"><img class=\"chapter-thumbnail\" src=\"" + chapter.chapterInfo.thumbnail + "\" alt=\"" + chapter.chapterInfo.title + "\"/><div class=\"chapter-title\">" + chapter.chapterInfo.title + "</div></div>";
            }
            return str;
        },
        playChapter = function(evt) {
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
        wrapPlayer = function(videoDiv) {
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
        };
        buildChapterDisplay = function(chapterData) {
            var dataObj = {"chapters": chapterData, "playerWidth": player.width(), "playerHeight": player.height()}, chapterString, chapterTemplate;
            // check format of time strings and convert to seconds if needed
            if (isNumber(chapterData[0].startTime) === false) {
                for (var i = 0, max = chapterData.length; i < max; i++) {
                    var item = chapterData[i];
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
            for (var j = 0, jmax = chapterList.length; j < jmax; j++) {
                var chapterItem = chapterList[j];
                chapterItem.setAttribute("data-index", j);
                chapterItem.addEventListener("click", playChapter);
            }
            player.on("timeupdate", onTimeUpdate);
        },
        buildChapterData = function(chapters) {
            for (var i = 0, max = chapters.length; i < max; i++) {
                var chapter = chapters[i], item = {};
                item.chapterInfo = JSON.parse(chapter.text);
                item.startTime = chapter.startTime;
                item.endTime = chapter.endTime;
                chapterData.push(item);
            }
            buildChapterDisplay(chapterData);
        },
        // initial actions
        init = function() {
            settings = extend(defaults, options);
            player = this;
            // get a reference to the div that wraps the video tag
            videoDiv = document.getElementById(player.id());
            // wrap the player in a new div
            wrapPlayer(videoDiv);
            // check to make sure chapterData was passed
            if (settings.chapterData == []) {
                window.alert("Could not find chapter data");
            } else {
                buildChapterDisplay(settings.chapterData);
            }
        };
        init();
        return playChapter;
    });
})();