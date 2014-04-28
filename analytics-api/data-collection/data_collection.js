/*
* Data Collection Plugin for Video JS
* Version: 0.1
* Author: Robert Crooks
* Description: Send analytics events for the player to Brightcove Analytics
* Options:
*   showLog: if true (default) adds a log to page to show events sent
*   accountID (Video Cloud account ID)
*   videosCollection: array of video objects with properties:
*       video_name
*       id
*       src (URL for http rendition to play)
*       poster (URL for the video still)
* Note: this is a sample only, not a supported Brightcove plugin
*/
(function (videojs) {
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
            playerID,
            videoDiv,
            videoElement,
            nextNode,
            nextNodeParent,
            playerWrapper,
            eventLog,
            changeVideoBtn,
            resetBtn,
            currentVideoIndex = 0,
            firstTimeUpdate = true,
            initialPosition,
            lastPosition = 0,
            // data-collection api
            baseURL = "http://metrics.brightcove.com/tracker?",
            // location properties
            destination = window.location.hostname + window.location.pathname,
            source = document.referrer,
            // functions
            onTimeUpdate,
            loadVideo,
            logEvent,
            injectScript,
            sendAnalyticsEvent,
            wrapPlayer,
            addEventLog;
        // load the next video into the player
        loadVideo = function () {
            player.src({
                "type": "video/mp4",
                "src": settings.videoCollection[currentVideoIndex].src
            });
            /* each time we load a video, we want to add an event listener for the play event that will unload after one event */
            player.one("play", function (evt) {
                logEvent("player-event", "play", "")
                sendAnalyticsEvent("video_view", null);
            });
            // reset firstTimeUpdate
            firstTimeUpdate = true;
            // increment or reset current video index
            if (currentVideoIndex < settings.videoCollection.length) {
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
                str,
                now = new Date(),
                dateTime,
                currentVideo = settings.videoCollection[currentVideoIndex];
            dateTime = now.valueOf();
            // add params for all requests
            urlStr = "event=" + eventType + "&domain=videocloud&account=" + settings.accountID + "&player=" + player.id() + "&time=" + dateTime + "&destination=" + destination;
            // source will be empty for direct traffic
            if (source !== "") {
                urlStr += "&source=" + source;
            }
            // add params specific to video events
            if (eventType === "video_impression" || eventType === "video_view" || eventType === "video_engagement") {
                urlStr += "&video=" + currentVideo.id + "&video_name=" + currentVideo.video_name;
            }
            // add params specific to video_engagement events
            if (eventType === "video_engagement") {
                urlStr += "&video_duration=" + player.duration() + "&range=" + evt.range;
            }
            // URI encode
            urlStr = encodeURI(urlStr);
            // add the base URL
            urlStr = baseURL + urlStr;
            // make the request
            injectScript(urlStr);
            // log that we did this
            if (settings.showLog) {
                logEvent("analytics-event", "eventType", ("Data Collection request: " + urlStr));
            }
            return;
        };
        onTimeUpdate = function (evt) {
            var thisPosition = evt.timeStamp, range = "";
            bclslog(evt);
            if (firstTimeUpdate) {
                initialPosition = evt.timeStamp;
                lastPosition = evt.timeStamp;
                firstTimeUpdate = false;
            }
            
            bclslog(Math.ceil(thisPosition / 1000) - Math.ceil(lastPosition / 1000));
            if (Math.ceil(thisPosition / 1000) - Math.ceil(lastPosition / 1000) === 10) {
                // set the range and add it to the evt object
                range = ((lastPosition - initialPosition) / 1000).toString() + ".." + ((thisPosition - initialPosition) / 1000).toString();
                evt.range = range;
                // reset lastPosition
                lastPosition = thisPosition;
                // log player event
                if (settings.showLog) {
                    logEvent("player-event","position update", (((thisPosition - initialPosition) / 1000) + " sec"));
                }
                // send video_enagement event
                sendAnalyticsEvent("video_engagement", evt);
            };
        };
        // event logger
        logEvent = function (eventType, event, data) {
            var str = "";
            str += "<span class=\"" + eventType + "\">Player event: " + event;
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
            changeVideoBtn = document.createElement("button");
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
        addEventLog = function (chapter) {
            // create a new divs and buttons for event log and buttons
            eventLog = document.createElement("div");
            eventLog.setAttribute("id", "eventLog");
            eventLog.setAttribute("class", "event-log");
            // add log and buttons after the player
            playerWrapper.appendChild(eventLog);
        };
        // initial actions
        settings = extend(defaults, options);
        player = this;
        // add player event listeners
        player.on("loadstart", function (evt) {
            if (settings.showLog) {
                logEvent("player-event", "loadstart", "");
            }
            sendAnalyticsEvent("video_impression", null);
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
        return;
    });
})(videojs);