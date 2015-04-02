var BCLS = (function ($, window, AnyTime, BCMAPI, Handlebars, BCLSformatJSON) {
    "use strict";
    var // aapi stuff
        $serviceURL = $("#serviceURL"),
        $accountID = $("#accountID"),
        $client_id = $("#client_id"),
        $client_secret = $("#client_secret"),
        $requestType = $("#requestType"),
        $dimension = $("#dimension"),
        $startDate = $("#startDate"),
        $startTime = $("#startTime"),
        $endDate = $("#endDate"),
        $endTime = $("#endTime"),
        $whereInputs = $(".where-input"),
        $reference_id = $("#reference_id")
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
        where = false,
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
        if (v !== "" && v !== null && v !== "undefined" && v !== undefined) {
            return true;
        } else { return false; }
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
        var selectedFields = $fields.val();
        // reset where to false in case this is a new request
        where = false;
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
        // build the request
        requestURL = $serviceURL.val();
        requestURL += "/data?accounts=" + removeSpaces($accountID.val()) + "dimensions=video";
        // check for time filters
        startDate = $startDate.val() + " " + $startTime.val();
        if (startDate !== " ") {
            startDate = new Date(startDate).getTime();
            requestURL += "&from=" + startDate ;
        }
        endDate = $endDate.val() + " " + $endTime.val();
        if (endDate !== " ") {
            endDate = new Date(endDate).getTime();
            requestURL += "&to=" + endDate;
        }
        // add fields and limit
        requestURL += "&limit=all&fields=engagement_score,play_rate,video,video_duration,video_engagement_1,video_engagement_100,video_engagement_25,video_engagement_50,video_engagement_75,video_impression,video_name,video_percent_viewed,video_seconds_viewed,video_view,video.reference_id";
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
        // check for fields
        if (selectedFields !== null) {
            requestURL += "fields=" + selectedFields.join(",") + "&";
        }
        // check for sorting
        if ($sort.val() !== "") {
            requestURL += "sort=" + $sort.val() + "&";
        }
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
    // error handler for invalid dimension combination
    onDimesionError = function (dimensions) {
        window.alert("The combination of dimensions you selected - " +  dimensions.join(" ,") +  " - is not a valid combination. Please select a different combination. See the Analytics API Overview for a table of allowable combinations.");
    };
    // set the options for the fields and sort
    setFieldsSortOptions = function () {
        var vals = $dimension.val(),
            account = false,
            day = false,
            player = false,
            // all reports will include the video dimension
            video = true,
            referrer_domain = false,
            source_type = false,
            search_terms = false,
            device_type = false,
            device_os = false;
        // check for nothing selected Fields -- then it's just the video dimension
        if (vals === null) {
			$fields.html(accountVideoFields);
			$sort.html("<option value=\"\">Select a field</option> " + accountVideoFields);
			return;
		}

        // determine what values are in the array
        if ($.inArray("account", vals) > -1) {
            account = true;
        }
        if ($.inArray("player", vals) > -1) {
            player = true;
        }
        if ($.inArray("referrer_domain", vals) > -1) {
            referrer_domain = true;
        }
        if ($.inArray("source_type", vals) > -1) {
            source_type = true;
        }
        if ($.inArray("search_terms", vals) > -1) {
            search_terms = true;
        }
        if ($.inArray("device_type", vals) > -1) {
            device_type = true;
        }
        if ($.inArray("device_os", vals) > -1) {
            device_os = true;
        }
        // on invalid combinations, throw error
        if (day && (account || player || video || referrer_domain || source_type || search_terms || device_type || device_os)) {
            onDimesionError(vals);
            return;
        } else if ((device_type || device_os) &&  (account || player || video) && (referrer_domain || source_type || search_terms)) {
            onDimesionError(vals);
            return;
        }
        // now check for combinations
        // day reports -- doesn't combine with any other dimension
        if (account) { // account combinations
            if (player) {
                if (video) {
                    $fields.html(accountPlayerVideoFields);
                    $sort.html(accountPlayerVideoFields);
                }
            } else if (video) {
                if (referrer_domain) {
                    if (source_type) {
                        if (search_terms) {
                            $fields.html(accountVideoReferrer_domainSource_typeSearch_termsFields);
                            $sort.html(accountVideoReferrer_domainSource_typeSearch_termsFields);
                        } else {
                            $fields.html(accountVideoReferrer_domainSource_typeFields);
                            $sort.html(accountVideoReferrer_domainSource_typeFields);
                        }
                    } else if (search_terms) {
                        $fields.html(accountVideoReferrer_domainSearch_termsFields);
                        $sort.html(accountVideoReferrer_domainSearch_termsFields);
                    } else {
                        $fields.html(accountVideoReferrer_domainFields);
                        $sort.html(accountVideoReferrer_domainFields);
                    }
                } else if (source_type) {
                    if (search_terms) {
                        $fields.html(accountVideoSource_typeSearch_termsFields);
                        $sort.html(accountVideoSource_typeSearch_termsFields);
                    } else {
                        $fields.html(accountVideoSource_typeFields);
                        $sort.html(accountVideoSource_typeFields);
                    }
                } else if (search_terms) {
                    $fields.html(accountVideoSearch_termsFields);
                    $sort.html(accountVideoSearch_termsFields);
                } else {
                    $fields.html(accountVideoFields);
                    $sort.html(accountVideoFields);
                }
            }
        } else if (player) { // player combinations
            if (video) {
                $fields.html(playerVideoFields);
                $sort.html(playerVideoFields);
            }
        } else if (video) { // video combinations
            if (referrer_domain) {
                if (source_type) {
                    if (search_terms) {
                        $fields.html(videoReferrer_domainSource_typeSearch_termsFields);
                        $sort.html(videoReferrer_domainSource_typeSearch_termsFields);
                    } else {
                        $fields.html(videoReferrer_domainSource_typeFields);
                        $sort.html(videoReferrer_domainSource_typeFields);
                    }
                } else if (search_terms) {
                    $fields.html(videoReferrer_domainSearch_termsFields);
                    $sort.html(videoReferrer_domainSearch_termsFields);
                }
            } else if (source_type) {
                if (search_terms) {
                    $fields.html(videoSource_typeSearch_termsFields);
                    $sort.html(videoSource_typeSearch_termsFields);
                } else {
                    $fields.html(videoSource_typeFields);
                    $sort.html(videoSource_typeFields);
                }
            } else if (search_terms) {
                $fields.html(videoSearch_termsFields);
                $sort.html(videoSearch_termsFields);
            } else if (device_type) {
                if (device_os) {
                    $fields.html(videoDevice_typeDevice_osFields);
                    $sort.html(videoDevice_typeDevice_osFields);
                } else {
                    $fields.html(videoDevice_typeFields);
                    $sort.html(videoDevice_typeFields);
                }
            } else if (device_os) {
                $fields.html(videoDevice_osFields);
                $sort.html(videoDevice_osFields);
            } else {
                $fields.html(videoFields);
                $sort.html(videoFields);
            }
        } else {
            onDimesionError(vals);
        }
    };
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
    // initialize videoData.items
    videoData.items = [];

    // set event listeners
    $requestType.on("change", function () {
        if ($requestType.val() === "rollup") {
            $dimension.html(rollupDimensionOptions);
        } else if ($requestType.val() === "report") {
            $dimension.html(reportDimensionOptions);
        }
    });
    $dimension.on("change", setFieldsSortOptions);
    // if we get a mapi token, redo the mapi call
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
})($, window, AnyTime, BCMAPI, Handlebars, BCLSformatJSON);