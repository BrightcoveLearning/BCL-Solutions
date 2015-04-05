var BCLS = (function ($, window, document, BCMAPI, Pikaday, Handlebars) {
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
        $mapitoken = $("#mapitoken"),
        $readApiLocation = $("#readApiLocation"),
        $tags = $("#tags"),
        $manualTags = $("#manualTags"),
        params = {},
        params2 = {},
        // aapi stuff
        $serviceURL = $("#serviceURL"),
        $accountID = $("#accountID"),
        $aapiToken = $("#token"),
        fromPicker,
        toPicker,
        to = document.getElementById("to"),
        from = document.getElementById("from"),
        $player = $("#player"),
        $request = $("#request"),
        $authorization = $("#authorization"),
        $client_id_display = $("#client_id_display"),
        $client_secret_display = $("#client_secret_display"),
        $aapiParams = $("#aapiParams"),
        $requestSubmitter = $("#requestSubmitter"),
        $getVideoIds = $("#getVideoIds"),
        $submitButton = $("#submitButton"),
        $required = $(".required"),
        $requestInputs = $(".aapi-request"),
        $responseFrame = $("#responseFrame"),
        $errorLog = $("#errorLog"),
        $this,
        requestTrimmed = false,
        tagButtonClicked = true,
        lastChar = "",
        requestURL = "",
        authorization = "",
        endDate = "",
        startDate = "",
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
        firstRun = true,
        mapiCalls = 0,
        tabTableString = "",
        videoTableString = "",
        errMsg = "",
        totalVideos = 0,
        selectCount = 0,
        rowCount = 1,
        gettingData = false,
        results,
        aapiCalls,
        aapiCallNumber = 0,
        numberOfAnalyticsCalls = 0,
        requestData = {},
        default_client_id = "4584b1f4-f2fe-479d-aa49-6148568fef50",
        default_client_secret = "gwk6d9gJ7oHwk7DMF3I6k4fxKn2n0qG3oIou0TPq4tATG24OrGPeJO7MUlyWgzFx2fANHU1kiBnwrM2gyntk7w",
        // functions
        reset,
        bclslog,
        onMAPIresponse,
        onMAPIresponse2,
        removeDuplicateElements,
        compareFields,
        processSelectedTags,
        saveSelectedTags,
        formatSelectedTags,
        addTagsToTable,
        appendSelectedTags,
        formatTagsString,
        prepAnalyticsRequest,
        parseData,
        processAnalyticsData,
        displayAnalyticsData,
        trimRequest,
        removeSpaces,
        buildRequest,
        isDefined,
        getData,
        getManualTags,
        deDupe;

    // utilities
    bclslog = function (context, message) {
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
    }; // allow array forEach method in older browsers
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn, scope) {
            var i, len = this.length;
            for (i = 0; i < len; ++i) {
                fn.call(scope || this, this[i], i, this);
            }
        };
    }
    // more robust test for strings "not defined"
    isDefined = function (v) {
        if (v !== "" && v !== null && v !== "undefined" && v !== undefined) {
            return true;
        }
        return false;

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
    };
    // call the Media API to get a list of tags for an account
    getTags = function () {
        if (tagButtonClicked && !firstRun) {
            appendSelectedTags();
            pageSelectedTagsArray = [];
        }
        $getVideoMsg.html("");
        // set up the Media API call
        if (firstRun) {
            BCMAPI.url = $readApiLocation.val();
            BCMAPI.token = $mapitoken.val();
            BCMAPI.callback = "BCLS.onMAPIresponse";
            params.page_size = page_size;
            params.get_item_count = true;
            params.video_fields = "tags";
            $tagSelector.html("<option>processing...</option>");
        } else {
            params.get_item_count = false;
        }
        // set new page number
        params.page_number = page_number;
        BCMAPI.search(params);
    };
    onMAPIresponse = function (jsonData) {
        bclslog("jsonData", jsonData);
        var i,
            iMax,
            template = Handlebars.compile(handleBarsTemplate);
        if (jsonData.error) {
            errMsg = "Error code: " + jsonData.code + "Error msg: " + jsonData.error;
            $tagSelector.html("<option>" + errMsg + "</option>");
            return;
        }
        // on first run, calculate total pages
        if (firstRun) {
            // turn off firstRun flag
            firstRun = false;
            mapiCalls = Math.ceil(jsonData.total_count / page_size);
            bclslog("total_count", jsonData.total_count);
            bclslog("mapiCalls", mapiCalls);
            // display the selector and get analytics button
            $tagSelectWrapper.attr("class", "bcls-shown");
            $getTags.html("Getting tags....please wait....");
        }

        // build an array of all tag array items for each video
        iMax = jsonData.items.length;
        for (i = 0; i < iMax; i++) {
            // use apply to add array of tags for each selected video item
            tagArray.push.apply(tagArray, jsonData.items[i].tags);
        }

        // remove spaces
        bclslog("orginal number of tags: ", tagArray.length);
        iMax = tagArray.length;
        for (i = 0; i < iMax; i++) {
            tagArray[i] = encodeURIComponent(tagArray[i]);
        }
        // remove duplicate values
        tagArray = removeDuplicateElements(tagArray);

        page_number++;
        // if tags found less than page size, get next page
        if (page_number < mapiCalls) {
            tagButtonClicked = false;
            getTags();
        } else {
            tagButtonClicked = true;
            tagArray.sort(compareFields);
            $getTags.html("No more tags");
            $getTags.attr("class", "bcls-hidden");
            $getTags.off("click", getTags);
            $tagSelectWrapper.attr("class", "bcls-shown");
            // inject the HTML for the video list
            results = template(tagArray);
            $tagSelector.html(results);
        }
    };
    removeDuplicateElements = function (arr) {
        var i,
            len = arr.length,
            out = [],
            obj = {};

        for (i = 0; i < len; i++) {
            obj[arr[i]] = 0;
        }
        for (i in obj) {
            out.push(i);
        }
        return out;
    };

    compareFields = function (a, b) {
        // function for sort array ascending
        var a1, b1;
        // set alphanumerics to lower case
        a1 = ((isNaN(a)) ? a.toLowerCase() : a);
        b1 = ((isNaN(b)) ? b.toLowerCase() : b);

        // sort ascending
        if (a1 < b1) {
            return -1;
        }
        if (a1 > b1) {
            return 1;
        }
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

    processSelectedTags = function () {
        saveSelectedTags();
        $getVideoMsg.html("");
        // undim param input fields
        $getVideoIds.attr("class", "run-button bcls-shown");
    };

    saveSelectedTags = function () {
        bclslog("function", "saveSelectedTags");
        $tagSelectedWrapper.attr("class", "bcls-shown");
        pageSelectedTagsArray = [];
        var i;
        for (i = 0; i < tagSelector.options.length; i++) {
            if (tagSelector.options[i].selected) {
                pageSelectedTagsArray.push(tagSelector.options[i].value);
            }
        }
        bclslog("pageSelectedTagsArray", pageSelectedTagsArray);

        formatSelectedTags();
    };

    formatSelectedTags = function () {
        bclslog("function", "formatSelectedTags");

        selectCount = 0;
        rowCount = 1;
        tabTableString = "<tr>";

        tabTableString = addTagsToTable(totalSelectedTagsArray, tabTableString);
        tabTableString = addTagsToTable(pageSelectedTagsArray, tabTableString);

        tabTableString += "</tr>";

        bclslog("row count= ", rowCount);
        bclslog(tabTableString);

        // inject the HTML for the video list
        $tagsSelectedTable.html(tabTableString);


        $numSelected.html(selectCount);
        $getVideoIds.removeClass("bcls-hidden").addClass("bcls-shown");
    };

    addTagsToTable = function (currentArray, tableString) {
        bclslog("function", "addTagsToTable");
        var i,
            iMax = currentArray.length;
        for (i = 0; i < iMax; i++) {
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
        bclslog("function", "appendSelectedTags");

        var i;
        for (i = 0; i < pageSelectedTagsArray.length; i++) {
            totalSelectedTagsArray.push(pageSelectedTagsArray[i]);
        }
    };

    formatTagsString = function () {
        bclslog("function", "formatTagsString");
        var i,
            iMax = totalSelectedTagsArray.length;
        for (i = 0; i < iMax; i++) {
            totalSelectedTagsArray[i] = "tag:" + totalSelectedTagsArray[i];
        }
    };

    // call the Media API to get all videoids for selected tag values
    getVideoIds = function () {
        bclslog("function", "getVideoIds");

        appendSelectedTags();
        formatTagsString();
        bclslog("totalSelectedTagsArray", totalSelectedTagsArray);

        if (totalSelectedTagsArray.length === 0) {
            bclslog("no tags: ", "please select a tag");
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
        bclslog("function", "getVideoIdsRequest");
        var searchType,
            i,
            length = radioButton.length;
        for (i = 0; i < length; i++) {
            if (radioButton[i].checked) {
                searchType = radioButton[i].value;
                bclslog("radioButton value", radioButton[i].value);
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

    onMAPIresponse2 = function (jsonData) {
        bclslog("function", "onMAPIresponse2");
        bclslog("BCMAPI.request", BCMAPI.request);
        bclslog("jsonData", jsonData);
        var i,
            iMax = jsonData.items.length;

        // build an array of all video ids with any of the selected tag values
        for (i = 0; i < iMax; i++) {
            videoIdArray.push(jsonData.items[i].id);
        }

        id_page_number++;
        // if more video id data, get next page
        if (jsonData.total_count > (id_page_size * id_page_number)) {
            getVideoIdsRequest();
        } else {
            formatVideoIds();
            totalSelectedTagsArray = [];
            totalVideos = videoIdArray.length;
            buildRequest();
            $videoIdWrapper.attr("class", "bcls-shown");
            $aapiParams.attr("class", "bcls-shown");
            $getVideoIds.html("finished getting video ids");
        }
    };

    formatVideoIds = function () {
        bclslog("function", "formatVideoIds");
        bclslog("videoIdArray", videoIdArray);

        rowCount = 1;
        videoTableString = "<tr>";

        videoTableString = addTagsToTable(videoIdArray, videoTableString);

        videoTableString += "</tr>";

        bclslog("row count= ", rowCount);
        bclslog("videoTableString", videoTableString);

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
    // display the analytics data
    displayAnalyticsData = function () {
        // calculate averages where necessary
        analyticsData.summary.engagement_score = analyticsData.summary.engagement_score / numberOfAnalyticsCalls;
        analyticsData.summary.video_percent_viewed = analyticsData.summary.video_percent_viewed / analyticsData.item_count;
        analyticsData.summary.play_rate = analyticsData.summary.play_rate / numberOfAnalyticsCalls;
        analyticsData.summary.video_engagement_1 = analyticsData.summary.video_engagement_1 / analyticsData.item_count;
        analyticsData.summary.video_engagement_25 = analyticsData.summary.video_engagement_25 / analyticsData.item_count;
        analyticsData.summary.video_engagement_50 = analyticsData.summary.video_engagement_50 / analyticsData.item_count;
        analyticsData.summary.video_engagement_75 = analyticsData.summary.video_engagement_75 / analyticsData.item_count;
        analyticsData.summary.video_engagement_100 = analyticsData.summary.video_engagement_100 / analyticsData.item_count;

        // display the data
        $responseFrame.html(JSON.stringify(analyticsData, null, "  "));
    };

    // process analytics data
    processAnalyticsData = function (jsonData) {
        bclslog("jsonData", jsonData);
        analyticsData.item_count += jsonData.item_count;
        analyticsData.items = analyticsData.items.concat(jsonData.items);
        analyticsData.summary.engagement_score += jsonData.summary.engagement_score;
        analyticsData.summary.video_engagement_1 += jsonData.summary.video_engagement_1;
        analyticsData.summary.bytes_delivered += jsonData.summary.bytes_delivered;
        analyticsData.summary.video_engagement_75 += jsonData.summary.video_engagement_75;
        analyticsData.summary.video_seconds_viewed += jsonData.summary.video_seconds_viewed;
        analyticsData.summary.video_engagement_25 += jsonData.summary.video_engagement_25;
        analyticsData.summary.video_percent_viewed += jsonData.summary.video_percent_viewed;
        analyticsData.summary.video_impression += jsonData.summary.video_impression;
        analyticsData.summary.video_view += jsonData.summary.video_view;
        analyticsData.summary.play_rate += jsonData.summary.play_rate;
        analyticsData.summary.video_engagement_50 += jsonData.summary.video_engagement_50;
        analyticsData.summary.video_engagement_100 += jsonData.summary.video_engagement_100;
        analyticsData.video = analyticsData.video.concat(jsonData.video);
        analyticsData.account = jsonData.account;
        // continue if there are more videos
        bclslog("numberOfAnalyticsCalls", numberOfAnalyticsCalls);
        bclslog("aapiCallNumber", aapiCallNumber);
        bclslog("aapiCalls", aapiCalls);
        if (numberOfAnalyticsCalls < aapiCalls) {
            aapiCallNumber++;
            buildRequest();
        } else {
            gettingData = false;
            displayAnalyticsData();
        }

    };

    prepAnalyticsRequest = function () {
        // calculate number of calls - no more than 150 per call
        aapiCalls = Math.ceil(videoIdArray.length / 150);
    };

    buildRequest = function () {
        bclslog("function", "buildRequest");
        var tmpArray;
        // check for required fields
        $required.each(function () {
            $this = $(this);
            if ($this.val === "") {
                window.alert("You must provide a service URL, account ID, and a token");
                // stop right here
                return;
            }
        });
        // set tmpArray for a slice of 150
        tmpArray = videoIdArray.slice(aapiCallNumber * 150, (aapiCallNumber * 150) + 149);
        // reset requestTrimmed to false in case of regenerate request
        requestTrimmed = false;
        // build the request
        requestURL = $serviceURL.val();
        requestURL += "/accounts/" + removeSpaces($accountID.val()) + "/";
        // report dimensions
        requestURL += "report/";
        requestURL += "?dimensions=video&";
        // add video filter

        requestURL += "where=video==" + tmpArray.join();
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

    // parse analytics api response, throw exception on failure
    parseData = function (data) {
        if (data.indexOf("{") > -1) {
            return JSON.parse(data);
        }
        throw "Could not get good data from the Analytics API - here's what was returned: " + data + "<br>We'll go ahead and display any data already received below";
    };

    // submit request
    getData = function () {
        var jsonData;
        bclslog("requestURL", requestURL);
        $responseFrame.html("Loading...");
        requestData.url = requestURL;
        requestData.client_id = (isDefined($client_id_display.val())) ? $client_id_display.val() : default_client_id;
        requestData.client_secret = (isDefined($client_secret_display.val())) ? $client_secret_display.val() : default_client_secret;
        requestData.aapi_token = (isDefined($aapiToken.val())) ? $aapiToken.val() : null;
        requestData.requestType = "GET";
        bclslog("requestData", requestData);
        $.ajax({
            url: "http://solutions.brightcove.com:8002",
            type: "POST",
            data: requestData,
            success: function (data) {
                numberOfAnalyticsCalls++;
                try {
                    jsonData = parseData(data);
                    processAnalyticsData(jsonData);
                } catch (e) {
                    // statements to handle any exceptions
                    $errorLog.html(e);
                    // go ahead and display any data we already got
                    displayAnalyticsData();
                }
                // $responseFrame.html(BCLSformatJSON.formatJSON(JSON.parse(data)));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, your request was not successful. Here is what the server sent back: " + errorThrown + "<br>We'll go ahead and display any data already received below");
                // go ahead and display any data we already got
                displayAnalyticsData();
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

    // initialize the anayticsData object
    analyticsData.item_count = 0;
    analyticsData.items = [];
    analyticsData.summary = {};
    analyticsData.summary.engagement_score = 0;
    analyticsData.summary.video_engagement_1 = 0;
    analyticsData.summary.bytes_delivered = 0;
    analyticsData.summary.video_engagement_75 = 0;
    analyticsData.summary.video_seconds_viewed = 0;
    analyticsData.summary.video_engagement_25 = 0;
    analyticsData.summary.video_percent_viewed = 0;
    analyticsData.summary.video_impression = 0;
    analyticsData.summary.video_view = 0;
    analyticsData.summary.play_rate = 0;
    analyticsData.summary.video_engagement_50 = 0;
    analyticsData.summary.video_engagement_100 = 0;
    analyticsData.video = [];
    analyticsData.account = "";

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
        bclslog("submit button", "clicked");
        $responseFrame.html("");
        numberOfAnalyticsCalls = 0;
        prepAnalyticsRequest();
        gettingData = true;
        buildRequest();
    });

    // generate initial request
    buildRequest();
    return {
        onMAPIresponse: onMAPIresponse,
        onMAPIresponse2: onMAPIresponse2
    };
})($, window, document, BCMAPI, Pikaday, Handlebars);