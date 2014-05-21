var BCLS = (function ($, window, AnyTime, Handlebars, BCLSformatJSON) {
    "use strict";
    var // templates for data input options
        dimensionsArray = ["account", "player", "video", "country", "city", "region", "day", "destination_domain", "device_type", "device_os", "referrer_domain", "source_type", "search_terms"],
        dimensionsObj = {"items": dimensionsArray },
        dimensionOptionTemplate = "{{#items}}<option>{{this}}</option>{{/items}}",
        videoOptionTemplate = "{{#items}}<option value=\"{{video}}\">{{video_name}}</option>{{/items}}",
        playerOptionTemplate = "{{#items}}<option value=\"{{player}}\">{{player_name}}</option>{{/items}}",
        destinationOptionTemplate = "{{#items}}<option>{{destination_domain}}</option>{{/items}}",
        searchOptionTemplate = "{{#items}}<option>{{search_terms}}</option>{{/items}}",
        referrerOptionTemplate = "{{#items}}<option>{{referrer_domain}}</option>{{/items}}",
        countryOptionTemplate = "{{#items}}<option value=\"{{country}}\">{{country_name}}</option>{{/items}}",
        regionOptionTemplate = "{{#items}}<option value=\"{{region}}\">{{region_name}}</option>{{/items}}",
        cityOptionTemplate = "{{#items}}<option>{{city}}</option>{{/items}}",
        // fields and values
        $serviceURL = $("#serviceURL"),
        serviceURL,
        $accountID = $("#accountID"),
        account,
        $token = $("#token"),
        token,
        $APIrequestType = $("#requestType"),
        requestType,
        $dimensions = $("#dimensions"),
        dimensions,
        $startDate = $("#startDate"),
        from,
        $endDate = $("#endDate"),
        to,
        $whereInputs = $(".where-input"),
        $player = $("#player"),
        player,
        $video = $("#video"),
        video,
        $destination_domain = $("#destination_domain"),
        destination_domain,
        $referrer_domain = $("#referrer_domain"),
        referrer_domain,
        $source_type = $("#source_type"),
        source_type,
        $search_terms = $("#search_terms"),
        search_terms,
        $country = $("#country"),
        country,
        $region = $("#region"),
        region,
        $city = $("#city"),
        city,
        $device_os = $("#device_os"),
        device_os,
        $device_type = $("#device_type"),
        device_type,
        $limit = $("#limit"),
        $limitText = $("#limitText"),
        limit,
        $offset = $("#offset"),
        $offsetText = $("#offsetText"),
        offset,
        $sort = $("#sort"),
        sort,
        $fields = $("#fields"),
        fields,
        dataCalls = ["player", "video", "destination_domain", "referrer_domain", "search_terms", "country", "region", "city"],
        dataCallsIndex = 0,
        // for request building
        thisRequestType = "",
        APIrequest = document.getElementById("APIrequest"),
        $authorization = $("#authorization"),
        $authorizationDisplay = $("#authorizationDisplay"),
        $submitButton = $("#submitButton"),
        $required = $(".required"),
        $format = $("#format"),
        format,
        APIrequestInputs = $(".aapi-request"),
        $responseFrame = $("#responseFrame"),
        optionTemplate = "{{#items}}<option value=\"{{.}}\">{{this}}</option>{{/items}}",
        template,
        result,
        obj = {},
        $this,
        thisVal,
        separator = "",
        requestTrimmed = false,
        lastChar = "",
        where = false,
        requestURL = "",
        authorization = "",
        endDate = "",
        startDate = "",
        // options for different report types
        rollupDimensionOptions = "<option value=\"account\">account</option>",
        reportDimensionOptions = "<option value=\"account\">account</option><option value=\"player\">player</option><option value=\"video\">video</option><option value=\"day\">day</option><option value=\"referrer_domain\">referrer_domain</option><option value=\"source_type\">source_type</option><option value=\"search_terms\">search_terms</option><option value=\"device_type\">device_type</option><option value=\"device_os\">device_os</option>",
        rollupFormatOptions = "<option value=\"json\">json</option>",
        reportFormatOptions = "<option value=\"json\">json</option><option value=\"cvs\">cvs</option><option value=\"xlsx\">xlxs</option>",
        // fields for different dimensions
        baseFields = "<option value=\"engagement_score\">engagement_score</option><option value=\"play_rate\">play_rate</option><option value=\"video_impression\">video_impression</option><option value=\"video_view\">video_view</option><option value=\"video_percent_viewed\">video_percent_viewed</option><option value=\"video_seconds_viewed\">video_seconds_viewed</option>",
        accountFields = baseFields + "<option value=\"account\">account</option><option value=\"active_media\">active_media</option><option value=\"bytes_delivered\">bytes_delivered</option><option value=\"bytes_in\">bytes_in</option><option value=\"bytes_out\">bytes_out</option><option value=\"bytes_overhead\">bytes_overhead</option><option value=\"bytes_player\">bytes_player</option><option value=\"bytes_player\">bytes_player</option><option value=\"play_rate\">play_rate</option><option value=\"video_engagement_1\">video_engagement_1</option><option value=\"video_engagement_25\">video_engagement_25</option><option value=\"video_engagement_50\">video_engagement_50</option><option value=\"video_engagement_75\">video_engagement_75</option><option value=\"video_engagement_100\">video_engagement_100</option>",
        videoFields = baseFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option><option value=\"video_duration\">video_duration</option><option value=\"video_engagement\">video_engagement</option>i<option value=\"video_engagement_1\">video_engagement_1</option><option value=\"video_engagement_25\">video_engagement_25</option><option value=\"video_engagement_50\">video_engagement_50</option><option value=\"video_engagement_75\">video_engagement_75</option><option value=\"video_engagement_100\">video_engagement_100</option>",
        playerFields = baseFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option><option value=\"player_load\">player_load</option><option value=\"video_engagement\">video_engagement</option>",
        dayFields = baseFields + "<option value=\"active_media\">active_media</option><option value=\"bytes_delivered\">bytes_delivered</option><option value=\"bytes_in\">bytes_in</option><option value=\"bytes_out\">bytes_out</option><option value=\"bytes_overhead\">bytes_overhead</option><option value=\"bytes_player\">bytes_player</option><option value=\"bytes_stored\">bytes_stored</option><option value=\"day\">day</option><option value=\"player_load\">player_load</option><option value=\"video_engagement\">video_engagement</option>",
        countryFields = baseFields + "<option value=\"country\">country</option><option value=\"country_name\">country_name</option>",
        cityFields = baseFields + "<option value=\"city\">city</option>",
        regionFields = baseFields + "<option value=\"region\">region</option>",
        destinationDomainFields = baseFields + "<option value=\"destination_domain\">destination_domain</option>",
        referrer_domainFields = baseFields + "<option value=\"player_load\">player_load</option><option value=\"referrer_domain\">referrer_domain</option>",
        source_typeFields = baseFields + "<option value=\"player_load\">player_load</option><option value=\"source_type\">source_type</option>",
        search_termsFields = baseFields + "<option value=\"player_load\">player_load</option><option value=\"search_terms\">search_terms</option>",
        device_typeFields = baseFields + "<option value=\"player_load\">player_load</option><option value=\"device_type\">device_type</option>",
        device_osFields = baseFields + "<option value=\"player_load\">player_load</option><option value=\"device_os\">device_os</option>",
        accountVideoFields = videoFields + "<option value=\"account\">account</option>",
        accountPlayerFields = playerFields + "<option value=\"account\">account</option>",
        accountReferrer_domainFields = referrer_domainFields + "<option value=\"account\">account</option>",
        accountSource_typeFields = source_typeFields + "<option value=\"account\">account</option>",
        accountSearch_termsFields = search_termsFields + "<option value=\"account\">account</option>",
        accountDevice_typeFields = device_typeFields + "<option value=\"account\">account</option>",
        accountDevice_osFields = device_osFields + "<option value=\"account\">account</option>",
        playerVideoFields = videoFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option>",
        playerReferrer_domainFields = referrer_domainFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option>",
        playerSource_typeFields = source_typeFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option>",
        playerSearch_termsFields = search_termsFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option>",
        playerDevice_typeFields = device_typeFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option>",
        playerDevice_osFields = device_osFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option>",
        videoReferrer_domainFields = referrer_domainFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoSource_typeFields = source_typeFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoSearch_termsFields = search_termsFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoDevice_typeFields = device_typeFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoDevice_osFields = device_osFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        countryCityFields = cityFields + "<option value=\"country\">country</option><option value=\"country_name\">country_name</option><option value=\"dma\">dma</option>",
        countryRegionFields = regionFields + "<option value=\"country\">country</option><option value=\"country_name\">country_name</option>",
        cityRegionFields = regionFields + "<option value=\"city\">city</option>",
        referrer_domainSource_typeFields = referrer_domainFields + "<option value=\"source_type\">source_type</option>",
        referrer_domainSearch_termsFields = referrer_domainFields + "<option value=\"search_terms\">search_terms</option>",
        source_typeSearch_termsFields = source_typeFields + "<option value=\"search_terms\">search_terms</option>",
        device_typeDevice_osFields = device_typeFields + "<option value=\"device_os\">device_os</option>",
        accountPlayerVideoFields = playerVideoFields + "<option value=\"account\">account</option>",
        accountPlayerReferrer_domainFields = playerReferrer_domainFields + "<option value=\"account\">account</option>",
        accountPlayerSource_typeFields = playerSource_typeFields + "<option value=\"account\">account</option>",
        accountPlayerSearch_termsFields = playerSearch_termsFields + "<option value=\"account\">account</option>",
        accountVideoReferrer_domainFields = videoReferrer_domainFields + "<option value=\"account\">account</option>",
        accountVideoSource_typeFields = videoSource_typeFields + "<option value=\"account\">account</option>",
        accountVideoSearch_termsFields = videoSearch_termsFields + "<option value=\"account\">account</option>",
        accountReferrer_domainSource_typeFields = referrer_domainSource_typeFields + "<option value=\"account\">account</option>",
        accountReferrer_domainSearch_termsFields = referrer_domainSearch_termsFields +  "<option value=\"account\">account</option>",
        accountSource_typeSearch_termsFields = source_typeSearch_termsFields + "<option value=\"account\">account</option>",
        accountDevice_typeDevice_osFields = device_typeDevice_osFields + "<option value=\"account\">account</option>",
        playerReferrer_domainSource_typeFields = referrer_domainSource_typeFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option>",
        playerReferrer_domainSearch_termsFields = referrer_domainSearch_termsFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option>",
        playerSource_typeSearch_termsFields = source_typeSearch_termsFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option>",
        playerDevice_typeDevice_osFields = device_typeDevice_osFields + "<option value=\"player\">player</option><option value=\"player_name\">player_name</option>",
        videoReferrer_domainSource_typeFields = referrer_domainSource_typeFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoReferrer_domainSearch_termsFields = referrer_domainSearch_termsFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoSource_typeSearch_termsFields = source_typeSearch_termsFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        videoDevice_typeDevice_osFields = device_typeDevice_osFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        countryCityRegionFields = countryRegionFields + "<option value=\"city\">city</option>",
        referrer_domainSource_typeSearch_termsFields = referrer_domainSource_typeFields + "<option value=\"search_terms\">search_terms</option>",
        accountPlayerReferrer_domainSource_typeFields = accountPlayerReferrer_domainFields + "<option value=\"source_type\">source_type</option>",
        accountPlayerReferrer_domainSearch_termsFields = accountPlayerReferrer_domainFields + "<option value=\"search_terms\">search_terms</option>",
        accountPlayerSource_typeSearch_termsFields = accountPlayerSource_typeFields + "<option value=\"search_terms\">search_terms</option>",
        accountVideoReferrer_domainSource_typeFields = accountVideoReferrer_domainFields + "<option value=\"source_type\">source_type</option>",
        accountVideoReferrer_domainSearch_termsFields = accountVideoReferrer_domainFields + "<option value=\"search_terms\">search_terms</option>",
        accountVideoSource_typeSearch_termsFields = accountVideoSource_typeFields + "<option value=\"search_terms\">search_terms</option>",
        accountReferrer_domainSource_typeSearch_termsFields = accountReferrer_domainSource_typeFields + "<option value=\"search_terms\">search_terms</option>",
        playerReferrer_domainSource_typeSearch_termsFields = playerReferrer_domainSource_typeFields + "<option value=\"search_terms\">search_terms</option>",
        videoReferrer_domainSource_typeSearch_termsFields = videoReferrer_domainSource_typeFields + "<option value=\"search_terms\">search_terms</option>",
        accountPlayerReferrer_domainSource_typeSearch_termsFields = accountPlayerReferrer_domainSource_typeFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        accountVideoReferrer_domainSource_typeSearch_termsFields = accountVideoReferrer_domainSource_typeFields + "<option value=\"video\">video</option><option value=\"video_name\">video_name</option>",
        // functions to be defined
        bclslog,
        getDataForInputs,
        buildDataForInputRequest,
        getInputValues,
        onGetVideos,
        trimRequest,
        removeSpaces,
        buildRequest,
        isDefined,
        getData,
        setFieldsSortOptions,
        onDimesionError,
        init;

    // safe console log
    bclslog = function (m) {
        if (isDefined(window.console)) {
            window.console.log(m);
        }
    };
    // more robust test for strings "not defined"
    isDefined =  function (v) {
        if (v !== "" && v !== null && v !== "undefined" && v !== undefined) {
            return true;
        }
        return false;
    };
    // get input field values
    getDataForInputs = function () {
        serviceURL = $serviceURL.val();
        token = removeSpaces($token.val());
        account = removeSpaces($accountID.val());
        requestType = $APIrequestType.val();
        dimensions = $dimensions.val().join(",");
        to = $endDate.val();
        from = $startDate.val();
        player = $player.val().join(",");
        video = $video.val().join(",");
        destination_domain = $destination_domain.val().join(",");
        referrer_domain = $referrer_domain.val().join(",");
        search_terms = encodeURI($search_terms.val().join(","));
        source_type = $source_type.val().join(",");
        device_os = $device_os.val().join(",");
        device_type = $device_type.val().join(",");
        country = $country.val().join(",");
        region = $region.val().join(",");
        city = $city.val().join(",");
        format = $format.val();
        if (isDefined($limitText.val())) {
            limit = removeSpaces($limitText.val());
        } else {
            limit = $limit.val();
        }
        if (isDefined($offsetText.val())) {
            offset = $offsetText.val();
        } else {
            offset = $offset.val();
        }
        sort = $sort.val();
        fields = $fields.val().join(",");
        // check for required fields
        if (!isDefined(account) || !isDefined(token)) {
            window.alert("You must provide an account ID and a token");
        }
    };
    // build request for input data
    buildDataForInputRequest = function (dataType) {
        var url = serviceURL + "account/" + account + "report/" + "?dimensions=" + dataType + "&from=" + from + "&to=" + to;
        thisRequestType = "data";
        switch (dataType) {
        case "player":
            url += "&fields=player,player_name" + "&sort=player_name" + "&limit=all";
            break;
        case "video":
            url += "&fields=video,video_name" + "&sort=video_name" + "&limit=all";
            break;
        case "destination_domain":
            url += "&fields=destination_domain" + "&sort=destination_domain" + "&limit=all";
            break;
        case "referrer_domain":
            url += "&fields=referrer_domain" + "&sort=referrer_domain" + "&limit=all";
            break;
        case "search_terms":
            url += "&fields=search_terms" + "&sort=search_terms" + "&limit=all";
            break;
        case "country":
            url += "&fields=country,country_name" + "&sort=country_name" + "&limit=all";
            break;
        case "region":
            url += "&fields=region,region_name" + "&sort=region_name" + "&limit=all";
            break;
        case "city":
            url += "&fields=city" + "&sort=city" + "&limit=all";
            break;
        default:
            bclslog("unknown data type " + dataType);
            break;
        }
        getData(url, thisRequestType, dataType);
    };
    removeSpaces = function (str) {
        if (isDefined(str)) {
            str = str.replace(/\s+/g, "");
            return str;
        }
    };
    // trim trailing white space and multiple &&s
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
    // get input values from the fields
    // construct the request
    buildRequest = function () {
        // make sure we have the latest values
        getDataForInputs();
        // reset requestTrimmed to false in case of regenerate request
        requestTrimmed = false;
        // build the request
        authorization = "Bearer " + token;
        requestURL = serviceURL + "account/" + account;
        // is it a report?
        if (requestType === "report") {
            // make sure dimensions is defined
            if (!isDefined(dimensions)) {
                window.alert("For reports, you must select at least one dimension");
                return;
            }
            requestURL += "report/";
            requestURL += "?dimensions=" + dimensions + "&";
        } else {
            requestURL += "?";
        }
        // check for time filters
        if (isDefined(from)) {
            requestURL += "from=" + from + "&";
        }
        if (isDefined(to)) {
            requestURL += "to=" + to + "&";
        }
        // check for where filters
        if (isDefined(player) || isDefined(video) || isDefined(destination_domain) || isDefined(referrer_domain) || isDefined(search_terms) || isDefined(source_type) || isDefined(country) || isDefined(region) || isDefined(city) || isDefined(device_os) || isDefined(device_type)) {
            requestURL += "where=";
            if (isDefined(player)) {
                requestURL += "player==" + player + ";";
            }
            if (isDefined(video)) {
                requestURL += "video==" + video + ";";
            }
            if (isDefined(destination_domain)) {
                requestURL += "destination_domain==" + destination_domain + ";";
            }
            if (isDefined(referrer_domain)) {
                requestURL += "referrer_domain==" + referrer_domain + ";";
            }
            if (isDefined(search_terms)) {
                requestURL += "search_terms==" + search_terms + ";";
            }
            if (isDefined(source_type)) {
                requestURL += "source_type==" + source_type + ";";
            }
            if (isDefined(country)) {
                requestURL += "country==" + country + ";";
            }
            if (isDefined(region)) {
                requestURL += "region==" + region + ";";
            }
            if (isDefined(city)) {
                requestURL += "city==" + city + ";";
            }
            if (isDefined(device_os)) {
                requestURL += "device_os==" + device_os + ";";
            }
            if (isDefined(device_type)) {
                requestURL += "device_type==" + device_type + ";";
            }
        }
        // end the where filters
        requestURL += "&";
        // check for limit and offset
        if (isDefined(limit)) {
            requestURL += "limit=" + limit + "&";
        }
        if (isDefined(offset)) {
            requestURL += "offset=" + offset + "&";
        }
        // check for fields
        if (isDefined(fields)) {
            requestURL += "fields=" + fields + "&";
        }
        // check for sorting
        if (isDefined(sort)) {
            requestURL += "sort=" + sort + "&";
        }
        // get output format
        requestURL += separator + "format=" + $format.val();
        // strip trailing ? or & and replace &&s
        trimRequest();
        APIrequest.value = requestURL;
        $authorizationDisplay.html(authorization);
        $authorization.attr("value", authorization);
    };
    // submit request
    getData = function (requestURL, thisRequestType, dataType) {
        if (dataType === "analytics") {
            // clear the results frame
            $responseFrame.html("Loading...");
        }
        bclslog(APIrequest.value);
        $.ajax({
            url: requestURL,
            headers: {
                Authorization : $authorization.attr("value")
            },
            success : function (data) {
                if (dataType === "analytics") {
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
                        break;
                    }
                }
                
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, your request was not successful. Here's what the server sent back: " + errorThrown);
            }
        });
    };
    // error handler for invalid dimension combination
    onDimesionError = function (selectiedDimensions) {
        window.alert("The combination of dimensions you selected - " +  selectiedDimensions.join(" ,") +  " - is not a valid combination. Please select a different combination. See the Analytics API Overview for a table of allowable combinations.");
    };
    // set the options for the fields and sort
    setFieldsSortOptions = function () {
        var vals = $dimensions.val(),
            account = false,
            day = false,
            player = false,
            video = false,
            country = false,
            city = false,
            region = false,
            referrer_domain = false,
            source_type = false,
            search_terms = false,
            device_type = false,
            device_os = false,
            destination_path = false,
            destination_domain = false;
        // determine what values are in the array
        if ($.inArray("account", vals) > -1) {
            account = true;
        }
        if ($.inArray("day", vals) > -1) {
            day = true;
        }
        if ($.inArray("player", vals) > -1) {
            player = true;
        }
        if ($.inArray("video", vals) > -1) {
            video = true;
        }
        if ($.inArray("country", vals) > -1) {
            country = true;
        }
        if ($.inArray("city", vals) > -1) {
            city = true;
        }
        if ($.inArray("region", vals) > -1) {
            region = true;
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
        if ($.inArray("destination_domain", vals) > -1) {
            destination_domain = true;
        }
        if (day) {
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + dayFields);
            $sort.html(dayFields);
        } else if (account) { // account combinations
            if (player) {
                if (video) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountPlayerVideoFields);
                    $sort.html(accountPlayerVideoFields);
                } else if (referrer_domain) {
                    if (source_type) {
                        if (search_terms) {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountPlayerReferrer_domainSource_typeSearch_termsFields);
                            $sort.html(accountPlayerReferrer_domainSource_typeSearch_termsFields);
                        } else {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountPlayerReferrer_domainSource_typeFields);
                            $sort.html(accountPlayerReferrer_domainSource_typeFields);
                        }
                    } else if (search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountPlayerReferrer_domainSearch_termsFields);
                        $sort.html(accountPlayerReferrer_domainSearch_termsFields);
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountPlayerReferrer_domainFields);
                        $sort.html(accountPlayerReferrer_domainFields);
                    }
                } else if (source_type) {
                    if (search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountPlayerSource_typeSearch_termsFields);
                        $sort.html(accountPlayerSource_typeSearch_termsFields);
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountPlayerSource_typeFields);
                        $sort.html(accountPlayerSource_typeFields);
                    }
                } else if (search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountPlayerSearch_termsFields);
                    $sort.html(accountPlayerSearch_termsFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountPlayerFields);
                    $sort.html(accountPlayerFields);
                }
            } else if (video) {
                if (referrer_domain) {
                    if (source_type) {
                        if (search_terms) {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountVideoReferrer_domainSource_typeSearch_termsFields);
                            $sort.html(accountVideoReferrer_domainSource_typeSearch_termsFields);
                        } else {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountVideoReferrer_domainSource_typeFields);
                            $sort.html(accountVideoReferrer_domainSource_typeFields);
                        }
                    } else if (search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountVideoReferrer_domainSearch_termsFields);
                        $sort.html(accountVideoReferrer_domainSearch_termsFields);
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountVideoReferrer_domainFields);
                        $sort.html(accountVideoReferrer_domainFields);
                    }
                } else if (source_type) {
                    if (search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountVideoSource_typeSearch_termsFields);
                        $sort.html(accountVideoSource_typeSearch_termsFields);
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountVideoSource_typeFields);
                        $sort.html(accountVideoSource_typeFields);
                    }
                } else if (search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountVideoSearch_termsFields);
                    $sort.html(accountVideoSearch_termsFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountVideoFields);
                    $sort.html(accountVideoFields);
                }
            } else if (referrer_domain) {
                if (source_type) {
                    if (search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountReferrer_domainSource_typeSearch_termsFields);
                        $sort.html(accountReferrer_domainSource_typeSearch_termsFields);
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountReferrer_domainSource_typeFields);
                        $sort.html(accountReferrer_domainSource_typeFields);
                    }
                } else if (search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountReferrer_domainSearch_termsFields);
                    $sort.html(accountReferrer_domainSearch_termsFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountReferrer_domainFields);
                    $sort.html(accountReferrer_domainFields);
                }
            } else if (source_type) {
                if (search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountSource_typeSearch_termsFields);
                    $sort.html(accountSource_typeSearch_termsFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountSource_typeFields);
                    $sort.html(accountSource_typeFields);
                }
            } else if (search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountSearch_termsFields);
                $sort.html(accountSearch_termsFields);
            } else if (device_type) {
                if (device_os) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountDevice_typeDevice_osFields);
                    $sort.html(accountDevice_typeDevice_osFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountDevice_typeFields);
                    $sort.html(accountDevice_typeFields);
                }
            } else if (device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountDevice_osFields);
                $sort.html(accountDevice_osFields);
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + accountFields);
                $sort.html(accountFields);
            }
        } else if (player) { // player combinations
            if (video) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + playerVideoFields);
                $sort.html(playerVideoFields);
            } else if (referrer_domain) {
                if (source_type) {
                    if (search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + playerReferrer_domainSource_typeSearch_termsFields);
                        $sort.html(playerReferrer_domainSource_typeSearch_termsFields);
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + playerReferrer_domainSource_typeFields);
                        $sort.html(playerReferrer_domainSource_typeFields);
                    }
                } else if (search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + playerReferrer_domainSearch_termsFields);
                    $sort.html(playerReferrer_domainSearch_termsFields);
                }
            } else if (source_type) {
                if (search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + playerSource_typeSearch_termsFields);
                    $sort.html(playerSource_typeSearch_termsFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + playerSource_typeFields);
                    $sort.html(playerSource_typeFields);
                }
            } else if (search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + playerSearch_termsFields);
                $sort.html(playerSearch_termsFields);
            } else if (device_type) {
                if (device_os) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + playerDevice_typeDevice_osFields);
                    $sort.html(playerDevice_typeDevice_osFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + playerDevice_typeFields);
                    $sort.html(playerDevice_typeFields);
                }
            } else if (device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + playerDevice_osFields);
                $sort.html(playerDevice_osFields);
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + playerFields);
                $sort.html(playerFields);
            }
        } else if (video) { // video combinations
            if (referrer_domain) {
                if (source_type) {
                    if (search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + videoReferrer_domainSource_typeSearch_termsFields);
                        $sort.html(videoReferrer_domainSource_typeSearch_termsFields);
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + videoReferrer_domainSource_typeFields);
                        $sort.html(videoReferrer_domainSource_typeFields);
                    }
                } else if (search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + videoReferrer_domainSearch_termsFields);
                    $sort.html(videoReferrer_domainSearch_termsFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + videoReferrer_domainFields);
                    $sort.html(videoReferrer_domainFields);
                }
            } else if (source_type) {
                if (search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + videoSource_typeSearch_termsFields);
                    $sort.html(videoSource_typeSearch_termsFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + videoSource_typeFields);
                    $sort.html(videoSource_typeFields);
                }
            } else if (search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + videoSearch_termsFields);
                $sort.html(videoSearch_termsFields);
            } else if (device_type) {
                if (device_os) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + videoDevice_typeDevice_osFields);
                    $sort.html(videoDevice_typeDevice_osFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + videoDevice_typeFields);
                    $sort.html(videoDevice_typeFields);
                }
            } else if (device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + videoDevice_osFields);
                $sort.html(videoDevice_osFields);
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + videoFields);
                $sort.html(videoFields);
            }
        } else if (country) { // country combinations
            if (city) {
                if (region) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + countryCityRegionFields);
                    $sort.html(countryCityRegionFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + countryCityFields);
                    $sort.html(countryCityFields);
                }
            } else if (region) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + countryRegionFields);
                $sort.html(countryRegionFields);
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + countryFields);
                $sort.html(countryFields);
            }
        } else if (city) { // city combinations
            if (region) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + cityRegionFields);
                $sort.html(cityRegionFields);
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + cityFields);
                $sort.html(cityFields);
            }
        } else if (region) {
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + regionFields);
            $sort.html(regionFields);
        } else if (referrer_domain) { // referrer_domain combinations
            if (source_type) {
                if (search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + referrer_domainSource_typeSearch_termsFields);
                    $sort.html(referrer_domainSource_typeSearch_termsFields);
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + referrer_domainSource_typeFields);
                    $sort.html(referrer_domainSource_typeFields);
                }
            } else if (search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + referrer_domainSearch_termsFields);
                $sort.html(referrer_domainSearch_termsFields);
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + referrer_domainFields);
                $sort.html(referrer_domainFields);
            }
        } else if (source_type) { // source_type combinations
            if (search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + source_typeSearch_termsFields);
                $sort.html(source_typeSearch_termsFields);
            } else {
                $fields(source_typeFields);
                $sort.html(source_typeFields);
            }
        } else if (search_terms) { // search_terms combinations
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + search_termsFields);
            $sort.html(search_termsFields);
        } else if (device_type) { // device_type combinations
            if (device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + device_typeDevice_osFields);
                $sort.html(device_typeDevice_osFields);
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + device_typeFields);
                $sort.html(device_typeFields);
            }
        } else if (device_os) { // device_os combinations
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + device_osFields);
            $sort.html(device_osFields);
        } else if (destination_domain) { // destination_domain combinations
            if (destination_path) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + destinationDomainDesinationPathFields);
                $sort.html(destinationDomainDesinationPathFields);
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + destinationDomainFields);
                $sort.html(destinationDomainFields);
            }
        // } else if (destination_path) { // destination path combinations
        //     $fields.html("<option value=\"all\" selected=\"true\">all</option>" + destinationPathFields);
        //     $sort.html(destinationPathFields);
        } else {
            onDimesionError(vals);
        }
    };
    // set up the anytime date/time pickers
    AnyTime.picker("startDate", {
        format : "%Y-%m-%d"
    });
    AnyTime.picker("endDate", {
        format : "%Y-%m-%d"
    });
    // init
    init = function () {
        // set event listeners
        $APIrequestType.on("change", function () {
            if ($APIrequestType.val() === "rollup") {
                $dimensions.html("");
                $format.html(rollupFormatOptions);
            } else if ($APIrequestType.val() === "report") {
                template = Handlebars.compile(optionTemplate);
                obj.items = dimensions;
                result = template(obj);
                $dimensions.html(result);
                $format.html(reportFormatOptions);
            }
        });
        $dimensions.on("change", setFieldsSortOptions);
        // set listener for form fields
        APIrequestInputs.on("change", buildRequest);
        // send request
        $submitButton.on("click", function () {
            thisRequestType = "analytics";
            getData(APIrequest.value, thisRequestType);
        });
        // populate data input selectors
        buildDataForInputRequest(dataCalls[dataCallsIndex]);
        // set the initial options for fields and sort
        setFieldsSortOptions();
        // generate initial request
        buildRequest();
    }
    // set things up
    init();
    return {
        buildRequest: buildRequest,
        onGetVideos: onGetVideos
    };
})($, window, AnyTime, Handlebars, BCLSformatJSON);
