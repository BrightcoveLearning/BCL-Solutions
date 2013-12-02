var BCLS = (function ($, window, BCMAPI, Handlebars, BCLSformatJSON) {
    "use strict";
    var // media api stuff
        $getVideosButton = $("#getVideosButton"),
        $mapitoken = $("#mapitoken"),
        $readApiLocation = $("#readApiLocation"),
        videoData = {},
        analyticsData = {},
        pageNumber = 0,
        params = {},
        // aapi stuff
        $serviceURL = $("#serviceURL"),
        $accountID = $("#accountID"),
        $token = $("#token"),
        $limit = $("#limit"),
        $limitText = $("#limitText"),
        $offset = $("#offset"),
        $offsetText = $("#offsetText"),
        $request = $("#request"),
        $authorization = $("#authorization"),
        $authorizationDisplay = $("#authorizationDisplay"),
        $submitButton = $("#submitButton"),
        $csvButton = $("#csvButton"),
        $selectData = $("#selectData"),
        $required = $(".required"),
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
        i,
        len,
        // functions to be defined
        getVideos,
        getSelectedVideoAnalytics,
        getAllVideosAnalytics,
        onGetVideos,
        trimRequest,
        removeSpaces,
        buildRequest,
        isDefined,
        getData,
        setFieldsSortOptions,
        onDimesionError,
        jsonToCSV;
    // implement array forEach method in older browsers
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn, scope) {
            for (i = 0, len = this.length; i < len; ++i) {
                fn.call(scope || this, this[i], i, this);
            }
        };
    }

    // implement array indexOf method for older browsers
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var i,
                pivot = (fromIndex) ? fromIndex : 0,
                length;
            if (!this) {
                throw new TypeError();
            }
            length = this.length;
            if (length === 0 || pivot >= length) {
                return -1;
            }
            if (pivot < 0) {
                pivot = length - Math.abs(pivot);
            }
            for (i = pivot; i < length; i++) {
                if (this[i] === searchElement) {
                    return i;
                }
            }
            return -1;
        };
    }
    // more robust test for strings "not defined"
    isDefined =  function (v) {
        if (v !== "" && v !== null && v !== "undefined") {
            return true;
        } else { return false; }
    };
    // get videos via MAPI
    getVideos = function () {
        BCMAPI.url = $readApiLocation.val();
        BCMAPI.callback = "BCLS.onGetVideos";
        BCMAPI.token = $mapitoken.val();
        params.page_number = pageNumber;
        params.page_size = 100;
        params.sort_by = "PUBLISH_DATE:ASC";
        params.video_fields = "id,name,referenceId,publishedDate";
        params.get_item_count = true;
        BCMAPI.search(params);

    };
    // handler for MAPI call
    onGetVideos = function (JSONdata) {
        var template, result, i, itemsMax, item;
        videoData.items = videoData.items.concat(JSONdata.items);

        if (videoData.items.length < JSONdata.total_count) {
            pageNumber++;
            getVideos();
        } 
        $limitText.val(itemsMax);
        template = Handlebars.compile(videoOptionTemplate);
        result = template(videoData);
        $videoSelector.html(result);
        buildRequest();
        }

    };
    removeSpaces = function (str) {
        if (isDefined(str)) {
            str = str.replace(/\s+/g, "");
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
    // construct the request
    buildRequest = function () {
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
        requestURL += "/account/" + removeSpaces($accountID.val()) + "/report/?dimensions=video";
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
        // add fields
        requestURL += "fields=video,engagement_score,video_view,video_percent_viewed&";
        // strip trailing ? or & and replace &&s
        trimRequest();
        $request.html(requestURL);
        $authorizationDisplay.html(authorization);
        $request.attr("value", requestURL);
        $authorization.attr("value", authorization);
    };
    // submit request
    getData = function () {
        var i, itemsMax, item;
        // clear the results frame
        $responseFrame.html("Loading...");
        $.ajax({
            url: $request.attr("value"),
            headers: {
                Authorization : $authorization.attr("value")
            },
            success : function (data) {
                analyticsData = data;
                itemsMax = data.items.length;
                for (i = 0; i < itemsMax; i++) {
                    item = data.items[i];
                    if (isDefined(referenceIdLookup[item.video])) {
                        item.reference_id = referenceIdLookup[item.video];
                    } else {
                        item.reference_id = "";
                    }
                }
                $responseFrame.html(BCLSformatJSON.formatJSON(data));
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, your request was not successful. Here's what the server sent back: " + errorThrown);
            }
        });
    };
    // convert data to CSV
    jsonToCSV = function () {
        var headersRow = "", rowTemplate = "{{#items}}", property, template, results, str = "";
        $responseFrame.html("Loading CSV data...");
        for (property in analyticsData.items[0]) {
            headersRow += "\"" + property + "\",";
            rowTemplate += "\"{{" + property + "}}\",";
        }
        headersRow += " \r";
        rowTemplate += "\r{{/items}}";
        str = headersRow;
        template = Handlebars.compile(rowTemplate);
        results = template(analyticsData);
        str += results;
        $responseFrame.html(str);
    };
    // initialize videoData.items
    videoData.items = [];

    // set event listeners
    $mapitoken.on("change", function () {
        getVideos();
    });
    // listener for videos request
    $getVideosButton.on("click", getVideos);
    // set listener for form fields
    $requestInputs.on("change", buildRequest);
    // rebuild request when video selector changes
    $videoSelector.on("change", buildRequest);
    // send request
    $submitButton.on("click", getData);
    // convert to csv
    $csvButton.on("click", jsonToCSV);
    // select all the data
    $selectData.on("click", function() {
        document.getElementById("responseFrame").select();
    });
    // set the initial options for fields and sort
    setFieldsSortOptions();
    // generate initial request
    buildRequest();
    return {
        buildRequest: buildRequest,
        onGetVideos: onGetVideos
    };
})($, window, BCMAPI, Handlebars, BCLSformatJSON);