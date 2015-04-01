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
        proxyURL = "https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.php",
        $serviceURL = $("#serviceURL"),
        account_id,
        $client_secret_display = $("#client_secret_display"),
        $client_id_display = $("#client_id_display"),
        $client_id = $("#client_id"),
        $client_secret = $("#client_secret"),
        client_id,
        client_secret,
        default_client_id = "5746d707-db97-42b2-b4f0-3db890429ef0",
        default_client_secret = "JBdg3PLg0NarokKjIihxa_05i-YVyvhICWlQ5NXMSlUX9H9tzYqQ8FE-4mMfhAWOMs0KxUHyUN3anzkZSr3Bvg",
        $APIrequestType = $("#aapiRequestType"),
        requestType,
        $accountID = $("#accountID"),
        $dimension = $("#dimension"),
        fromPicker,
        toPicker,
        to = document.getElementById("to"),
        from = document.getElementById("from"),
        $whereInputs = $(".where-input"),
        $player = $("#player"),
        $requestButton = $("#requestButton"),
        $request = $("#request"),
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
        $getPlaylists = $("#getPlaylists"),
        handleBarsTemplate = "<option>Select a Playlist</option>{{#items}}<option value=\"{{id}}\">{{name}}</option>{{/items}}",
        $playlistSelectWrapper = $("#playlistSelectWrapper"),
        $playlistSelector = $("#playlistSelector"),
        playlistSelector = document.getElementById("playlistSelector"),
        $analyticsData = $("#analyticsData"),
        videoIds = [],
        currentVideoIndex = 0,
        failNumber = 0,
        aapiFailNumber = 0,
        requestOptions = {},
        // functions
        reset,
        bclslog,
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
        gettingData = false,
        now = new Date(),
        nowMS = now.valueOf(),
        fromMS = nowMS - (30 * 24 * 60 * 60 * 1000),
        fromDate = new Date(fromMS),
        nowISO = now.toISOString(),
        fromISO = fromDate.toISOString();
    // utilities
    bclslog = function (context, message) {
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
        bclslog("jsonData", jsonData);
        bclslog("page_number", page_number);
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
            // bclslog("total_pages", total_pages);
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
                    // bclslog("dataObj", dataObj);
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
        bclslog("videoIds", videoIds);
        totalVideos = videoIds.length - 1;
        bclslog("totalVideos", totalVideos);
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
                window.alert("You must provide client credentials");
                // stop right here
                return;
            }
        });
        // reset requestTrimmed to false in case of regenerate request
        requestTrimmed = false;
        requestURL = "https://analytics.api.brightcove.com/v1/data";
        requestURL += "?accounts=" + removeSpaces($accountID.val()) + "/";
        // report dimensions
        requestURL += "&dimensions=video";
        // add video filter
        requestURL += "&where=video==" + videoIds.join();
        // check for player filter
        if ($player.val() !== "") {
            requestURL += ";player==" + $player.val();
        }
        requestURL += "&format=" + $format.val() + "&";
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
        requestURL += "limit=all&fields=engagement_score,play_rate,video,video_duration,video_engagement_1,video_engagement_100,video_engagement_25,video_engagement_50,video_engagement_75,video_impression,video_name,video_percent_viewed,video_seconds_viewed,video_view";
        // add format
        requestURL += "format=" + $format.val();

        // strip trailing ? or & and replace &&s
        trimRequest();
        $request.html(requestURL);
        $request.attr("value", requestURL);
        // if getting data initiated, get data
        if (gettingData) {
            getData();
        }
    };
    // submit request
    getData = function () {
        bclslog("requestURL", requestURL);
        $responseFrame.html("Loading...");
        requestOptions.url = requestURL;
        requestOptions.client_id = (isDefined($client_id_display.val())) ? $client_id_display.val() : default_client_id;
        requestOptions.client_secret = (isDefined($client_secret_display.val())) ? $client_secret_display.val() : default_client_secret;
        requestOptions.requestType = "GET";
        bclslog("requestOptions", requestOptions);
        $.ajax({
            url: proxyURL,
            type: "POST",
            data: requestOptions,
            success : function(data) {
                try {
                   var data = JSON.parse(data);
                } catch (e) {
                   alert('invalid json');
                }
                $responseFrame.html(BCLSformatJSON.formatJSON(JSON.parse(data)));
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, your request was not successful. Here is what the server sent back: " + errorThrown);
            }
        });
    };

    // get a playlist collection
    getPlaylists = function () {
        // set up the Media API call, using data from the Analytics API call
        bclslog("firstRun", firstRun);
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
