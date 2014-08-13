var BCLS = (function ($, window, document, Pikaday, Handlebars, BCLSformatJSON) {
    "use strict";
    var // templates for data input options
        dimensionsArray = ["account", "player", "video", "country", "city", "region", "day", "destination_domain", "device_type", "device_os", "referrer_domain", "source_type", "search_terms"],
        dimensionsObj = {"items": dimensionsArray },
        dimensionOptionTemplate = "{{#items}}<option>{{this}}</option>{{/items}}",
        videoOptionTemplate = "{{#items}}<option value=\"{{video}}\">{{video_name}}</option>{{/items}}",
        playerOptionTemplate = "{{#items}}<option value=\"{{player}}\">{{player_name}}</option>{{/items}}",
        destination_domainOptionTemplate = "{{#items}}<option>{{destination_domain}}</option>{{/items}}",
        search_termsOptionTemplate = "{{#items}}<option>{{search_terms}}</option>{{/items}}",
        referrer_domainOptionTemplate = "{{#items}}<option>{{referrer_domain}}</option>{{/items}}",
        countryOptionTemplate = "{{#items}}<option value=\"{{country}}\">{{country_name}}</option>{{/items}}",
        regionOptionTemplate = "{{#items}}<option value=\"{{region}}\">{{region_name}}</option>{{/items}}",
        cityOptionTemplate = "{{#items}}<option>{{city}}</option>{{/items}}",
        // fields and values
        $serviceURL = $("#serviceURL"),
        serviceURL,
        $accountID = $("#accountID"),
        account,
        $client_secret_display = $("#client_secret_display"),
        $client_id_display = $("#client_id_display"),
        $client_id = $("#client_id"),
        $client_secret = $("#client_secret"),
        client_id,
        client_secret,
        $APIrequestType = $("#requestType"),
        requestType,
        $dimensions = $("#dimensions"),
        dimensions,
        $from = $("#from"),
        from,
        fromPicker,
        $to = $("#to"),
        to,
        toPicker,
        $date_range = $(".date-range"),
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
        fieldOptionsTemplate = "{{#items}}<option>{{this}}</option>{{/items}}",
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
        rollupFormatOptions = "<option value=\"json\">json</option>",
        reportFormatOptions = "<option value=\"json\">json</option><option value=\"csv\">csv</option><option value=\"xlsx\">xlxs</option>",
        // fields for different dimensions
        baseFields = {"items": ["engagement_score", "play_rate", "player_load", "video_impression", "video_view", "video_percent_viewed", "video_seconds_viewed"]},
        accountFields = {"items": ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"]},
        videoFields = {"items": baseFields.items.concat(["video", "video_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "bytes_delivered", "content_delivered"])},
        playerFields = {"items": baseFields.items.concat(["player", "player_name", "video_duration", "video_engagement", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100"])},
        dayFields = {"items": ["account", "active_media", "bytes_delivered", "bytes_in", "bytes_out", "bytes_overhead", "bytes_player", "bytes_stored", "cdn_log_line", "chimera_report", "content_delivered", "day", "drm_bytes_packaged", "engagement_score", "licenses_served", "play_rate", "player_load", "video_engagement_1", "video_engagement_25", "video_engagement_50", "video_engagement_75", "video_engagement_100", "video_impression", "video_percent_viewed", "video_seconds_viewed", "video_view"]},
        countryFields = {"items": baseFields.items.concat(["country", "country_name"])},
        cityFields = {"items": baseFields.items.concat(["city"])},
        regionFields = {"items": baseFields.items.concat(["region"])},
        destination_domainFields = {"items": baseFields.items.concat(["destination_domain"])},
        referrer_domainFields = {"items": baseFields.items.concat(["player_load", "referrer_domain"])},
        source_typeFields = {"items": baseFields.items.concat(["player_load", "source_type"])},
        search_termsFields = {"items": baseFields.items.concat(["player_load", "search_terms"])},
        device_typeFields = {"items": baseFields.items.concat(["player_load", "device_type"])},
        device_osFields = {"items": baseFields.items.concat(["player_load", "device_os"])},
        accountVideoFields = {"items": videoFields.items.concat(["account"])},
        accountPlayerFields = {"items": playerFields.items.concat(["account"])},
        accountReferrer_domainFields = {"items": referrer_domainFields.items.concat(["account"])},
        accountSource_typeFields = {"items": source_typeFields.items.concat(["account"])},
        accountSearch_termsFields = {"items": search_termsFields.items.concat(["account"])},
        accountDevice_typeFields = {"items": device_typeFields.items.concat(["account"])},
        accountDevice_osFields = {"items": device_osFields.items.concat(["account"])},
        playerVideoFields = {"items": videoFields.items.concat(["player", "player_name"])},
        playerReferrer_domainFields = {"items": referrer_domainFields.items.concat(["player", "player_name"])},
        playerSource_typeFields = {"items": source_typeFields.items.concat(["player", "player_name"])},
        playerSearch_termsFields = {"items": search_termsFields.items.concat(["player", "player_name"])},
        playerDevice_typeFields = {"items": device_typeFields.items.concat(["player", "player_name"])},
        playerDevice_osFields = {"items": device_osFields.items.concat(["player", "player_name"])},
        videoReferrer_domainFields = {"items": referrer_domainFields.items.concat(["video", "video_name"])},
        videoSource_typeFields = {"items": source_typeFields.items.concat(["video", "video_name"])},
        videoSearch_termsFields = {"items": search_termsFields.items.concat(["video", "video_name"])},
        videoDevice_typeFields = {"items": device_typeFields.items.concat(["video", "video_name"])},
        videoDevice_osFields = {"items": device_osFields.items.concat(["video", "video_name"])},
        countryCityFields = {"items": cityFields.items.concat(["country", "country_name", "dma"])},
        countryRegionFields = {"items": regionFields.items.concat(["country", "country_name"])},
        cityRegionFields = {"items": regionFields.items.concat(["city"])},
        referrer_domainSource_typeFields = {"items": referrer_domainFields.items.concat(["source_type"])},
        referrer_domainSearch_termsFields = {"items": referrer_domainFields.items.concat(["search_terms"])},
        source_typeSearch_termsFields = {"items": source_typeFields.items.concat(["search_terms"])},
        device_typeDevice_osFields = {"items": device_typeFields.items.concat(["device_os"])},
        accountPlayerVideoFields = {"items": playerVideoFields.items.concat(["account"])},
        accountPlayerReferrer_domainFields = {"items": playerReferrer_domainFields.items.concat(["account"])},
        accountPlayerSource_typeFields = {"items": playerSource_typeFields.items.concat(["account"])},
        accountPlayerSearch_termsFields = {"items": playerSearch_termsFields.items.concat(["account"])},
        accountVideoReferrer_domainFields = {"items": videoReferrer_domainFields.items.concat(["account"])},
        accountVideoSource_typeFields = {"items": videoSource_typeFields.items.concat(["account"])},
        accountVideoSearch_termsFields = {"items": videoSearch_termsFields.items.concat(["account"])},
        accountReferrer_domainSource_typeFields = {"items": referrer_domainSource_typeFields.items.concat(["account"])},
        accountReferrer_domainSearch_termsFields = {"items": referrer_domainSearch_termsFields.items.concat([ "account"])},
        accountSource_typeSearch_termsFields = {"items": source_typeSearch_termsFields.items.concat(["account"])},
        accountDevice_typeDevice_osFields = {"items": device_typeDevice_osFields.items.concat(["account"])},
        playerReferrer_domainSource_typeFields = {"items": referrer_domainSource_typeFields.items.concat(["player", "player_name"])},
        playerReferrer_domainSearch_termsFields = {"items": referrer_domainSearch_termsFields.items.concat(["player", "player_name"])},
        playerSource_typeSearch_termsFields = {"items": source_typeSearch_termsFields.items.concat(["player", "player_name"])},
        playerDevice_typeDevice_osFields = {"items": device_typeDevice_osFields.items.concat(["player", "player_name"])},
        videoReferrer_domainSource_typeFields = {"items": referrer_domainSource_typeFields.items.concat(["video", "video_name"])},
        videoReferrer_domainSearch_termsFields = {"items": referrer_domainSearch_termsFields.items.concat(["video", "video_name"])},
        videoSource_typeSearch_termsFields = {"items": source_typeSearch_termsFields.items.concat(["video", "video_name"])},
        videoDevice_typeDevice_osFields = {"items": device_typeDevice_osFields.items.concat(["video", "video_name"])},
        countryCityRegionFields = {"items": countryRegionFields.items.concat(["city"])},
        referrer_domainSource_typeSearch_termsFields = {"items": referrer_domainSource_typeFields.items.concat(["search_terms"])},
        accountPlayerReferrer_domainSource_typeFields = {"items": accountPlayerReferrer_domainFields.items.concat(["source_type"])},
        accountPlayerReferrer_domainSearch_termsFields = {"items": accountPlayerReferrer_domainFields.items.concat(["search_terms"])},
        accountPlayerSource_typeSearch_termsFields = {"items": accountPlayerSource_typeFields.items.concat(["search_terms"])},
        accountVideoReferrer_domainSource_typeFields = {"items": accountVideoReferrer_domainFields.items.concat(["source_type"])},
        accountVideoReferrer_domainSearch_termsFields = {"items": accountVideoReferrer_domainFields.items.concat(["search_terms"])},
        accountVideoSource_typeSearch_termsFields = {"items": accountVideoSource_typeFields.items.concat(["search_terms"])},
        accountReferrer_domainSource_typeSearch_termsFields = {"items": accountReferrer_domainSource_typeFields.items.concat(["search_terms"])},
        playerReferrer_domainSource_typeSearch_termsFields = {"items": playerReferrer_domainSource_typeFields.items.concat(["search_terms"])},
        videoReferrer_domainSource_typeSearch_termsFields = {"items": videoReferrer_domainSource_typeFields.items.concat(["search_terms"])},
        accountPlayerReferrer_domainSource_typeSearch_termsFields = {"items": accountPlayerReferrer_domainSource_typeFields.items.concat(["video", "video_name"])},
        accountVideoReferrer_domainSource_typeSearch_termsFields = {"items": accountVideoReferrer_domainSource_typeFields.items.concat(["video", "video_name"])},
        // functions to be defined"
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
        setDimensions,
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
        client_id = removeSpaces($client_id_display.val());
        client_secret = removeSpaces($client_secret_display.val());
        account = removeSpaces($accountID.val());
        // check for required fields
        if (!isDefined(account)) {
            window.alert("You must provide an account ID");
        }
        // set client_id and client_secret values
        if (isDefined(client_id)) {
            $client_id.val(client_id);
        }
        if (isDefined(client_secret)) {
            $client_secret.val(client_secret);
        }
        requestType = $APIrequestType.val();
        if (isDefined($dimensions.val())) {
            dimensions = $dimensions.val().join(",");
        } else {
            dimensions = null;
        }
        if (isDefined($to.val())) {
            to = $to.val();
        } else {
            to = null;
        }
        if (isDefined($from.val())) {
            from = $from.val();
        } else {
            from = null;
        }
        if (isDefined($player.val())) {
            player = $player.val().join(",");
        } else {
            player = null;
        }
        if (isDefined($video.val())) {
            video = $video.val().join(",");
        } else {
            video = null;
        }
        if (isDefined($destination_domain.val())) {
            destination_domain = $destination_domain.val().join(",");
        } else {
            destination_domain = null;
        }
        if (isDefined($referrer_domain.val())) {
            referrer_domain = $referrer_domain.val().join(",");
        } else {
            referrer_domain = null;
        }
        if (isDefined($search_terms.val())) {
            search_terms = encodeURI($search_terms.val().join(","));
        } else {
            search_terms = null;
        }
        if (isDefined($source_type.val())) {
            source_type = $source_type.val().join(",");
        } else {
            source_type = null;
        }
        if (isDefined($device_os.val())) {
            device_os = $device_os.val().join(",");
        } else {
            device_os = null;
        }
        if (isDefined($device_type.val())) {
            device_type = $device_type.val().join(",");
        } else {
            device_type = null;
        }
        if (isDefined($country.val())) {
            country = $country.val().join(",");
        } else {
            country = null;
        }
        if (isDefined($region.val())) {
            region = $region.val().join(",");
        } else {
            region = null;
        }
        if (isDefined($city.val())) {
            city = $city.val().join(",");
        } else {
            city = null;
        }
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
        if (isDefined($fields.val())) {
            fields = $fields.val().join(",");
        } else {
            fields = null;
        }
        // set up authorization
        authorization = "Bearer " + token;
        $authorizationDisplay.html(authorization);
        $authorization.attr("value", authorization);
    };
    // build request for input data
    buildDataForInputRequest = function () {
        var dataType = dataCalls[dataCallsIndex],
            url = serviceURL + "/account/" + account + "/report" + "?dimensions=" + dataType;
        if (isDefined(from)) {
            url += "&from=" + from;
        }
        if (isDefined(to)) {
            url += "&to=" + to;
        }
        thisRequestType = "data";
        switch (dataType) {
        case "player":
            url += "&fields=player,player_name" + "&sort=video_view" + "&limit=all";
            break;
        case "video":
            url += "&fields=video,video_name" + "&sort=video_view" + "&limit=all";
            break;
        case "destination_domain":
            url += "&fields=destination_domain" + "&sort=video_view" + "&limit=all";
            break;
        case "referrer_domain":
            url += "&fields=referrer_domain" + "&sort=video_view" + "&limit=all";
            break;
        case "search_terms":
            url += "&fields=search_terms" + "&sort=video_view" + "&limit=all";
            break;
        case "country":
            url += "&fields=country,country_name" + "&sort=video_view" + "&limit=all";
            break;
        case "region":
            url += "&fields=region,region_name" + "&sort=video_view" + "&limit=all";
            break;
        case "city":
            url += "&fields=city" + "&sort=video_view" + "&limit=all";
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
        requestURL = serviceURL + "/account/" + account + "/";
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
    };
    // submit request
    getData = function (requestURL, thisRequestType, dataType) {

        if (thisRequestType === "analytics") {
            // clear the results frame
            $responseFrame.html("Loading...");
        }
        $.ajax({
            url: requestURL,
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            success : function (data) {
                if (thisRequestType === "analytics") {
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
                } else if (thisRequestType === "data") {
                    if (isDefined(data.items)) {
                        switch (dataType) {
                        case "player":
                            template = Handlebars.compile(playerOptionTemplate);
                            $player.html(template(data));
                            break;
                        case "video":
                            template = Handlebars.compile(videoOptionTemplate);
                            $video.html(template(data));
                            break;
                        case "destination_domain":
                            template = Handlebars.compile(destination_domainOptionTemplate);
                            $destination_domain.html(template(data));
                            break;
                        case "referrer_domain":
                            template = Handlebars.compile(referrer_domainOptionTemplate);
                            $referrer_domain.html(template(data));
                            break;
                        case "search_terms":
                            template = Handlebars.compile(search_termsOptionTemplate);
                            $search_terms.html(template(data));
                            break;
                        case "country":
                            template = Handlebars.compile(countryOptionTemplate);
                            $country.html(template(data));
                            break;
                        case "region":
                            template = Handlebars.compile(regionOptionTemplate);
                            $region.html(template(data));
                            break;
                        case "city":
                            template = Handlebars.compile(cityOptionTemplate);
                            $city.html(template(data));
                            break;
                        default:
                            bclslog("Unknown dataType " + dataType);
                            break;
                        }
                        if (dataCallsIndex < (dataCalls.length - 1)) {
                            // get the next data set
                            dataCallsIndex++;
                            buildDataForInputRequest(dataCalls[dataCallsIndex]);
                        } else {
                            // reset dataCallsIndex
                            dataCallsIndex = 0;
                        }

                    }
                }
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, your request was not successful. Here is what the server sent back: " + errorThrown);
            }
        });
    };
    // error handler for invalid dimension combination
    onDimesionError = function (selectedDimensions) {
        window.alert("The combination of dimensions you selected - " +  selectedDimensions +  " - is not a valid combination. Please select a different combination. See the Analytics API Overview for a table of allowable combinations.");
    };
    // set the options for the fields and sort
    setFieldsSortOptions = function () {
        var vals = $dimensions.val(),
            has_account = false,
            has_day = false,
            has_player = false,
            has_video = false,
            has_country = false,
            has_city = false,
            has_region = false,
            has_referrer_domain = false,
            has_source_type = false,
            has_search_terms = false,
            has_device_type = false,
            has_device_os = false,
            has_destination_path = false,
            has_destination_domain = false;
        // set the template
        template = Handlebars.compile(fieldOptionsTemplate);
        // determine what values are in the array
        if ($.inArray("account", vals) > -1) {
            has_account = true;
        }
        if ($.inArray("day", vals) > -1) {
            has_day = true;
        }
        if ($.inArray("player", vals) > -1) {
            has_player = true;
        }
        if ($.inArray("video", vals) > -1) {
            has_video = true;
        }
        if ($.inArray("country", vals) > -1) {
            has_country = true;
        }
        if ($.inArray("city", vals) > -1) {
            has_city = true;
        }
        if ($.inArray("region", vals) > -1) {
            has_region = true;
        }
        if ($.inArray("referrer_domain", vals) > -1) {
            has_referrer_domain = true;
        }
        if ($.inArray("source_type", vals) > -1) {
            has_source_type = true;
        }
        if ($.inArray("search_terms", vals) > -1) {
            has_search_terms = true;
        }
        if ($.inArray("device_type", vals) > -1) {
            has_device_type = true;
        }
        if ($.inArray("device_os", vals) > -1) {
            has_device_os = true;
        }
        if ($.inArray("destination_domain", vals) > -1) {
            has_destination_domain = true;
        }
        if (has_day) {
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(dayFields));
            $sort.html(template(dayFields));
        } else if (has_account) { // account combinations
            if (has_player) {
                if (has_video) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountPlayerVideoFields));
                    $sort.html(template(accountPlayerVideoFields));
                } else if (has_referrer_domain) {
                    if (has_source_type) {
                        if (has_search_terms) {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountPlayerReferrer_domainSource_typeSearch_termsFields));
                            $sort.html(template(accountPlayerReferrer_domainSource_typeSearch_termsFields));
                        } else {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountPlayerReferrer_domainSource_typeFields));
                            $sort.html(template(accountPlayerReferrer_domainSource_typeFields));
                        }
                    } else if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountPlayerReferrer_domainSearch_termsFields));
                        $sort.html(template(accountPlayerReferrer_domainSearch_termsFields));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountPlayerReferrer_domainFields));
                        $sort.html(template(accountPlayerReferrer_domainFields));
                    }
                } else if (has_source_type) {
                    if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountPlayerSource_typeSearch_termsFields));
                        $sort.html(template(accountPlayerSource_typeSearch_termsFields));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountPlayerSource_typeFields));
                        $sort.html(template(accountPlayerSource_typeFields));
                    }
                } else if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountPlayerSearch_termsFields));
                    $sort.html(template(accountPlayerSearch_termsFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountPlayerFields));
                    $sort.html(template(accountPlayerFields));
                }
            } else if (has_video) {
                if (has_referrer_domain) {
                    if (has_source_type) {
                        if (has_search_terms) {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountVideoReferrer_domainSource_typeSearch_termsFields));
                            $sort.html(template(accountVideoReferrer_domainSource_typeSearch_termsFields));
                        } else {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountVideoReferrer_domainSource_typeFields));
                            $sort.html(template(accountVideoReferrer_domainSource_typeFields));
                        }
                    } else if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountVideoReferrer_domainSearch_termsFields));
                        $sort.html(template(accountVideoReferrer_domainSearch_termsFields));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountVideoReferrer_domainFields));
                        $sort.html(template(accountVideoReferrer_domainFields));
                    }
                } else if (has_source_type) {
                    if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountVideoSource_typeSearch_termsFields));
                        $sort.html(template(accountVideoSource_typeSearch_termsFields));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountVideoSource_typeFields));
                        $sort.html(template(accountVideoSource_typeFields));
                    }
                } else if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountVideoSearch_termsFields));
                    $sort.html(template(accountVideoSearch_termsFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountVideoFields));
                    $sort.html(template(accountVideoFields));
                }
            } else if (has_referrer_domain) {
                if (has_source_type) {
                    if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountReferrer_domainSource_typeSearch_termsFields));
                        $sort.html(template(accountReferrer_domainSource_typeSearch_termsFields));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountReferrer_domainSource_typeFields));
                        $sort.html(template(accountReferrer_domainSource_typeFields));
                    }
                } else if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountReferrer_domainSearch_termsFields));
                    $sort.html(template(accountReferrer_domainSearch_termsFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountReferrer_domainFields));
                    $sort.html(template(accountReferrer_domainFields));
                }
            } else if (has_source_type) {
                if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountSource_typeSearch_termsFields));
                    $sort.html(template(accountSource_typeSearch_termsFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountSource_typeFields));
                    $sort.html(template(accountSource_typeFields));
                }
            } else if (has_search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountSearch_termsFields));
                $sort.html(template(accountSearch_termsFields));
            } else if (has_device_type) {
                if (has_device_os) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountDevice_typeDevice_osFields));
                    $sort.html(template(accountDevice_typeDevice_osFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountDevice_typeFields));
                    $sort.html(template(accountDevice_typeFields));
                }
            } else if (has_device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountDevice_osFields));
                $sort.html(template(accountDevice_osFields));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountFields));
                $sort.html(template(accountFields));
            }
        } else if (has_player) { // player combinations
            if (has_video) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(playerVideoFields));
                $sort.html(template(playerVideoFields));
            } else if (has_referrer_domain) {
                if (has_source_type) {
                    if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(playerReferrer_domainSource_typeSearch_termsFields));
                        $sort.html(template(playerReferrer_domainSource_typeSearch_termsFields));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(playerReferrer_domainSource_typeFields));
                        $sort.html(template(playerReferrer_domainSource_typeFields));
                    }
                } else if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(playerReferrer_domainSearch_termsFields));
                    $sort.html(template(playerReferrer_domainSearch_termsFields));
                }
            } else if (has_source_type) {
                if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(playerSource_typeSearch_termsFields));
                    $sort.html(template(playerSource_typeSearch_termsFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(playerSource_typeFields));
                    $sort.html(template(playerSource_typeFields));
                }
            } else if (has_search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(playerSearch_termsFields));
                $sort.html(template(playerSearch_termsFields));
            } else if (has_device_type) {
                if (has_device_os) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(playerDevice_typeDevice_osFields));
                    $sort.html(template(playerDevice_typeDevice_osFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(playerDevice_typeFields));
                    $sort.html(template(playerDevice_typeFields));
                }
            } else if (has_device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(playerDevice_osFields));
                $sort.html(template(playerDevice_osFields));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(playerFields));
                $sort.html(template(playerFields));
            }
        } else if (has_video) { // video combinations
            if (has_referrer_domain) {
                if (has_source_type) {
                    if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(videoReferrer_domainSource_typeSearch_termsFields));
                        $sort.html(template(videoReferrer_domainSource_typeSearch_termsFields));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(videoReferrer_domainSource_typeFields));
                        $sort.html(template(videoReferrer_domainSource_typeFields));
                    }
                } else if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(videoReferrer_domainSearch_termsFields));
                    $sort.html(template(videoReferrer_domainSearch_termsFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(videoReferrer_domainFields));
                    $sort.html(template(videoReferrer_domainFields));
                }
            } else if (has_source_type) {
                if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(videoSource_typeSearch_termsFields));
                    $sort.html(template(videoSource_typeSearch_termsFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(videoSource_typeFields));
                    $sort.html(template(videoSource_typeFields));
                }
            } else if (has_search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(videoSearch_termsFields));
                $sort.html(template(videoSearch_termsFields));
            } else if (has_device_type) {
                if (has_device_os) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(videoDevice_typeDevice_osFields));
                    $sort.html(template(videoDevice_typeDevice_osFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(videoDevice_typeFields));
                    $sort.html(template(videoDevice_typeFields));
                }
            } else if (has_device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(videoDevice_osFields));
                $sort.html(template(videoDevice_osFields));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(videoFields));
                $sort.html(template(videoFields));
            }
        } else if (has_country) { // country combinations
            if (has_city) {
                if (has_region) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(countryCityRegionFields));
                    $sort.html(template(countryCityRegionFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(countryCityFields));
                    $sort.html(template(countryCityFields));
                }
            } else if (has_region) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(countryRegionFields));
                $sort.html(template(countryRegionFields));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(countryFields));
                $sort.html(template(countryFields));
            }
        } else if (has_city) { // city combinations
            if (has_region) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(cityRegionFields));
                $sort.html(template(cityRegionFields));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(cityFields));
                $sort.html(template(cityFields));
            }
        } else if (has_region) {
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(regionFields));
            $sort.html(template(regionFields));
        } else if (has_referrer_domain) { // referrer_domain combinations
            if (has_source_type) {
                if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(referrer_domainSource_typeSearch_termsFields));
                    $sort.html(template(referrer_domainSource_typeSearch_termsFields));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(referrer_domainSource_typeFields));
                    $sort.html(template(referrer_domainSource_typeFields));
                }
            } else if (has_search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(referrer_domainSearch_termsFields));
                $sort.html(template(referrer_domainSearch_termsFields));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(referrer_domainFields));
                $sort.html(template(referrer_domainFields));
            }
        } else if (has_source_type) { // source_type combinations
            if (has_search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(source_typeSearch_termsFields));
                $sort.html(template(source_typeSearch_termsFields));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(source_typeFields));
                $sort.html(template(source_typeFields));
            }
        } else if (has_search_terms) { // search_terms combinations
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(search_termsFields));
            $sort.html(template(search_termsFields));
        } else if (has_device_type) { // device_type combinations
            if (has_device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(device_typeDevice_osFields));
                $sort.html(template(device_typeDevice_osFields));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(device_typeFields));
                $sort.html(template(device_typeFields));
            }
        } else if (has_device_os) { // device_os combinations
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(device_osFields));
            $sort.html(template(device_osFields));
        } else if (has_destination_domain) { // destination_domain combinations
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(destination_domainFields));
                $sort.html(template(destination_domainFields));
        } else {
            onDimesionError(vals);
        }
        // refresh data input values
        buildRequest();
    };
    setDimensions = function () {
        if ($APIrequestType.val() === "report") {
            template = Handlebars.compile(dimensionOptionTemplate);
            $dimensions.html(template(dimensionsObj));
            $dimensions.children("option").filter(":first").attr("selected", "selected");
            $format.html(reportFormatOptions);
        } else {
            $dimensions.html(rollupDimensionOptions);
            $format.html(rollupFormatOptions);
        }
    };
    // init
    init = function () {
        // add date pickers to the date input fields
        fromPicker = new Pikaday({
            field: document.getElementById("from"),
            format: 'YYYY-MM-DD',
            onSelect: buildDataForInputRequest
        });
        toPicker = new Pikaday({
            field: document.getElementById("to"),
            format: 'YYYY-MM-DD',
            onSelect: buildDataForInputRequest
        });
        // set dimensions
        setDimensions();
        // get initial data for inputs
        getDataForInputs();
        // set event listeners
        $APIrequestType.on("change", setDimensions);
        // event listener for dimensions
        $dimensions.on("change", function () {
            setFieldsSortOptions();
            buildRequest();
        });
        // event listener for date range
        $date_range.on("change", buildDataForInputRequest);
        // event listener for acount and token change
        $accountID.on("change", function () {
            window.alert("Remember that if you change the account, you must change the token also!");
        });
        $token.on("change", function () {
           account = removeSpaces($accountID.val());
           buildDataForInputRequest();
           buildRequest();
        });
        // set listener for form fields
        APIrequestInputs.on("change", buildRequest);
        // send request
        $submitButton.on("click", function () {
            thisRequestType = "analytics";
            getData(APIrequest.value, "analytics");
        });
        // populate data input selectors
        buildDataForInputRequest(dataCalls[dataCallsIndex]);
        // set the initial options for fields and sort
        setFieldsSortOptions();
        // generate initial request
        buildRequest();
    };
    // set things up
    init();
    return {
        buildRequest: buildRequest,
        onGetVideos: onGetVideos
    };
})($, window, document, Pikaday, Handlebars, BCLSformatJSON);
