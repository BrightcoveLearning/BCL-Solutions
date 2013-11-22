var BCLS = (function ($, window, AnyTime, BCMAPI, Handlebars, BCLSformatJSON) {
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
        videoOptionTemplate = "{{#items}}<option value=\"{{id}}\">{{referenceId}} | {{name}}</option>{{/items}}",
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
        $limit = $("#limit"),
        $limitText = $("#limitText"),
        $offset = $("#offset"),
        $offsetText = $("#offsetText"),
        $sort = $("#sort"),
        $fields = $("#fields"),
        $request = $("#request"),
        $authorization = $("#authorization"),
        $authorizationDisplay = $("#authorizationDisplay"),
        $submitButton = $("#submitButton"),
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
        // options for different report types
        rollupDimensionOptions = "<option value=\"account\">account</option>",
        reportDimensionOptions = "<option value=\"account\">account</option><option value=\"player\">player</option><option value=\"referrer_domain\">referrer_domain</option><option value=\"source_type\">source_type</option><option value=\"search_terms\">search_terms</option><option value=\"device_type\">device_type</option><option value=\"device_os\">device_os</option>",
        rollupFormatOptions = "<option value=\"json\">json</option>",
        reportFormatOptions = "<option value=\"json\">json</option><option value=\"cvs\">cvs</option><option value=\"xlsx\">xlxs</option>",
        // fields for different dimensions
        baseFields = "<option value=\"engagement_score\">engagement_score</option><option value=\"play_rate\">play_rate</option><option value=\"video_impression\">video_impression</option><option value=\"video_view\">video_view</option><option value=\"video_percent_viewed\">video_percent_viewed</option><option value=\"video_seconds_viewed\">video_seconds_viewed</option>",
        accountFields = baseFields + "<option value=\"account\">account</option><option value=\"active_media\">active_media</option><option value=\"bytes_delivered\">bytes_delivered</option><option value=\"bytes_in\">bytes_in</option><option value=\"bytes_out\">bytes_out</option><option value=\"bytes_overhead\">bytes_overhead</option><option value=\"bytes_player\">bytes_player</option><option value=\"bytes_player\">bytes_player</option><option value=\"play_rate\">play_rate</option><option value=\"video_engagement_1\">video_engagement_1</option><option value=\"video_engagement_25\">video_engagement_25</option><option value=\"video_engagement_50\">video_engagement_50</option><option value=\"video_engagement_75\">video_engagement_75</option><option value=\"video_engagement_100\">video_engagement_100</option>",
        videoFields = baseFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option><option value=\"video_duration\">video_duration</option><option value=\"video_engagement\">video_engagement</option>i<option value=\"video_engagement_1\">video_engagement_1</option><option value=\"video_engagement_25\">video_engagement_25</option><option value=\"video_engagement_50\">video_engagement_50</option><option value=\"video_engagement_75\">video_engagement_75</option><option value=\"video_engagement_100\">video_engagement_100</option>",
        playerFields = baseFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option><option value=\"player_load\">player_load</option><option value=\"video_engagement\">video_engagement</option>",
        dayFields = baseFields + "<option value=\"active_media\">active_media</option><option value=\"bytes_delivered\">bytes_delivered</option><option value=\"bytes_in\">bytes_in</option><option value=\"bytes_out\">bytes_out</option><option value=\"bytes_overhead\">bytes_overhead</option><option value=\"bytes_player\">bytes_player</option><option value=\"bytes_stored\">bytes_stored</option><option value=\"day\">day</option><option value=\"player_load\">player_load</option><option value=\"video_engagement\">video_engagement</option>",
        referrer_domainFields = baseFields + "<option value=\"player_load\">player_load</option><option value=\"referrer_domain\">referrer_domain</option>",
        source_typeFields = baseFields + "<option value=\"player_load\">player_load</option><option value=\"source_type\">source_type</option>",
        search_termsFields = baseFields + "<option value=\"player_load\">player_load</option><option value=\"search_terms\">search_terms</option>",
        device_typeFields = baseFields + "<option value=\"player_load\">player_load</option><option value=\"device_type\">device_type</option>",
        device_osFields = baseFields + "<option value=\"player_load\">player_load</option><option value=\"device_os\">device_os</option>",
        accountVideoFields = videoFields + "<option value=\"account\">account</option>",
        playerVideoFields = videoFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option>",
        referrer_domainSource_typeFields = referrer_domainFields + "<option value=\"source_type\">source_type</option>",
        referrer_domainSearch_termsFields = referrer_domainFields + "<option value=\"search_terms\">search_terms</option>",
        source_typeSearch_termsFields = source_typeFields + "<option value=\"search_terms\">search_terms</option>",
        device_typeDevice_osFields = device_typeFields + "<option value=\"device_os\">device_os</option>",
        videoReferrer_domainFields = referrer_domainFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoSource_typeFields = source_typeFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoSearch_termsFields = search_termsFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoDevice_typeFields = device_typeFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoDevice_osFields = device_osFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        accountPlayerVideoFields = playerVideoFields + "<option value=\"account\">account</option>",
        accountVideoReferrer_domainFields = videoReferrer_domainFields + "<option value=\"account\">account</option>",
        accountVideoSource_typeFields = videoSource_typeFields + "<option value=\"account\">account</option>",
        accountVideoSearch_termsFields = videoSearch_termsFields + "<option value=\"account\">account</option>",
        videoReferrer_domainSource_typeFields = referrer_domainSource_typeFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoReferrer_domainSearch_termsFields = referrer_domainSearch_termsFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoSource_typeSearch_termsFields = source_typeSearch_termsFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoDevice_typeDevice_osFields = device_typeDevice_osFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        accountVideoReferrer_domainSource_typeFields = accountVideoReferrer_domainFields + "<option value=\"source_type\">source_type</option>",
        accountVideoReferrer_domainSearch_termsFields = accountVideoReferrer_domainFields + "<option value=\"search_terms\">search_terms</option>",
        accountVideoSource_typeSearch_termsFields = accountVideoSource_typeFields + "<option value=\"search_terms\">search_terms</option>",
        videoReferrer_domainSource_typeSearch_termsFields = videoReferrer_domainSource_typeFields + "<option value=\"search_terms\">search_terms</option>",
        accountVideoReferrer_domainSource_typeSearch_termsFields = accountVideoReferrer_domainSource_typeFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
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
        onDimesionError;

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
        params.video_fields = "id,name,referenceId";
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
    };
    // handler for MAPI call
    onGetVideos = function (JSONdata) {
        console.log(JSONdata);
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
                window.alert("For reports, you must select at least one dimension");
                return;
            }
            requestURL += "report/";
            requestURL += "?dimensions=video," + $dimension.val() + "&";
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
    getData = function (evt) {
        // clear the results frame
        $responseFrame.html("Loading...");
        $.ajax({
            url: $request.attr("value"),
            headers: {
                Authorization : $authorization.attr("value")
            },
            success : function (data) {
                $responseFrame.html(BCLSformatJSON.formatJSON(data));
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, your request was not successful. Here's what the server sent back: " + errorThrown);
            }
        });
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
            video = false,
            referrer_domain = false,
            source_type = false,
            search_terms = false,
            device_type = false,
            device_os = false;
        // check for nothing selected Fields -- then it's just the video dimension
        if (vals === null) {
			$fields.html(accountVideoFields);
			$sort.html(accountVideoFields);
			return;
		}

        // determine what values are in the array
        if ($.inArray("account", vals) > -1) {
            account = true;
        }
        if ($.inArray("player", vals) > -1) {
            player = true;
        }
        if ($.inArray("video", vals) > -1) {
            video = true;
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
        } else if (video) {
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

    // set event listeners
    $requestType.on("change", function () {
        if ($requestType.val() === "rollup") {
            $dimension.html(rollupDimensionOptions);
        } else if ($requestType.val() === "report") {
            $dimension.html(reportDimensionOptions);
        }
    });
    $dimension.on("change", setFieldsSortOptions);
    // if we get a mapi token, hide direct input of video id
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
    // set the initial options for fields and sort
    setFieldsSortOptions();
    // generate initial request
    buildRequest();
    return {
        buildRequest: buildRequest,
        onGetVideos: onGetVideos
    };
})($, window, AnyTime, BCMAPI, Handlebars, BCLSformatJSON);