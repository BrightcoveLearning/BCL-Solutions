var BCLS = (function ($, window, Pikaday) {
    "use strict";
    var // media api stuff
        getTags,
		getVideoIds,
		getVideoIdsRequest,
        radioForm = document.getElementById("radioForm"),
        radioButton = radioForm.elements["searchType"],
		formatVideoIds,
        page_size = 100,
        page_number = 0,
		id_page_size = 100,
        id_page_number = 0,
		tagArray = [],
		pageSelectedTagsArray = [],
		totalSelectedTagsArray = [],
		videoIdArray = [],
        analyticsData = {},
        $playlistInfo = $("#playlistInfo"),
        $mapitoken = $("#mapitoken"),
        $readApiLocation = $("#readApiLocation"),
        params = {},
		params2 = {},
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
        $getVideoIds = $("#getVideoIds"),
		$submitButton = $("#submitButton"),
        $required = $(".required"),
        $format = $("#format"),
        $requestInputs = $(".aapi-request"),
        $directVideoInput = $("#directVideoInput"),
        $responseFrame = $("#responseFrame"),
        $this,
        separator = "",
        requestTrimmed = false,
		tagButtonClicked = true,
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
		$tagsSelectedTable = $("#tagsSelectedTable"),
		$videoIdTable = $("#videoIdTable"),
		$numSelected = $("#numSelected"),
		$getVideoMsg = $("#getVideoMsg"),
		$numVideoIds = $("#numVideoIds"),
        $analyticsData = $("#analyticsData"),
        videoIds = [],
        currentVideoIndex = 0,
        // functions
        reset,
        logit,
        firstRun = true,
        onMAPIresponse,
		onMAPIresponse2,
		removeDuplicateElements,
		results,
		compareFields,
		processSelectedTags,
		saveSelectedTags,
		formatSelectedTags,
		addTagsToTable,
		appendSelectedTags,
		formatTagsString,
		paramString = "",
		tabTableString = "",
		videoTableString = "",
		errMsg = "",
		prepAnalyticsRequest,
        addArrayItems,
        analyticsRequestNumber = 0,
        totalVideos = 0,
		selectCount = 0,
		rowCount = 1,
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
            console.log(context, message);
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
        if (v !== "" && v !== null && v !== "undefined" && or v !== undefined ) {
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
	    $getTags.html("Get Tags");
	    $getTags.attr("class", "run-button");
	    $getTags.on("click", getTags);
		$getVideoIds.attr("class", "bcls-hidden");
	    page_number = 0;
		tagButtonClicked = true;
		currentVideoIndex = 0;
    }
	// call the Media API to get a list of tags for an account
    getTags = function () {
        if((tagButtonClicked) && (!firstRun)) {
			appendSelectedTags();
			pageSelectedTagsArray = [];
		}
		// set up the Media API call
        BCMAPI.url = $readApiLocation.val();
        BCMAPI.token = $mapitoken.val();
        BCMAPI.callback = "BCLS.onMAPIresponse";
        params.page_size = page_size;
        params.page_number = page_number;
        params.get_item_count = true;
		params.video_fields = "tags";
		BCMAPI.search(params);
		$tagSelector.html("<option>processing...</option>");
    }
    onMAPIresponse = function(jsonData) {
		console.log(jsonData);

		if (jsonData.error) {
			errMsg = "Error code: " + jsonData.code + "Error msg: " + jsonData.error;
			$tagSelector.html("<option>" + errMsg + "</option>");
			return;
		}

        // merge the data into the html template using Handlebars
        var template = Handlebars.compile(handleBarsTemplate);

		// build an array of all tag array items for each video
		for (var i = 0; i < jsonData["items"].length; i++) {
			// use apply to add array of tags for each selected video item
			tagArray.push.apply(tagArray, jsonData["items"][i].tags);
		}

		// remove spaces
		console.log("orginal number of tags: " + tagArray.length);
		for (var i = 0; i < tagArray.length; i++) {
			tagArray[i] = removeSpaces(tagArray[i]);
		}
		// remove duplicate values
		tagArray = removeDuplicateElements(tagArray);

		page_number++;
		// if tags found less than page size, get next page
		if ((tagArray.length < page_size) && (jsonData.total_count > (page_size * page_number))){
			tagButtonClicked = false;
			getTags();
		} else {
			tagButtonClicked = true;
			tagArray.sort(compareFields);

			// inject the HTML for the video list
			results = template(tagArray);
			$tagSelector.html(results);
			tagArray = [];
		}

		// if first run change the button text
        if (firstRun) {
            // display the selector and get analytics button
            $tagSelectWrapper.attr("class", "bcls-shown");
            $getTags.html("Get next set of tags");
        }
        // check to see if there are more tags to fetch
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

	compareFields = function(a,b) {
		// function for sort array ascending
		var a1, b1;
		// set alphanumerics to lower case
		a1 = ( (isNaN(a)) ? a.toLowerCase() : a );
		b1 = ( (isNaN(b)) ? b.toLowerCase() : b );

		// sort ascending
		if (a1 < b1) return -1;
		if (a1 > b1) return 1;
		return 0;
	}

	processSelectedTags = function() {
		saveSelectedTags();
		// undim param input fields
		$getVideoIds.attr("class", "run-button bcls-shown");
	}

	saveSelectedTags = function () {
        console.log("saveSelectedTags");

		pageSelectedTagsArray = [];
		var i;
		for (i=0; i<tagSelector.options.length; i++) {
	        if (tagSelector.options[i].selected) {
				pageSelectedTagsArray.push(tagSelector.options[i].value);
			}
		}
		//console.log(pageSelectedTagsArray);

		formatSelectedTags();
    }

	formatSelectedTags = function () {
        console.log("formatSelectedTags");

		selectCount = 0;
		rowCount = 1;
		tabTableString = "<tr>";

		tabTableString = addTagsToTable(totalSelectedTagsArray,tabTableString);
		tabTableString = addTagsToTable(pageSelectedTagsArray,tabTableString);

		tabTableString += "</tr>";

		console.log("row count= " + rowCount);
		console.log(tabTableString);

		// inject the HTML for the video list
		$tagsSelectedTable.html(tabTableString);

		$numSelected.html(selectCount);
    }

	addTagsToTable = function (currentArray,tableString) {
        console.log("addTagsToTable");
		var i;
		for (i=0; i<currentArray.length; i++) {
			if (rowCount > 5) {
				tableString += "</tr><tr>";
				rowCount = 1;
			}
			tableString += "<td>" + currentArray[i] + "</td>";
			rowCount++;
			selectCount++;
		}
		return tableString;
    }

	appendSelectedTags = function () {
        console.log("appendSelectedTags");

		var i;
		for (i=0; i<pageSelectedTagsArray.length; i++) {
			totalSelectedTagsArray.push(pageSelectedTagsArray[i]);
		}
		//console.log(totalSelectedTagsArray);
    }

	formatTagsString = function () {
        console.log("formatTagsString");
		var i;
		//selectCount = 0;
		for (i=0; i<totalSelectedTagsArray.length; i++) {
			paramString += "," + "tag:" + totalSelectedTagsArray[i];
			//selectCount++;
		}
		paramString = paramString.substring(1);
    }

	// call the Media API to get all videoids for selected tag values
    getVideoIds = function () {
        console.log("getVideoIds");

		appendSelectedTags();
		paramString = "";
		formatTagsString();
		console.log(paramString);

		if (!paramString) {
			console.log("please select a tag");
			$getVideoMsg.html("Please select one or more tag values.");
		} else {
			$getVideoMsg.html("");

			id_page_number = 0;
			videoIdArray = [];
			getVideoIdsRequest();
		}
		console.log(paramString);
    }

	getVideoIdsRequest = function () {
        console.log("getVideoIdsRequest");

		// set up the Media API call
		BCMAPI.callback = "BCLS.onMAPIresponse2";
		params2.page_size = id_page_size;
        params2.page_number = id_page_number;
		params2.get_item_count = true;
		params2.video_fields = "id";
		params2.any = paramString;
		BCMAPI.search(params2);
    }

	onMAPIresponse2 = function(jsonData) {
		console.log("onMAPIresponse2");
		console.log(BCMAPI.request);
		console.log(jsonData);

		// build an array of all video ids with any of the selected tag values
		for (var i = 0; i < jsonData["items"].length; i++) {
			videoIdArray.push(jsonData["items"][i].id);
		}

		id_page_number++;
		// if more video id data, get next page
		if (jsonData.total_count > (id_page_size * id_page_number)){
			getVideoIdsRequest();
		} else {
			formatVideoIds();
			totalSelectedTagsArray = [];
			totalVideos = videoIdArray.length;
			prepAnalyticsRequest();
			currentVideoIndex = 0;
			buildRequest();
		}
    }

	formatVideoIds = function () {
        console.log("formatVideoIds");
		console.log(videoIdArray);

		rowCount = 1;
		videoTableString = "<tr>";

		videoTableString = addTagsToTable(videoIdArray,videoTableString);

		videoTableString += "</tr>";

		console.log("row count= " + rowCount);
		console.log(videoTableString);

		// inject the HTML for the video list
		$videoIdTable.html(videoTableString);

		$numVideoIds.html(videoIdArray.length);
    }

	prepAnalyticsRequest = function () {
		// initialize video info in analyticsData
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
		currentVideoIndex = 0;
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
		console.log("buildRequest");
		// check for required fields
        $required.each(function () {
            $this = $(this);
            if ($this.val === "") {
                window.alert("You must provide a service URL, account ID, and a token");
                // stop right here
                return;
            }
        });
//		if (currentVideoIndex > totalVideos - 1) {
//			return;
//		}
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
		console.log("current video index: " + currentVideoIndex);
		console.log(videoIdArray[currentVideoIndex]);
		requestURL += "where=video==" + videoIdArray[currentVideoIndex];
        // check for player filter
        if ($player.val() !== "") {
            requestURL += ";player==" + $player.val() + "&";
        } else {
            requestURL += "&";
        }
        // check for time filters
        startDate = from.value;
        if (startDate !== "") {
            requestURL += "from=" + startDate + "&";
        }
		endDate = to.value;
        if (endDate !== "") {
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

	// submit request
    getData = function () {
		console.log("getData");
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
     // store returned data and do math to sum up playlist totals
     processData = function (aapiData) {
		 console.log("processData");
		 console.log(aapiData);
		 console.log("aapiData.item_count= " + aapiData.item_count);
		 console.log("currentVideoIndex= " + currentVideoIndex);
		 console.log("totalVideos= " + totalVideos);

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
				console.log("all done compute averages");
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
				console.log("get next data set 1");
                analyticsRequestNumber++;
                currentVideoIndex++;
                gettingData = true;
                buildRequest();
            }
        } else {
            // get the next data set
			console.log("get next data set 2");
			if ((totalVideos == 0) || (currentVideoIndex > totalVideos - 1)) {
				// stop looping
			} else {
				analyticsRequestNumber++;
				currentVideoIndex++;
				gettingData = true;
				buildRequest();
			}
        }
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
	$tagSelector.on("change", function () {
		processSelectedTags();
    });
    $requestInputs.on("change", function () {
        reset();
        buildRequest();
    });

    // build request
    $getVideoIds.on("click", function () {
		$aapiParams.attr("class", "bcls-shown");
        $requestSubmitter.attr("class", "bcls-shown");
        // get video Ids associated with selected tag values
		getVideoIds();
    });
	// send request
    $submitButton.on("click", function () {
        console.log("submit button-----------------");
		$responseFrame.html("");
		currentVideoIndex = 0;
		prepAnalyticsRequest();
        buildRequest();
		getData();
    });

    // generate initial request
    buildRequest();
    return {
        onMAPIresponse : onMAPIresponse,
		onMAPIresponse2 : onMAPIresponse2,
    }
})($, window, Pikaday);
