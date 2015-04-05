/*
* Data Collection Plugin for Video JS
* Version: 0.1
* Author: Robert Crooks
* Description: Send analytics events for the Video JS player to Brightcove Analytics
* Options:
*   showLog: if true (default) adds a log to page to show events sent
*   accountID (Video Cloud account ID)
*   videosCollection: array of video objects with properties:
*       video_name
*       id (Video Cloud video id)
*       src (URL for http rendition to play)
*       poster (URL for the video still)
* Note: this is a sample only, not a supported Brightcove plugin
*/
(function (videojs, window, document, console) {
    "use strict";
    var defaults = {
            "showLog": "true",
            "accountID": 921483702001,
            "videoCollection" : [
                {
                    "video_name": "Forms of Water",
                    "id": 1716964408001,
                    "src": "http://brightcove.vo.llnwd.net/e1/uds/pd/921483702001/921483702001_1717216134001_Water.mp4",
                    "poster": "http://brightcove.vo.llnwd.net/e1/pd/921483702001/921483702001_1717217030001_vs-4ff1fdb256e7b0e42b8ede16-1592194013001.jpg?pubId=921483702001"
                },
                {
                    "video_name": "Birds of a Feather",
                    "id": 1716964407001,
                    "src": "http://brightcove.vo.llnwd.net/e1/uds/pd/921483702001/921483702001_1717220805001_BirdsOfAFeather.mp4",
                    "poster": "http://brightcove.vo.llnwd.net/e1/pd/921483702001/921483702001_1717217180001_vs-4ff1fdbf56e7b0e4348ede16-806787294001.jpg?pubId=921483702001"
                }
            ]
        },
        settings,
        // functions
        extend,
        isDefined,
        bclslog;
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
    };
    // more robust test for strings "not defined"
    isDefined =  function (v) {
        if (v !== "" && v !== null && v !== "undefined" && v !== undefined) {
            return true;
        }
        return false;
    };
    // safe console logger
    bclslog = function (message) {
        if (console) {
            console.log(message);
        }
    };
    /**
     * register the makeChapters plugin
     */
    videojs.plugin("collectData", function (options) {
        var player,
            videoDiv,
            nextNode,
            nextNodeParent,
            playerWrapper,
            eventLog,
            changeVideoBtn,
            currentVideoIndex = 0,
            lastVideoIndex = 0,
            firstTimeUpdate = true,
            initialPosition = 0,
            lastPosition = 0,
            // data-collection api
            baseURL = "http://metrics.brightcove.com/tracker?",
            // location properties
            destination = encodeURI(window.location.href),
            source = encodeURI(document.referrer),
            // functions
            onTimeUpdate,
            loadVideo,
            logEvent,
            injectScript,
            sendAnalyticsEvent,
            wrapPlayer,
            addEventLog,
            init;
        // load the next video into the player
        loadVideo = function () {
            player.src({
                "type": "video/mp4",
                "src": settings.videoCollection[currentVideoIndex].src
            });
            /* each time we load a video, we want to add an event listener for the play event that will unload after one event */
            player.one("play", function (evt) {
                var dateTime = new Date();
                evt.timeStamp = dateTime.valueOf();
                if (settings.showLog) {
                    logEvent("player-event", "play", "", dateTime.toISOString());
                }
                sendAnalyticsEvent("video_view", evt);
            });
            // reset firstTimeUpdate
            firstTimeUpdate = true;
            // increment or reset current video index
            lastVideoIndex = currentVideoIndex;
            if (currentVideoIndex < (settings.videoCollection.length - 1)) {
                currentVideoIndex++;
            } else {
                currentVideoIndex = 0;
            }
        };
        /**
         * Injects API calls into the head of a document
         * as the src for a script tag
         * @param string [pQuery] The query string for the API call to inject
         * @return true
         */
        injectScript = function (requestURL) {
            var scriptElement = document.createElement("script");
            scriptElement.setAttribute("src", requestURL);
            scriptElement.setAttribute("type", "text/javascript");
            document.getElementsByTagName("head")[0].appendChild(scriptElement);
            return true;
        };
        // send analytics event
        sendAnalyticsEvent = function (eventType, evt) {
            var urlStr = "",
                time = evt.timeStamp,
                dateTime = new Date(parseInt(evt.timeStamp)),
                currentVideo = settings.videoCollection[lastVideoIndex];
            // add params for all requests
            urlStr = "event=" + eventType + "&domain=videocloud&account=" + settings.accountID + "&time=" + time + "&destination=" + encodeURI(destination);
            // source will be empty for direct traffic
            if (source !== "") {
                urlStr += "&source=" + encodeURI(source);
            }
            // add params specific to video events
            if (eventType === "video_impression" || eventType === "video_view" || eventType === "video_engagement") {
                urlStr += "&video=" + currentVideo.id + "&video_name=" + encodeURI(currentVideo.video_name);
            }
            // add params specific to video_engagement events
            if (eventType === "video_engagement") {
                urlStr += "&video_duration=" + player.duration() + "&range=" + evt.range;
            }
            // add the base URL
            urlStr = baseURL + urlStr;
            // make the request
            injectScript(urlStr);
            // log that we did this
            if (settings.showLog) {
                logEvent("analytics-event", eventType, ("Data Collection request: " + urlStr), dateTime.toISOString());
            }
            return;
        };
        onTimeUpdate = function (evt) {
            var thisPosition = evt.timeStamp, range = "", dateTime = new Date(evt.timeStamp);
            if (firstTimeUpdate) {
                initialPosition = evt.timeStamp;
                lastPosition = evt.timeStamp;
                firstTimeUpdate = false;
            }
            if (Math.round(thisPosition / 1000) - Math.round(lastPosition / 1000) === 10) {
                // set the range and add it to the evt object
                range = ((lastPosition - initialPosition) / 1000).toString() + ".." + ((thisPosition - initialPosition) / 1000).toString();
                // reset lastPosition
                lastPosition = thisPosition;
                evt.range = range;
                // log player event
                if (settings.showLog) {
                    logEvent("player-event", "position update", (((thisPosition - initialPosition) / 1000) + " sec"), dateTime.toISOString());
                }
                // send video_enagement event
                sendAnalyticsEvent("video_engagement", evt);
            }
        };
        // event logger
        logEvent = function (eventType, event, data, dateTime) {
            var str = "";
            str += "<span class=\"" + eventType + "\">" + dateTime + "<br />" + eventType + ": " + event;
            if (data !== "") {
                str += " (" + data + " )";
            }
            str += "</span><br /><hr />";
            eventLog.innerHTML += str;
            return;
        };
        /**
         * wrapPlayer
         * wraps player in a new div
         * arguments: videoDiv: div that contains the video tag
         */
        wrapPlayer = function (videoDiv) {
            var btnWrapper;
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
            // add control button to change video
            btnWrapper = document.createElement("div");
            changeVideoBtn = document.createElement("span");
            changeVideoBtn.setAttribute("class", "bcls-btn");
            changeVideoBtn.setAttribute("id", "changeVideoBtn");
            changeVideoBtn.innerHTML = "Change Video";
            // add buttons to button div
            btnWrapper.appendChild(changeVideoBtn);
            // add button wrapper to player wrapper
            playerWrapper.appendChild(btnWrapper);
            // add button event listener
            changeVideoBtn.addEventListener("click", loadVideo);
        };
        addEventLog = function () {
            // create a new divs and buttons for event log and buttons
            var eventLogHeader = document.createElement("h2");
            eventLogHeader.innerHTML = "Event log";
            eventLog = document.createElement("div");
            eventLog.setAttribute("id", "eventLog");
            eventLog.setAttribute("class", "event-log");
            // add log and header after the player
            playerWrapper.appendChild(eventLogHeader);
            playerWrapper.appendChild(eventLog);
        };
        init = function () {
            // add player event listeners
            player.on("loadstart", function (evt) {
                var dateTime = new Date(evt.timeStamp);
                if (settings.showLog) {
                    logEvent("player-event", "loadstart", "", dateTime.toISOString());
                }
                sendAnalyticsEvent("video_impression", evt);
            });
            // add listener for loadedalldata
            player.on("loadedalldata", function () {
                var dateTime = new Date();
                if (settings.showLog) {
                    logEvent("player-event", "loadedalldata", "", dateTime.toISOString());
                }
                player.play();
            });
            // add listener for video ended
            player.on("ended", function () {
                var dateTime = new Date();
                if (settings.showLog) {
                    logEvent("player-event", "ended", "", dateTime.toISOString());
                }
                loadVideo();
            });
            // add listener for time updates events
            player.on("timeupdate", onTimeUpdate);
            // get a reference to the div that wraps the video tag
            videoDiv = document.getElementById(player.id());
            // wrap the player in a new div
            wrapPlayer(videoDiv);
            // add log if wanted
            if (settings.showLog) {
                addEventLog();
            }
            // load the first video in the collection
            loadVideo();
        };
        // initial actions
        settings = extend(defaults, options);
        player = this;
        init();
        return;
    });
})(videojs, window, document, console);
