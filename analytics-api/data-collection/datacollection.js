var BCLS = (function (brightcove, window, document) {
    "use strict";
    var lastPosition = 0, // used for engagement ranges
        // data-collection api
        baseURL = "http://metrics.brightcove.com/tracker?",
        // location properties
        destination = window.location.hostname + window.location.pathname,
        source = document.referrer,
        /* player id - easier to hard-code this
         * it is possible but tedious to get player and video IDs via JavaScript
         */
        playerID = 921267190001,
        // for Smart Player API references
        player,
        modVP,
        mediaEvent,
        videosToSwap = [1595052160001, 3483280272001], // videos we will swap
        currentVideoDTO = {}, // use this to hold the video info object
        // functions
        onTemplateLoaded,
        onTemplateReady,
        onMediaEventFired,
        getVideoDTO,
        injectScript,
        sendAnalyticsEvent,
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
    // send video impression event
    sendAnalyticsEvent = function (eventType, evt) {
        var urlStr = "",
            str,
            now = new Date(),
            dateTime;
        dateTime = now.valueOf();
        // add params for all requests
        urlStr = "event=" + eventType + "&domain=videocloud&account=" + currentVideoDTO.publisherID + "&player=" + playerID + "&time=" + dateTime + "&destination=" + destination;
        // source will be empty for direct traffic
        if (source !== "") {
            urlStr += "&source=" + source;
        }
        // add params specific to video events
        if (eventType === "video_impression" || eventType === "video_view" || eventType === "video_engagement") {
            urlStr += "&video=" + currentVideoDTO.id + "&video_name=" + currentVideoDTO.displayName;
        }
        // add params specific to video_engagement events
        if (eventType === "video_engagement") {
            urlStr += "&video_duration=" + evt.duration + "&range=" + evt.range;
        }
        // URI encode
        urlStr = encodeURI(urlStr);
        // add the base URL
        urlStr = baseURL + urlStr;
        // make the request
        injectScript(urlStr);
        return;
    };
    // player load handler
    onTemplateLoaded = function (experienceID) {
        // player modules and event collections
        player = brightcove.api.getExperience(experienceID);
        modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
        mediaEvent = brightcove.api.events.MediaEvent;
    };
    // player ready handler
    onTemplateReady = function () {
        // get the initial video DTO
        modVP.getCurrentVideo(function (dto) {
            currentVideoDTO = dto;
            /* send player_load and video_impression events
             * technically the player_load event
             * should be sent when the player loads,
             * but to get the video and account ID programatically
             * you need to wait until you can get the current video object
             * which is not safe to do until the player is ready
             */
            sendAnalyticsEvent("player_load", null);
            // send the video_impression event
            sendAnalyticsEvent("video_impression", null);
        });
        // set up media event listeners
        modVP.addEventListener(mediaEvent.BEGIN, BCLS.onMediaEventFired);
        modVP.addEventListener(mediaEvent.CHANGE, BCLS.onMediaEventFired);
        modVP.addEventListener(mediaEvent.COMPLETE, BCLS.onMediaEventFired);
        modVP.addEventListener(mediaEvent.PROGRESS, BCLS.onMediaEventFired);
    };
    // media event handler
    onMediaEventFired = function (evt) {
        var str = "",
            thisPosition, 
            range = "";
        switch (evt.type) {
        case "mediaBegin":
            // send video_view event
            sendAnalyticsEvent("video_view", evt);
            break;
        case "mediaProgress":
            thisPosition = Math.round(evt.position);
            if (thisPosition - lastPosition === 10) {
                // set the range and add it to the evt object
                range = lastPosition.toString() + ".." + thisPosition.toString();
                evt.range = range;
                // reset the last position
                lastPosition = thisPosition;
                // send video_enagement event
                sendAnalyticsEvent("video_engagement", evt);
            }
            break;
            break;
        default:
            // some other player event
            break;
        }
    };
    // get the current video DTO
    getVideoDTO = function () {
        modVP.getCurrentVideo(function (dto) {
            currentVideoDTO = dto;
        });
    };
    return {
        "onTemplateLoaded": onTemplateLoaded,
        "onTemplateReady": onTemplateReady,
        "onMediaEventFired": onMediaEventFired
    };
})(brightcove, window, document);