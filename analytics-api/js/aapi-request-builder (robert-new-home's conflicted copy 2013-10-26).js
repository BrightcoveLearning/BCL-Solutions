var BCLS = (function ($, window, AnyTime) {
    "use strict";
    var // media api stuff
        $pageSize = $("#pageSize"),
        $searchType = $("#searchType"),
        $searchTerms = $("#searchTerms"),
        $sortBy = $("#sortBy"),
        pageNumber = 0,
        totalPages = 0,
        $getVideosButton = $("#getVideosButton"),
        $videoSelector = $("#videoSelector"),
        $sortOrder = $("#sortOrder"),
        $mapitoken = $("#mapitoken"),
        $readApiLocation = $("#readApiLocation"),
        videoData,
        totalVideos = 0,
        params = {},
        videoOptionTemplate = "{{#items}}<option value=\"{{id}}\">{{name}}</option>{{/items}}",
        // aapi stuff
        $serviceURL = $("#serviceURL"),
        $accountID = $("#accountID"),
        $token = $("#token"),
        $requestType = $("#requestType"),
        $dimension = $("#dimension"),
        $startDate = $("#startDate"),
        $startTime = $("#startTime"),
        $endDate = $("#endDate"),
        $endTime = $("#endTime"),
        $whereInputs = $(".where-input"),
        $player = $("#player"),
        $video = $("#video"),
        $referrer_domain = $("#referrer_domain"),
        $source_type = $("#source_type"),
        $search_terms = $("#search_terms"),
        $limit = $("#limit"),
        $limitText = $("#limitText"),
        $offset = $("#offset"),
        $offsetText = $("#offsetText"),
        $sort = $("#sort"),
        $requestButton = $("#requestButton"),
        $request = $("#request"),
        $authorization = $("#authorization"),
        $authorizationDisplay = $("#authorizationDisplay"),
        $requestForm = $("#requestForm"),
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
        where = false,
        requestURL = "",
        authorization = "",
        endDate = "",
        startDate = "",
        rollupDimensionOptions = "<option value=\"account\">account</option>",
        reportDimensionOptions = "<option value=\"player\">player</option><option value=\"video\">video</option><option value=\"referrer_domain\">referrer_domain</option><option value=\"source_type\">source_type</option><option value=\"search_terms\">search_terms</option><option value=\"device_type\">device_type</option><option value=\"device_os\">device_os</option>",
        rollupFormatOptions = "<option value=\"json\" selected=\"selected\">json</option>",
        reportFormatOptions = "<option value=\"json\" selected=\"selected\">json</option><option value=\"csv\">csv</option><option value=\"xlsx\">xlsx</option>",
        getVideos,
        onGetVideos,
        trimRequest,
        removeSpaces,
        buildRequest,
        isDefined,
        getData;

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
        if(v !== "" && v !== null && v !== "undefined") { return true; }
        else { return false; }
    }
    getVideos = function () {
        var searchTerms = $searchTerms.val(),
            searchTermsArray = searchTerms.split(","),
            searchType = $searchType.val();
        // hide the direct video input
        $directVideoInput.hide();
        BCMAPI.url = $readApiLocation.val();
        BCMAPI.callback = "BCLS.onGetVideos";
        BCMAPI.token = $mapitoken.val();
        params.page_number = pageNumber;
        params.page_size = $pageSize.val();
        params.sort_by = $sortBy.val() + ":" + $sortOrder.val();
        params.video_fields = "id,name";
        params.get_item_count = true;
        if (searchTerms !== "") {
            if (searchType !== "") {
                searchTermsArray.forEach(function (element, index, array) {
                    element = searchType + ":" + element;
                });
            }
            params.any = searchTerms;
        }
        BCMAPI.search(params);
        pageNumber++;
    }
    onGetVideos = function(JSONdata) {
        var template, data, result;
        videoData = JSONdata;
        totalVideos += JSONdata.total_count;
        totalPages = Math.ceil(JSONdata.total_count / $pageSize.val());
        if (totalPages === pageNumber) {
            $getVideosButton.html("No more videos");
            $getVideosButton.off("click", this.getVideos);
        } else {
            $getVideosButton.html("Get the next " + $pageSize.val() + " videos");
        }
        template = Handlebars.compile(videoOptionTemplate);
        data = JSONdata;
        result = template(data);
        $videoSelector.html(result);
        buildRequest();
    };
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
        // reset where to false in case this is a new request
        where = false;
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
        // is it a report?
        if ($requestType.val() === "report") {
            // make sure dimensions is defined
            if (!isDefined($dimension.val())) {
                alert("For reports, you must select at least one dimension");
                return;
            }
            requestURL += "report/";
            requestURL += "?dimensions=" + $dimension.val() + "&";
        } else {
            requestURL += "?";
        }
        // check for time filters
        startDate = $startDate.val() + " " + $startTime.val();
        if (startDate !== " ") {
            startDate = new Date(startDate).getTime();
            requestURL += "from=" + startDate + "&";
        }
        endDate = $endDate.val() + " " + $endTime.val();
        if (endDate !== " ") {
            endDate = new Date(endDate).getTime();
            requestURL += "to=" + endDate + "&";
        }
        // check for where filters
        $whereInputs.each(function () {
            var dimension;
            $this = $(this);
            dimension = $this.attr("id");
            if (dimension === "videoSelector") {
                dimension = "video";
            }
            if (isDefined($this.val())) {
                if (!where) {
                    requestURL += "where=";
                    where = true;
                }
                requestURL += dimension + "==" + removeSpaces($this.val()) + ";";
            }
        });
        // end the where filters
        requestURL += "&";
        // check for limit and offset
        if ($limitText.val() !== "") {
            requestURL += "limit=" + removeSpaces($limitText.val()) + "&";
        } else if ($limit.val() !== "") {
            requestURL += "limit=" + $limit.val() + "&";
        }
        if ($offsetText.val() !== "") {
            requestURL += "offset=" + removeSpaces($offsetText.val()) + "&";
        } else if ($offset.val() !== "") {
            requestURL += "offset=" + $offset.val() + "&";
        }
        // check for sorting
        if ($sort.val() !== "") {
            requestURL += "sort=" + $sort.val() + "&";
        }
        // get output format
        requestURL += separator + "format=" + $format.val();
        // strip trailing ? or & and replace &&s
        trimRequest();
        $request.html(requestURL);
        $authorizationDisplay.html(authorization);
        $request.attr("value", requestURL);
        $authorization.attr("value", authorization);
    }
    // submit request
    getData = function () {
        var format = $format.val();
        $.ajax({
            url: $request.attr("value"),
            headers: {
                Authorization : $authorization.attr("value")
            },
            success : function(data) {
                switch (format) {
                    case "json":
                        $responseFrame.html(BCLSformatJSON.formatJSON(data));
                        break;
                // else check for CSV
                    case "csv":
                        $responseFrame.html(data);
                        break;
                // must be XLSX
                    case "xlsx":
                        $responseFrame.html("The result is an xlsx binary file and cannot be displayed");

                }
            }
        })
    }
    // set up the anytime date/time pickers
    AnyTime.picker("startDate", {
        format: "%a %M %d %Y"
    });
    AnyTime.picker("startTime", {
        format: "%H:%i:%s %@",
        labelTitle: "Time",
        labelHour: "Hour",
        labelMinute: "Minute"
    });
    AnyTime.picker("endDate", {
        format: "%a %M %d %Y"
    });
    AnyTime.picker("endTime", {
        format: "%H:%i:%s %@",
        labelTitle: "Time",
        labelHour: "Hour",
        labelMinute: "Minute"
    });

    // set event listeners
    $requestType.on("change", function (evt) {
        if ($requestType.val() === "rollup") {
            $dimension.html(rollupDimensionOptions);
            $format.html(rollupFormatOptions);
        } else if ($requestType.val() === "report") {
            $dimension.html(reportDimensionOptions);
            $format.html(reportFormatOptions);
        }
    });
    // if we get a mapi token , hide direct input of video id
    $mapitoken.on("change", function () {
        $directVideoInput.hide();
    });
    // listener for videos request
    $getVideosButton.on("click", getVideos);
    // set listener for form fields
    $requestInputs.on("change", buildRequest);
    // rebuild request when video selector changes
    $videoSelector.on("change", buildRequest);
    // in case search terms added after initial video retrieval
    $searchTerms.on("change", function () {
        // re-initialize
        pageNumber = 0;
        totalPages = 0;
    });
    // send request
    $submitButton.on("click", getData);

    // generate initial request
    buildRequest();
    return {
        buildRequest: buildRequest,
        onGetVideos: onGetVideos
    }
})($, window, AnyTime);