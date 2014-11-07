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
        $tags = $("#tags"),
        $manualEntry = $("#manualEntry"),
        $manualTags = $("#manualTags"),
        params = {},
		params2 = {},
        videoOptionTemplate = "{{#items}}<option value=\"{{id}}\">{{name}}</option>{{/items}}",
        // aapi stuff
        $serviceURL = $("#serviceURL"),
        $accountID = $("#accountID"),
        $aapiToken = $("#token"),
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
        $tagSelectedWrapper = $("#tagSelectedWrapper"),
        $tagSelector = $("#tagSelector"),
        tagSelector = document.getElementById("tagSelector"),
		$tagsSelectedTable = $("#tagsSelectedTable"),
        $videoIdWrapper = $("#videoIdWrapper"),
		$videoIdTable = $("#videoIdTable"),
		$numSelected = $("#numSelected"),
		$getVideoMsg = $("#getVideoMsg"),
		$numVideoIds = $("#numVideoIds"),
        $analyticsData = $("#analyticsData"),
        videoIds = [],
        currentVideoIndex = 0,
        firstRun = true,
		paramString = "",
		tabTableString = "",
		videoTableString = "",
		errMsg = "",
        analyticsRequestNumber = 0,
        totalVideos = 0,
		selectCount = 0,
		rowCount = 1,
        gettingData = false,
        // functions
        reset,
        logit,
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
        prepAnalyticsRequest,
        addArrayItems,
        trimRequest,
        removeSpaces,
        buildRequest,
        isDefined,
        getData,
        getManualTags,
        deDupe,

    // utilities
    logit = function (context, message) {
        if (console) {
            console.log(context, message);
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
    };    // allow array forEach method in older browsers
    if ( !Array.prototype.forEach ) {
        Array.prototype.forEach = function(fn, scope) {
            for (var i = 0, len = this.length; i < len; ++i) {
                fn.call(scope || this, this[i], i, this);
            }
        };
    }
    // more robust test for strings "not defined"
    isDefined =  function (v) {
        if (v !== "" && v !== null && v !== "undefined" && v !== undefined ) {
            return true;
        }
        else {
            return false;
        }
    };
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
    };
	// call the Media API to get a list of tags for an account
    getTags = function () {
        if((tagButtonClicked) && (!firstRun)) {
			appendSelectedTags();
			pageSelectedTagsArray = [];
		}
		$getVideoMsg.html("");
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
    };
    onMAPIresponse = function(jsonData) {
		logit("jsonData", jsonData);
        var i,
            iMax;
		if (jsonData.error) {
			errMsg = "Error code: " + jsonData.code + "Error msg: " + jsonData.error;
			$tagSelector.html("<option>" + errMsg + "</option>");
			return;
		}

        // merge the data into the html template using Handlebars
        var template = Handlebars.compile(handleBarsTemplate);

		// build an array of all tag array items for each video
		iMax = jsonData.items.length;
        for (i = 0; i < iMax; i++) {
			// use apply to add array of tags for each selected video item
			tagArray.push.apply(tagArray, jsonData.items[i].tags);
		}

		// remove spaces
		logit("orginal number of tags: ", tagArray.length);
		iMax = tagArray.length;
        for (i = 0; i < iMax; i++) {
			tagArray[i] = encodeURIComponent(tagArray[i]);
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
			$getTags.html("Get Next Set of Tags");
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
            $getTags.html("Getting tags....please wait....");
        }
        // check to see if there are more tags to fetch
        if (jsonData.total_count <= (page_size * page_number)) {
            $getTags.html("No more tags");
            $getTags.attr("class", "bcls-hidden");
            $getTags.off("click", getTags);
            $tagSelectWrapper.attr("class", "bcls-shown");
        }
        // turn off firstRun flag
        firstRun = false;
    };
	removeDuplicateElements = function (arrayName) {
		var newArray = [];
		label: for (var i = 0; i < arrayName.length; i++) {
			for (var j = 0; j < newArray.length; j++) {
				if (newArray[j] == arrayName[i])
					continue label;
			}
			newArray[newArray.length] = arrayName[i];
		}
		return newArray;
	};

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
	};

    getManualTags = function () {
        var tagString = $tags.val();
        $getTags.off("click", getTags);
        $getTags.attr("class", "bcls-hidden");
        pageSelectedTagsArray = tagString.split(",");
        $tagSelectedWrapper.attr("class", "bcls-shown");
        $getVideoIds.attr("class", "run-button bcls-shown");
        formatSelectedTags();
    };

	processSelectedTags = function() {
		saveSelectedTags();
		$getVideoMsg.html("");
		// undim param input fields
		$getVideoIds.attr("class", "run-button bcls-shown");
	};

	saveSelectedTags = function () {
        logit("function", "saveSelectedTags");
        $tagSelectedWrapper.attr("class", "bcls-shown");
		pageSelectedTagsArray = [];
		var i;
		for (i = 0; i < tagSelector.options.length; i++) {
	        if (tagSelector.options[i].selected) {
				pageSelectedTagsArray.push(tagSelector.options[i].value);
			}
		}
		logit("pageSelectedTagsArray", pageSelectedTagsArray);

		formatSelectedTags();
    };

	formatSelectedTags = function () {
        logit("function","formatSelectedTags");

		selectCount = 0;
		rowCount = 1;
		tabTableString = "<tr>";

		tabTableString = addTagsToTable(totalSelectedTagsArray,tabTableString);
		tabTableString = addTagsToTable(pageSelectedTagsArray,tabTableString);

		tabTableString += "</tr>";

		logit("row count= ", rowCount);
		logit(tabTableString);

		// inject the HTML for the video list
		$tagsSelectedTable.html(tabTableString);


		$numSelected.html(selectCount);
        $getVideoIds.removeClass("bcls-hidden").addClass("bcls-shown");
    };

	addTagsToTable = function (currentArray, tableString) {
        logit("function", "addTagsToTable");
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
    };

	appendSelectedTags = function () {
        logit("function", "appendSelectedTags");

		var i;
		for (i = 0; i < pageSelectedTagsArray.length; i++) {
			totalSelectedTagsArray.push(pageSelectedTagsArray[i]);
		}
    };

	formatTagsString = function () {
        logit("function", "formatTagsString");
		var i,
            iMax = totalSelectedTagsArray.length;
		for (i = 0; i < iMax; i++) {
			totalSelectedTagsArray[i] = "tag:" + totalSelectedTagsArray[i];
		}
    };

	// call the Media API to get all videoids for selected tag values
    getVideoIds = function () {
        logit("function", "getVideoIds");

		appendSelectedTags();
		formatTagsString();
		logit("totalSelectedTagsArray", totalSelectedTagsArray);

		if (totalSelectedTagsArray.length === 0) {
			logit("no tags: ", "please select a tag");
			$getVideoMsg.html("Please select one or more tag values.");
		} else {
			$getVideoMsg.html("");
			$aapiParams.attr("class", "bcls-shown");
        	$requestSubmitter.attr("class", "bcls-shown");

			id_page_number = 0;
			videoIdArray = [];
			getVideoIdsRequest();
		}
    };

	getVideoIdsRequest = function () {
        logit("function", "getVideoIdsRequest");
        var searchType;
		for (var i = 0, length = radioButton.length; i < length; i++){
			if (radioButton[i].checked) {
				searchType = radioButton[i].value;
				logit("radioButton value", radioButton[i].value);
			}
		}

		// set up the Media API call
        BCMAPI.url = $readApiLocation.val();
        BCMAPI.token = $mapitoken.val();
		BCMAPI.callback = "BCLS.onMAPIresponse2";
		params2 = {};
		params2.page_size = id_page_size;
        params2.page_number = id_page_number;
		params2.get_item_count = true;
		params2.video_fields = "id";
		params2[searchType] = totalSelectedTagsArray;
		BCMAPI.search(params2);
    };

	onMAPIresponse2 = function(jsonData) {
		logit("function", "onMAPIresponse2");
		logit("BCMAPI.request", BCMAPI.request);
		logit("jsonData", jsonData);
        var i,
            iMax = jsonData.items.length;

		// build an array of all video ids with any of the selected tag values
		for (i = 0; i < iMax; i++) {
			videoIdArray.push(jsonData.items[i].id);
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
            $videoIdWrapper.attr("class", "bcls-shown");
            $aapiParams.attr("class", "bcls-shown");
            $getVideoIds.html("finished getting video ids");
		}
    };

	formatVideoIds = function () {
        logit("function", "formatVideoIds");
		logit("videoIdArray", videoIdArray);

		rowCount = 1;
		videoTableString = "<tr>";

		videoTableString = addTagsToTable(videoIdArray,videoTableString);

		videoTableString += "</tr>";

		logit("row count= ", rowCount);
		logit("videoTableString", videoTableString);

		// inject the HTML for the video list
		$videoIdTable.html(videoTableString);

		$numVideoIds.html(videoIdArray.length);
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
		logit("function", "buildRequest");
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
        requestURL = $serviceURL.val();
        requestURL += "/accounts/" + removeSpaces($accountID.val()) + "/";
        // report dimensions
        requestURL += "report/";
        requestURL += "?dimensions=video&";
        // add video filter
		logit("current video index: ", currentVideoIndex);
		logit("current video: ", videoIdArray[currentVideoIndex]);
		requestURL += "where=video==" + videoIdArray.join();
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
        requestURL += "limit=all&fields=all";
        // strip trailing ? or & and replace &&s
        trimRequest();
        $request.html(requestURL);
        $request.attr("value", requestURL);
        $authorization.attr("value", authorization);
        // if getting data initiated, get data
        if (gettingData) {
            getData();
        }
    };

	// submit request
    getData = function () {
        logit("requestURL", requestURL);
        $responseFrame.html("Loading...");
        requestData.url = requestURL;
        requestData.client_id = (isDefined($client_id_display.val())) ? $client_id_display.val() : default_client_id;
        requestData.client_secret = (isDefined($client_secret_display.val())) ? $client_secret_display.val() : default_client_secret;
        requestData.aapi_token = (isDefined($aapi_token.val())) ? $aapi_token.val() : null;
        requestData.requestType = "GET";
        logit("requestData", requestData);
        $.ajax({
            url: "http://solutions.brightcove.com:8002",
            type: "POST",
            data: requestData,
            success : function(data) {
                $responseFrame.html(BCLSformatJSON.formatJSON(JSON.parse(data)));
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, your request was not successful. Here is what the server sent back: " + errorThrown);
            }
        });
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
    // listener for manual tag entry
    $manualTags.on("click", getManualTags);
    // build request
    $getVideoIds.on("click", function () {
        // get video Ids associated with selected tag values
        $getVideoIds.attr("class", "bcls-hidden");
        $getVideoIds.html("Getting video ids...please wait");
		getVideoIds();
    });
	// send request
    $submitButton.on("click", function () {
        logit("submit button", "clicked");
		$responseFrame.html("");
		analyticsRequestNumber = 0;
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
    };
})($, window, Pikaday);
