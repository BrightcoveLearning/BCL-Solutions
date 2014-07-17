var BCLS = (function ($, window, Pikaday) {
    "use strict";
    var // media api stuff
        getTags,
        page_size = 25,
        page_number = 0,
        playlistData = [],
		tagArray = [],
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
        $getTags = $("#getTags"),
        handleBarsTemplate = "{{#each .}}<option value=\"{{this}}\">{{this}}</option>{{/each}}",
        $tagSelectWrapper = $("#tagSelectWrapper"),
        $tagSelector = $("#tagSelector"),
        tagSelector = document.getElementById("tagSelector"),
        $analyticsData = $("#analyticsData"),
        videoIds = [],
        currentVideoIndex = 0,
        // functions
        reset,
        logit,
        firstRun = true,
        onTagsSelect,
        onMAPIresponse,
		onMAPIresponse2,
		removeDuplicateElements,
		results,
        removeSpaces,
		createAnalyticsRequest,
        isDefined,
        addArrayItems,
        analyticsRequestNumber = 0,
        totalVideos = 0,
        trimRequest,
        removeSpaces,
        buildRequest,
        isDefined,
        getData,
        processData,
        gettingData = false;

    // utilities
    logit = function (context, message) {
        if (console) {
            console.log(context);
            console.log(message);
        }
    }
    // allow array forEach method in older browsers
    if ( !Array.prototype.forEach ) {
        Array.prototype.forEach = function(fn, scope) {
            for(var i = 0, len = this.length; i < len; ++i) {
                fn.call(scope || this, this[i], i, this);
            }
        }
    }
    // more robust test for strings "not defined"
    isDefined =  function (v) {
        if (v !== "" && v !== null && v !== "undefined") {
            return true;
        }
        else {
            return false;
        }
    }
    // reset everything
    reset = function () {
	    firstRun = true;
	    $tagSelectWrapper.attr("class", "bcls-hidden");
	    $tagSelector.html("");
	    $getTags.html("Get playlists");
	    $getTags.attr("class", "run-button");
	    $getTags.on("click", getTags);
	    page_number = 0;
    }
	// call the Media API to get a list of tags for an account
    getTags = function () {
        // set up the Media API call
        BCMAPI.url = $readApiLocation.val();
        BCMAPI.token = $mapitoken.val();
        BCMAPI.callback = "BCLS.onMAPIresponse";
        params.page_size = page_size;
        params.page_number = page_number;
        params.get_item_count = true;
		params.video_fields = "tags";
		BCMAPI.search(params);
    }
    onMAPIresponse = function(jsonData) {
		console.log(jsonData);
        // merge the data into the html template using Handlebars
        var template = Handlebars.compile(handleBarsTemplate);
		
		// build an array of all tag array items for each video
		tagArray = jsonData["items"][0].tags;
		for (var i = 1; i < jsonData["items"].length; i++) {
			tagArray.push.apply(tagArray, jsonData["items"][i].tags);
		}
		// remove duplicate tag values
		tagArray = removeDuplicateElements(tagArray);
		console.dir(tagArray);
		
        // inject the HTML for the video list
		results = template(tagArray);
        $tagSelector.html(results);
		
        // if first run change the button text
        // increment page_number
        page_number++;
        if (firstRun) {
            // display the selector and get analytics button
            $tagSelectWrapper.attr("class", "bcls-shown");
            $getTags.html("Get next set of tags");
            // add event listener
            $tagSelector.on("change", BCLS.onTagsSelect);
        }
        // check to see if there are more playlists to fetch
        if (jsonData.total_count <= (page_size * page_number)) {
            $getTags.html("No more tags");
            $getTags.attr("class", "bcls-hidden");
            $getTags.off("click", getTags);
        }
        // turn off firstRun flag
        firstRun = false;
    }
	removeDuplicateElements = function (arrayName) {
		var newArray = new Array();
		label: for (var i = 0; i < arrayName.length; i++) {
			for (var j = 0; j < newArray.length; j++) {
				if (newArray[j] == arrayName[i])
					continue label;
			}
			newArray[newArray.length] = arrayName[i];
		}
		return newArray;
	}
	// call the Media API to get all videoids for selected tag values
    onTagsSelect = function () {
		console.log("onTagsSelect");
		console.log(tagArray[tagSelector.selectedIndex]);
//        var selectedPlaylist = playlistData[(tagSelector.selectedIndex - 1)];
//        videoIds = selectedPlaylist.videoIds;
//        totalVideos = videoIds.length;
		// set up the Media API call
//        BCMAPI.url = $readApiLocation.val();
//        BCMAPI.token = $mapitoken.val();
        BCMAPI.callback = "BCLS.onMAPIresponse2";
//		params = {};
        params.page_size = page_size;
        params.page_number = page_number;
        params.get_item_count = true;
		params.video_fields = "id,shortDescription";
		var selectedTag = tagArray[tagSelector.selectedIndex];
		params.any = "tag:" + selectedTag;
		BCMAPI.search(params);
        
    }
	onMAPIresponse2 = function(jsonData) {
		console.log("onMAPIresponse2");
		console.log(jsonData);
		console.log(BCMAPI.request);
        // merge the data into the html template using Handlebars
        
        
    }
	createAnalyticsRequest = function () {
		// undim param input fields
        $aapiParams.attr("class", "bcls-shown");
        $requestSubmitter.attr("class", "bcls-shown")
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
	}
    removeSpaces = function (str) {
        if (isDefined(str)) {
            str = str.replace(/\s+/g, '');
        return str;
        }
    }

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
    }

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
        requestURL += "limit=all&fields=all"
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
    }
     // store returned data and do math to sum up playlist totals
     processData = function (aapiData) {
        // check for items
        if (aapiData.item_count !== 0) {
            // add current data to totals
            analyticsData.individual_video_data.push(aapiData);
            analyticsData.average_engagement_score += aapiData.items[0].engagement_score;
            analyticsData.average_play_rate += aapiData.items[0].play_rate;
            analyticsData.average_video_engagement_1 += aapiData.items[0].video_engagement_1
            analyticsData.average_video_engagement_25 += aapiData.items[0].video_engagement_25;
            analyticsData.average_video_engagement_50 += aapiData.items[0].video_engagement_50;
            analyticsData.average_video_engagement_75 += aapiData.items[0].video_engagement_75;
            analyticsData.average_video_engagement_100 += aapiData.items[0].video_engagement_100
            analyticsData.total_video_impression += aapiData.items[0].video_impression;
            analyticsData.average_video_percent_viewed += aapiData.items[0].video_percent_viewed;
            analyticsData.total_video_seconds_viewed += aapiData.items[0].video_seconds_viewed;
            analyticsData.total_video_view += aapiData.items[0].video_view;
            if (analyticsRequestNumber === (totalVideos - 1)) {
                // all done; time to compute the averages
                gettingData = false;
                analyticsData.average_engagement_score      = analyticsData.average_engagement_score / totalVideos;
                analyticsData.average_play_rate             = analyticsData.average_play_rate / totalVideos;
                analyticsData.average_video_engagement_1    = analyticsData.average_video_engagement_1 / totalVideos;
                analyticsData.average_video_engagement_25   = analyticsData.average_video_engagement_25 / totalVideos;
                analyticsData.average_video_engagement_50   = analyticsData.average_video_engagement_50 / totalVideos;
                analyticsData.average_video_engagement_75   = analyticsData.average_video_engagement_75 / totalVideos;
                analyticsData.average_video_engagement_100  = analyticsData.average_video_engagement_100 / totalVideos;
                analyticsData.average_video_percent_viewed  = analyticsData.average_video_percent_viewed / totalVideos;
                $responseFrame.html(BCLSformatJSON.formatJSON(analyticsData));
                // next line just for this display - remove if reusing this code
                $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
            } else {
                // get the next data set
                analyticsRequestNumber++;
                currentVideoIndex++;
                gettingData = true;
                buildRequest();
            }
        } else {
            // get the next data set
            analyticsRequestNumber++;
            currentVideoIndex++;
            gettingData = true;
            buildRequest();
        }
    }
    // submit request
    getData = function () {
        var format = $format.val();
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
        })
    }
    
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

    // set event listeners
    $getTags.on("click", getTags);
    // set listener for form fields
    $requestInputs.on("change", function () {
        reset();
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
		onMAPIresponse2 : onMAPIresponse2,
        onTagsSelect : onTagsSelect
    }
})($, window, Pikaday);
