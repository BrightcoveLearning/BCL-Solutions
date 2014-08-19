var BCLS = (function ($, window, Pikaday) {
    "use strict";
    var // media api stuff
        getPlaylists,
        page_size = 100,
        page_number = 0,
        total_pages = 0,
        playlistData = [],
        analyticsData = {},
        $playlistInfo = $("#playlistInfo"),
        $mapitoken = $("#mapitoken"),
        $readApiLocation = $("#readApiLocation"),
        params = {},
        videoOptionTemplate = "{{#items}}<option value=\"{{id}}\">{{name}}</option>{{/items}}",
        // aapi stuff
        $serviceURL = $("#serviceURL"),
        $accountID = $("#accountID"),
        $token = $("#token"),
        $dimension = $("#dimension"),
        fromPicker,
        toPicker,
        to = document.getElementById("to"),
        from = document.getElementById("from"),
        $whereInputs = $(".where-input"),
        $player = $("#player"),
        $requestButton = $("#requestButton"),
        $request = $("#request"),
        $authorization = $("#authorization"),
        $authorizationDisplay = $("#authorizationDisplay"),
        $requestForm = $("#requestForm"),
        $aapiParams = $("#aapiParams"),
        $requestSubmitter = $("#requestSubmitter"),
        $submitButton = $("#submitButton"),
        $required = $(".required"),
        $format = $("#format"),
        $requestInputs = $(".aapi-request"),
        $directVideoInput = $("#directVideoInput"),
        $responseFrame = $("#responseFrame"),
        $this,
        separator = "",
        requestTrimmed = false,
        lastChar = "",
        requestURL = "",
        authorization = "",
        endDate = "",
        startDate = "",
        rollupDimensionOptions = "<option value=\"account\">account</option>",
        reportDimensionOptions = "<option value=\"player\">player</option><option value=\"video\">video</option><option value=\"referrer_domain\">referrer_domain</option><option value=\"source_type\">source_type</option><option value=\"search_terms\">search_terms</option><option value=\"device_type\">device_type</option><option value=\"device_os\">device_os</option>",
        $getPlaylists = $("#getPlaylists"),
        handleBarsTemplate = "<option>Select a Playlist</option>{{#items}}<option value=\"{{id}}\">{{name}}</option>{{/items}}",
        $playlistSelectWrapper = $("#playlistSelectWrapper"),
        $playlistSelector = $("#playlistSelector"),
        playlistSelector = document.getElementById("playlistSelector"),
        $analyticsData = $("#analyticsData"),
        videoIds = [],
        currentVideoIndex = 0,
        failNumber = 0,
        // functions
        reset,
        logit,
        firstRun = true,
        onPlaylistSelect,
        onMAPIresponse,
        addArrayItems,
        analyticsRequestNumber = 0,
        totalVideos = 0,
        trimRequest,
        removeSpaces,
        buildRequest,
        isDefined,
        deDupe,
        getData,
        processData,
        doFinalProcessing,
        gettingData = false,
        now = new Date(),
        nowMS = now.valueOf(),
        fromMS = nowMS - (30 * 24 * 60 * 60 * 1000),
        fromDate = new Date(fromMS),
        nowISO = now.toISOString(),
        fromISO = fromDate.toISOString();
    // utilities
    logit = function (context, message) {
        if (console) {
            console.log(context, message);
        }
    };
    // more robust test for strings "not defined"
    isDefined =  function (v) {
        if (v !== "" && v !== null && v !== "undefined" && v!== undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    /*
    de-dupe array of objects based on selected property
    note the comparison here is case-sensitive
    for non-case-sensitive comparison, change
    targetArray[i].prop to targetArray[i].prop.toLowerCase()
    */
    deDupe = function (targetArray, prop) {
        var i, j, totalItems = targetArray.length;
        for (i = 0; i < totalItems; i++) {
            for (j = i + 1; j < totalItems; j++) {
                if (targetArray[i][prop] === targetArray[j][prop]) {
                    targetArray.splice(j, 1);
                }
            }
        }
        return targetArray;
    };

    // reset everything
    reset = function () {
	    firstRun = true;
	    $playlistSelectWrapper.attr("class", "bcls-hidden");
	    $playlistSelector.html("");
	    $getPlaylists.html("Get playlists");
	    $getPlaylists.attr("class", "run-button");
	    $getPlaylists.on("click", getPlaylists);
        to.value = nowISO;
        from.value = fromISO;
	    page_number = 0;
    };
    onMAPIresponse = function(jsonData) {
        logit("jsonData", jsonData);
        logit("page_number", page_number);
        // merge the data into the html template using Handlebars
        var template = Handlebars.compile(handleBarsTemplate),
            data,
            dataObj = {},
            result,
            i,
            iMax;

        // if first run change the button text
        if (firstRun) {
            // display the selector and get analytics button
            $playlistSelectWrapper.attr("class", "bcls-shown");
            $getPlaylists.html("Getting playlists...please wait...");
            // add event listener
            $playlistSelector.on("change", BCLS.onPlaylistSelect);
            // get total pages
            total_pages = Math.ceil(jsonData.total_count / page_size);
            // logit("total_pages", total_pages);
            // turn off firstRun flag
            firstRun = false;
            getPlaylists();
        } else {
            if (isDefined(jsonData.items)) {
                // save the items
                iMax = jsonData.items.length;
                for (i = 0; i < iMax; i++) {
                    playlistData.push(jsonData.items[i]);
                }
                // check to see if there are more playlists to fetch
                if (page_number === (total_pages - 1)) {
                    $getPlaylists.html("No more playlists");
                    $getPlaylists.attr("class", "bcls-hidden");
                    dataObj.items = playlistData;
                    // logit("dataObj", dataObj);
                    // populate the playlist selector
                    data = dataObj;
                    result = template(data);
                    $playlistSelector.html(result);
                } else {
                    // increment page_number
                    page_number++;
                    getPlaylists();
                }
            } else {
                // bad MAPI response, retry up to 5 times
                if (failNumber < 6) {
                    failNumber++;
                    getPlaylists();
                }
            }

        }
    };
    onPlaylistSelect = function () {
        var selectedPlaylist = playlistData[(playlistSelector.selectedIndex - 1)];
        videoIds = selectedPlaylist.videoIds;
        logit("videoIds", videoIds);
        totalVideos = videoIds.length - 1;
        logit("totalVideos", totalVideos);
        // undim param input fields
        $aapiParams.attr("class", "bcls-shown");
        $requestSubmitter.attr("class", "bcls-shown");
        // set playlist info in analyticsData
        analyticsData.playlist_id = selectedPlaylist.id;
        analyticsData.playlist_name = selectedPlaylist.name;
        analyticsData.average_engagement_score = 0;
        analyticsData.average_play_rate = 0;
        analyticsData.average_video_engagement_1 = 0;
        analyticsData.average_video_engagement_25 = 0;
        analyticsData.average_video_engagement_50 = 0;
        analyticsData.average_video_engagement_75 = 0;
        analyticsData.average_video_engagement_100 = 0;
        analyticsData.total_video_impression = 0;
        analyticsData.average_video_percent_viewed = 0;
        analyticsData.total_video_seconds_viewed = 0;
        analyticsData.total_video_view = 0;
        analyticsData.individual_video_data = [];
        buildRequest();
    };
    removeSpaces = function (str) {
        if (isDefined(str)) {
            str = str.replace(/\s+/g, '');
        return str;
        }
    };

    trimRequest = function () {
        if (!requestTrimmed) {
            lastChar = requestURL.charAt((requestURL.length - 1));
            if (lastChar === "?" || lastChar === "&" || lastChar === ";") {
                requestURL = requestURL.substring(0, (requestURL.length - 1));
                // recall this function until trim finished
                trimRequest(requestURL);
            } else if (requestURL.indexOf("&&") > -1) {
                requestURL = requestURL.replace("&&", "&");
            } else if (requestURL.indexOf("?&") > -1) {
                requestURL = requestURL.replace("?&", "?");
            } else {
                requestTrimmed = true;
            }
        }
    };

    buildRequest = function () {
        // check for required fields
        $required.each(function () {
            $this = $(this);
            if ($this.val === "") {
                window.alert("You must provide a service URL, account ID, and a token");
                // stop right here
                return;
            }
        });
        // reset requestTrimmed to false in case of regenerate request
        requestTrimmed = false;
        // build the request
        authorization = "Bearer " + removeSpaces($token.val());
        requestURL = $serviceURL.val();
        requestURL += "/account/" + removeSpaces($accountID.val()) + "/";
        // report dimensions
        requestURL += "report/";
        requestURL += "?dimensions=video&";
        // add video filter
        requestURL += "where=video==" + videoIds[currentVideoIndex] ;
        // check for player filter
        if ($player.val() !== "") {
            requestURL += ";player==" + $player.val() + "&";
        } else {
            requestURL += "&";
        }
        // check for time filters
        startDate = from.value;
        if (startDate !== " ") {
            requestURL += "from=" + startDate + "&";
        }
        endDate = to.value;
        if (endDate !== " ") {
            requestURL += "to=" + endDate + "&";
        }
        // add limit and fields
        requestURL += "limit=all&fields=all";
        // strip trailing ? or & and replace &&s
        trimRequest();
        $request.html(requestURL);
        $authorizationDisplay.html(authorization);
        $request.attr("value", requestURL);
        $authorization.attr("value", authorization);
        // if getting data initiated, get data
        if (gettingData) {
            getData();
        }
    };
    // final Processing
    doFinalProcessing = function () {
        gettingData = false;
        // dedupe the individual video data inArray
        analyticsData.individual_video_data = deDupe(analyticsData.individual_video_data, "video");
        analyticsData.average_engagement_score      = analyticsData.average_engagement_score / totalVideos;
        analyticsData.average_play_rate             = analyticsData.average_play_rate / totalVideos;
        analyticsData.average_video_engagement_1    = analyticsData.average_video_engagement_1 / totalVideos;
        analyticsData.average_video_engagement_25   = analyticsData.average_video_engagement_25 / totalVideos;
        analyticsData.average_video_engagement_50   = analyticsData.average_video_engagement_50 / totalVideos;
        analyticsData.average_video_engagement_75   = analyticsData.average_video_engagement_75 / totalVideos;
        analyticsData.average_video_engagement_100  = analyticsData.average_video_engagement_100 / totalVideos;
        analyticsData.average_video_percent_viewed  = analyticsData.average_video_percent_viewed / analyticsData.total_video_view;
        $responseFrame.html(BCLSformatJSON.formatJSON(analyticsData));
        // next line just for this display - remove if reusing this code
        $('pre code').each(function (i, e) {
            hljs.highlightBlock(e);
        });
    }

     // store returned data and do math to sum up playlist totals
     processData = function (aapiData) {
        // check for items
        if (aapiData.item_count !== 0) {
            // add current data to totals
            analyticsData.individual_video_data.push(aapiData);
            analyticsData.average_engagement_score += aapiData.items[0].engagement_score;
            analyticsData.average_play_rate += aapiData.items[0].play_rate;
            analyticsData.average_video_engagement_1 += aapiData.items[0].video_engagement_1;
            analyticsData.average_video_engagement_25 += aapiData.items[0].video_engagement_25;
            analyticsData.average_video_engagement_50 += aapiData.items[0].video_engagement_50;
            analyticsData.average_video_engagement_75 += aapiData.items[0].video_engagement_75;
            analyticsData.average_video_engagement_100 += aapiData.items[0].video_engagement_100;
            analyticsData.total_video_impression += aapiData.items[0].video_impression;
            analyticsData.average_video_percent_viewed += aapiData.items[0].video_percent_viewed;
            analyticsData.total_video_seconds_viewed += aapiData.items[0].video_seconds_viewed;
            analyticsData.total_video_view += aapiData.items[0].video_view;
            if (currentVideoIndex === (totalVideos)) {
                // all done; time to compute the averages
                doFinalProcessing();
            } else {
                // get the next data set
                $submitButton.addClass("bcls-hidden");
                $responseFrame.html("<span style=\"color:#CC0000\">Processing - please wait....</span>")
                currentVideoIndex++;
                gettingData = true;
                buildRequest();
            }
        } else {
            if (currentVideoIndex === totalVideos) {
                doFinalProcessing();
            } else {
                // get the next data set
                analyticsRequestNumber++;
                currentVideoIndex++;
                gettingData = true;
                buildRequest();
            }
        }
    };
    // submit request
    getData = function () {
        var format = $format.val();
        logit("currentVideoIndex", currentVideoIndex);
        gettingData = true;
        $.ajax({
            url: $request.attr("value"),
            headers: {
                Authorization : $authorization.attr("value")
            },
            success : function(data) {
                processData(data);
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, your request was not successful. Here is what the server sent back: " + errorThrown);
            }
        });
    };
    // get a playlist collection
    getPlaylists = function () {
        // set up the Media API call, using data from the Analytics API call
        logit("firstRun", firstRun);
        BCMAPI.url = $readApiLocation.val();
        BCMAPI.token = $mapitoken.val();
        BCMAPI.callback = "BCLS.onMAPIresponse";

        if (firstRun === true) {
            // remove the button event listener
            $getPlaylists.off("click", getPlaylists);
            params.get_item_count = true;
            params.page_size = 1;
            params.video_fields = "id";
        } else {
            params.video_fields = "id,name,thumbnailURL";
            params.page_size = page_size;
            params.page_number = page_number;
            params.sort_by = "MODIFIED_DATE";
            params.sort_order = "DESC";
        }
        BCMAPI.find("find_all_playlists", params);
    };

    // add date pickers to the date input fields
    fromPicker = new Pikaday({
        field: document.getElementById("from"),
        format: 'YYYY-MM-DD',
        onSelect: buildRequest
    });
    toPicker = new Pikaday({
        field: document.getElementById("to"),
        format: 'YYYY-MM-DD',
        onSelect: buildRequest
    });
    // populate to/from fields with default values
    nowISO = nowISO.substring(0, nowISO.indexOf("T"));
    fromISO = fromISO.substring(0, fromISO.indexOf("T"));
    to.value = nowISO;
    from.value = fromISO;

    // set event listeners
    $getPlaylists.on("click", getPlaylists);
    // set listener for form fields
    $requestInputs.on("change", function () {
        // reset();
        buildRequest();
    });
    // send request
    $submitButton.on("click", function () {
        // reset current video index
        currentVideoIndex = 0;
        // make sure request data is current
        buildRequest();
        getData();
    });

    // generate initial request
    buildRequest();
    return {
        onMAPIresponse : onMAPIresponse,
        onPlaylistSelect : onPlaylistSelect
    };
})($, window, Pikaday);
