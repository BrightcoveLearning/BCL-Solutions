/*

* Bumper Plugin for Video JS
* Version: 0.1
* Author: Robert Crooks
* Description: Send analytics events for the Video JS player to Brightcove Analytics
* Options:
*   showLog: if true (default) adds a log to page to show events sent
*   accountID (Video Cloud account ID)
*   videosCollection: array of video objects with properties (default):
*       preroll (true)
*       prerollSrc ("//solutions.brightcove.com/bcls/assets/videos/bumper1.mp4")
*       midroll (true)
*       midrollSrc ("//solutions.brightcove.com/bcls/assets/videos/bumper2.mp4")
*       midrollPosition (.5) [= midpoint of video]
*       postroll (true)
*       postrollSrc ("//solutions.brightcove.com/bcls/assets/videos/Bird_Titmouse.mp4")
* Note: this is a sample only, not a supported Brightcove plugin
*/
(function (videojs, console) {
    "use strict";
    var defaults = {
            "preroll": {
                play: true,
                "src": "//solutions.brightcove.com/bcls/assets/videos/bumper1.mp4",
            },
            "midroll": [
                {
                    "play": true,
                    "src": "//solutions.brightcove.com/bcls/assets/videos/bumper2.mp4",
                    "position": ".5"
                }
            ],
            "postroll": {
                "play": true,
                "src": "//solutions.brightcove.com/bcls/assets/videos/Bird_Titmouse.mp4"
            }
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
            destination = window.location.hostname + window.location.pathname,
            source = document.referrer,
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
            urlStr = "event=" + eventType + "&domain=videocloud&account=" + settings.accountID + "&player=" + player.id() + "&time=" + time + "&destination=" + destination;
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
        // initial actions
        settings = extend(defaults, options);
        player = this;
        // add player event listeners
        player.on("loadstart", function (evt) {
            var dateTime = new Date(evt.timeStamp);
            if (settings.showLog) {
                logEvent("player-event", "loadstart", "", dateTime.toISOString());
            }
            sendAnalyticsEvent("video_impression", evt);
        });
        // add listener for loadedalldata
        player.on("loadedalldata", function (evt) {
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
        init = function () {
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
        }
        init();
        return;
    });
})(videojs, console);


var BCLS = (function() {
        // vars
        var player,
            APIModules,
            mediaEvent,
            videoPlayer,
            bumpers,
            mainVideo,
            bumperType = "midroll",
            restartPosition,
            $controlButtons = $("#bumperControls").children();
        // private functions
        // public functions
        return {
          /**** template loaded event handler ****/
          onTemplateLoad : function (experienceID) {
            // get a reference to the player and API Modules and Events
            player = brightcove.api.getExperience(experienceID);
            APIModules = brightcove.api.modules.APIModules;
            mediaEvent = brightcove.api.events.MediaEvent;
          },
          /**** template ready event handler ****/
          onTemplateReady : function (evt) {
            // get references to modules
            videoPlayer = player.getModule(APIModules.VIDEO_PLAYER);
          // get current video for bumper info
          videoPlayer.getCurrentVideo( function (videoDTO) {
              // bumper info stored in longDescription as JSON
              bumpers = JSON.parse(videoDTO.longDescription);
              // save the main video ID
              mainVideo = videoDTO.id;
              // add PROGRESS listener for main video
              videoPlayer.addEventListener(mediaEvent.PROGRESS, BCLS.onMainProgress);
            });
            // set click handlers for bumper control buttons
            $controlButtons.on("click", function(evt) {
              bumperType = $(this).attr("id");
            });
          },
          /**** main video PROGRESS handler ****/
          onMainProgress : function (evt) {
            // depends on bumperType
            if (bumperType == "midroll" || bumperType == "both") {
              if ((evt.position / evt.duration) > .5) {
                // remove this listener so we don't loop on the bumper
                videoPlayer.removeEventListener(mediaEvent.PROGRESS, BCLS.onMainProgress);
                // save the position
                restartPosition = evt.position;
                // pause the video
                videoPlayer.pause(true);
                // if bumperType is midroll only, set to none
                if (bumperType == "midroll") {
                  bumperType = "none";
                }
                // add PROGRESS listener for bumper
                videoPlayer.addEventListener(mediaEvent.PROGRESS, BCLS.onBumperProgress);
                // load the bumper
                videoPlayer.loadVideoByID(bumpers.midroll);
              }
            }
            else if (bumperType == "postroll") {
              if ((evt.duration - evt.position) < .5) {
                // pause the main video
                videoPlayer.pause(true);
                // set bumperType to none
                bumperType = "none";
                // remove the listener
                videoPlayer.removeEventListener(mediaEvent.PROGRESS, BCLS.onMainProgress);
                // just play the postroll and we are done
                videoPlayer.loadVideoByID(bumpers.postroll);
              }
            }
          },
         /**** handler for bumper PROGRESS ****/
         onBumperProgress : function (evt) {
            if ((evt.duration - evt.position) < .2) {
              // stop the bumper
              videoPlayer.pause(true);
              // remove this event listener
              videoPlayer.removeEventListener(mediaEvent.PROGRESS, BCLS.onBumperProgress);
              // add listener for BEGIN that will seek back to the restart point
              videoPlayer.addEventListener(mediaEvent.PROGRESS, BCLS.seekToRestartPoint);
              // if bumperType is both, set to postroll and reset PROGRESS listener
              if (bumperType == "both") {
                bumperType = "postroll";
              };
              // resume the main video
              videoPlayer.loadVideoByID(mainVideo);
            };
          },
          /**** function to seek to video restart point ****/
          seekToRestartPoint : function(evt) {
            // remove this listener
            videoPlayer.removeEventListener(mediaEvent.PROGRESS, BCLS.seekToRestartPoint);
            // if postroll scheduled, add mainProgress listener
            if (bumperType == "postroll") {
              videoPlayer.addEventListener(mediaEvent.PROGRESS, BCLS.onMainProgress);
            }
            // seek to restart point
            videoPlayer.seek(restartPosition);
          }
        }
      }());
