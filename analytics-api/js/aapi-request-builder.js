var BCLS = (function ($, window, document, Pikaday, Handlebars, BCLSformatJSON, aapi_model) {
    "use strict";
    var // templates for data input options
        dimensionOptionTemplate = "{{#dimensions}}<option>{{this}}</option>{{/dimensions}}",
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
        $aapi_token = $("#aapi_token"),
        $client_secret_display = $("#client_secret_display"),
        $client_id_display = $("#client_id_display"),
        $client_id = $("#client_id"),
        $client_secret = $("#client_secret"),
        client_id,
        client_secret,
        default_client_id = "5746d707-db97-42b2-b4f0-3db890429ef0",
        default_client_secret = "JBdg3PLg0NarokKjIihxa_05i-YVyvhICWlQ5NXMSlUX9H9tzYqQ8FE-4mMfhAWOMs0KxUHyUN3anzkZSr3Bvg",
        $APIrequestType = $("#aapiRequestType"),
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
        $prefillButton = $("#prefillButton"),
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
        requestData = {},
        // options for different report types
        rollupDimensionOptions = "<option value=\"account\">account</option>",
        rollupFormatOptions = "<option value=\"json\">json</option>",
        reportFormatOptions = "<option value=\"json\">json</option><option value=\"csv\">csv</option><option value=\"xlsx\">xlxs</option>",
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
        setDimensions,
        onDimesionError,
        dedupe,
        combineArrays,
        init;
        //  "search_terms",
    // safe console log
    bclslog = function (c, m) {
        if (isDefined(window.console)) {
            window.console.log(c, m);
        }
    };
    // more robust test for strings "not defined"
    isDefined = function (v) {
        if (v !== "" && v !== null && v !== "undefined" && v !== undefined) {
            return true;
        }
        return false;
    };
    // dedupe simple array
    dedupe = function (arr) {
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
    /*
     * combine and dedupe multiple arrays
     * arguments: arr (an array of the arrays you want to combine)
     * dependencies: dedupe()
     */
    combineArrays = function (arr) {
        var i,
            iMax = arr.length,
            out = {};
        out.items = [];
        for (i = 0; i < iMax; i++) {
            out.items = out.items.concat(arr[i].items);
        }
        out.items = dedupe(out.items);
        return out;
    };
    // get input field values
    getDataForInputs = function () {
        serviceURL = $serviceURL.val();
        account = removeSpaces($accountID.val());
        // check for required fields
        if (!isDefined(account)) {
            window.alert("You must provide an account ID");
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
    };
    // build request for input data
    buildDataForInputRequest = function () {
        var dataType = dataCalls[dataCallsIndex],
            url = serviceURL + "/accounts/" + account + "/report" + "?dimensions=" + dataType;
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
        requestURL = serviceURL + "/accounts/" + account + "/";
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
        requestData.url = requestURL;
    };
    // submit request
    getData = function (requestURL, thisRequestType, dataType) {
        bclslog("requestURL", requestURL);
        if (thisRequestType === "analytics") {
            // clear the results frame
            $responseFrame.html("Loading...");
        }
        requestData.url = requestURL;
        requestData.client_id = (isDefined($client_id_display.val())) ? $client_id_display.val() : default_client_id;
        requestData.client_secret = (isDefined($client_secret_display.val())) ? $client_secret_display.val() : default_client_secret;
        requestData.aapi_token = (isDefined($aapi_token.val())) ? $aapi_token.val() : null;
        requestData.requestType = "GET";
        bclslog("requestData", requestData);
        $.ajax({
            url: "http://solutions.brightcove.com:8002",
            type: "POST",
            data: requestData,
            success: function (data) {
                // bclslog("data from proxy", data);
                console.log("data", data);
                if ($format.val() === "json") {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (e) {
                        if (data.charAt(data.length - 1) === '"') {
                            data += '}';
                        } else {
                            data += '"}';
                        }
                        data = JSON.parse(data);
                    }
                }
                if (thisRequestType === "analytics") {
                    switch (format) {
                    case "json":
                        data = JSON.stringify(data, null, "    ");
                        $responseFrame.html(data);
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
                    bclslog("raw data", data);
                    // bclslog("parsed data", data);
                    // bclslog("data items defined: ", data.items);
                    if (isDefined(data.items)) {
                        switch (dataType) {
                        case "player":
                            // bclslog("player", data);
                            template = Handlebars.compile(playerOptionTemplate);
                            $player.html(template(data));
                            break;
                        case "video":
                            // bclslog("video", data);
                            template = Handlebars.compile(videoOptionTemplate);
                            $video.html(template(data));
                            break;
                        case "destination_domain":
                            // bclslog("destination_domain", data);
                            template = Handlebars.compile(destination_domainOptionTemplate);
                            $destination_domain.html(template(data));
                            break;
                        case "referrer_domain":
                            // bclslog("referrer_domain", data);
                            template = Handlebars.compile(referrer_domainOptionTemplate);
                            $referrer_domain.html(template(data));
                            break;
                        case "search_terms":
                            // bclslog("search_terms", data);
                            template = Handlebars.compile(search_termsOptionTemplate);
                            $search_terms.html(template(data));
                            break;
                        case "country":
                            // bclslog("country", data);
                            template = Handlebars.compile(countryOptionTemplate);
                            $country.html(template(data));
                            break;
                        case "region":
                            // bclslog("region", data);
                            template = Handlebars.compile(regionOptionTemplate);
                            $region.html(template(data));
                            break;
                        case "city":
                            // bclslog("city", data);
                            template = Handlebars.compile(cityOptionTemplate);
                            $city.html(template(data));
                            break;
                        default:
                            bclslog("Unknown dataType " + dataType);
                            break;
                        }
                        bclslog("dataCallsIndex", dataCallsIndex);
                        if (dataCallsIndex < (dataCalls.length - 1)) {
                            // get the next data set

                            dataCallsIndex++;
                            buildDataForInputRequest();
                        } else {
                            // reset dataCallsIndex
                            dataCallsIndex = 0;
                        }
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                bclslog("XMLHttpRequest", XMLHttpRequest);
                bclslog("textStatus", textStatus);
                $responseFrame.html("Sorry, your request was not successful. Here is what the server sent back: " + errorThrown);
                bclslog("dataCallsIndex", dataCallsIndex);
            }
        });
    };
    // error handler for invalid dimension combination
    onDimesionError = function (selectedDimensions) {
        window.alert("The combination of dimensions you selected - " + selectedDimensions + " - is not a valid combination. Please select a different combination. See the Analytics API Overview for a table of allowable combinations.");
    };
    // set the options for the fields and sort
    setFieldsSortOptions = function () {
        bclslog("setting fields options");
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
        if ($.inArray("destination_path", vals) > -1) {
            has_destination_path = true;
        }
        if (has_day) {
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.dayFields));
            $sort.html(template(aapi_model.dayFields));
        } else if (has_account) { // account combinations
            if (has_player) {
                if (has_video) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields,aapi_model.playerFields,aapi_model.videoFields])));
                    $sort.html(template(combineArrays([aapi_model.accountFields,aapi_model.playerFields,aapi_model.videoFields])));
                } else if (has_referrer_domain) {
                    if (has_source_type) {
                        if (has_search_terms) {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                            $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                        } else {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                            $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                        }
                    } else if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
                        $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.referrer_domainFields])));
                        $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.referrer_domainFields])));
                    }
                } else if (has_source_type) {
                    if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                        $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.source_typeFields])));
                        $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.source_typeFields])));
                    }
                } else if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.search_termsFields])));
                    $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.playerFields, aapi_model.search_termsFields])));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.playerFields])));
                    $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.playerFields])));
                }
            } else if (has_video) {
                if (has_referrer_domain) {
                    if (has_source_type) {
                        if (has_search_terms) {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                            $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                        } else {
                            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                            $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                        }
                    } else if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
                        $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.referrer_domainFields])));
                        $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.referrer_domainFields])));
                    }
                } else if (has_source_type) {
                    if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                        $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.source_typeFields])));
                        $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.source_typeFields])));
                    }
                } else if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.search_termsFields])));
                    $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.videoFields, aapi_model.search_termsFields])));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(accountVideoFields));
                    $sort.html(template(accountVideoFields));
                }
            } else if (has_referrer_domain) {
                if (has_source_type) {
                    if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                        $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                        $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                    }
                } else if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
                    $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.referrer_domainFields])));
                    $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.referrer_domainFields])));
                }
            } else if (has_source_type) {
                if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                    $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.source_typeFields])));
                    $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.source_typeFields])));
                }
            } else if (has_search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.search_termsFields])));
                $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.search_termsFields])));
            } else if (has_device_type) {
                if (has_device_os) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.device_typeFields, aapi_model.device_osFields])));
                    $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.device_typeFields, aapi_model.device_osFields])));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.device_typeFields])));
                    $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.device_typeFields])));
                }
            } else if (has_device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.accountFields, aapi_model.device_osFields])));
                $sort.html(template(combineArrays([aapi_model.accountFields, aapi_model.device_osFields])));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.accountFields));
                $sort.html(template(aapi_model.accountFields));
            }
        } else if (has_player) { // player combinations
            if (has_video) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.playerFields, aapi_model.videoFields])));
                $sort.html(template(combineArrays([aapi_model.playerFields, aapi_model.videoFields])));
            } else if (has_referrer_domain) {
                if (has_source_type) {
                    if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                        $sort.html(template(combineArrays([aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                        $sort.html(template(combineArrays([aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                    }
                } else if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
                    $sort.html(template(combineArrays([aapi_model.playerFields, aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
                }
            } else if (has_source_type) {
                if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.playerFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                    $sort.html(template(combineArrays([aapi_model.playerFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.playerFields, aapi_model.source_typeFields])));
                    $sort.html(template(combineArrays([aapi_model.playerFields, aapi_model.source_typeFields])));
                }
            } else if (has_search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.playerFields, aapi_model.search_termsFields])));
                $sort.html(template(combineArrays([aapi_model.playerFields, aapi_model.search_termsFields])));
            } else if (has_device_type) {
                if (has_device_os) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.playerFields, aapi_model.device_typeFields, aapi_model.device_osFields])));
                    $sort.html(template(combineArrays([aapi_model.playerFields, aapi_model.device_typeFields, aapi_model.device_osFields])));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.playerFields, aapi_model.device_typeFields])));
                    $sort.html(template(combineArrays([aapi_model.playerFields, aapi_model.device_typeFields])));
                }
            } else if (has_device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.playerFields, aapi_model.device_osFields])));
                $sort.html(template(combineArrays([aapi_model.playerFields, aapi_model.device_osFields])));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.playerFields));
                $sort.html(template(aapi_model.playerFields));
            }
        } else if (has_video) { // video combinations
            if (has_referrer_domain) {
                if (has_source_type) {
                    if (has_search_terms) {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                        $sort.html(template(combineArrays([aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                    } else {
                        $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                        $sort.html(template(combineArrays([aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                    }
                } else if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
                    $sort.html(template(combineArrays([aapi_model.videoFields, aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.videoFields, aapi_model.videoReferrer_domainFields])));
                    $sort.html(template(combineArrays([aapi_model.videoFields, aapi_model.videoReferrer_domainFields])));
                }
            } else if (has_source_type) {
                if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.videoFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                    $sort.html(combineArrays([aapi_model.videoFields, aapi_model.source_typeFields, aapi_model.search_termsFields]));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.videoFields, aapi_model.source_typeFields])));
                    $sort.html(template(combineArrays([aapi_model.videoFields, aapi_model.source_typeFields])));
                }
            } else if (has_search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.videoFields, aapi_model.search_termsFields])));
                $sort.html(template(combineArrays([aapi_model.videoFields, aapi_model.search_termsFields])));
            } else if (has_device_type) {
                if (has_device_os) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.videoFields, aapi_model.device_typeFields, aapi_model.device_osFields])));
                    $sort.html(template(combineArrays([aapi_model.videoFields, aapi_model.device_typeFields, aapi_model.device_osFields])));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.videoFields, aapi_model.device_typeFields])));
                    $sort.html(template(combineArrays([aapi_model.videoFields, aapi_model.device_typeFields])));
                }
            } else if (has_device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.videoFields, aapi_model.device_osFields])));
                $sort.html(template(combineArrays([aapi_model.videoFields, aapi_model.device_osFields])));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.videoFields));
                $sort.html(template(aapi_model.videoFields));
            }
        } else if (has_country) { // country combinations
            if (has_city) {
                if (has_region) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.countryFields, aapi_model.cityFields, aapi_model.regionFields])));
                    $sort.html(template(combineArrays([aapi_model.countryFields, aapi_model.cityFields, aapi_model.regionFields])));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.countryFields, aapi_model.cityFields])));
                    $sort.html(template(combineArrays([aapi_model.countryFields, aapi_model.cityFields])));
                }
            } else if (has_region) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.countryFields, aapi_model.regionFields])));
                $sort.html(template(combineArrays([aapi_model.countryFields, aapi_model.regionFields])));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.countryFields));
                $sort.html(template(aapi_model.countryFields));
            }
        } else if (has_city) { // city combinations
            if (has_region) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.cityFields, aapi_model.regionFields])));
                $sort.html(template(combineArrays([aapi_model.cityFields, aapi_model.regionFields])));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.cityFields));
                $sort.html(template(aapi_model.cityFields));
            }
        } else if (has_region) {
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.regionFields));
            $sort.html(template(aapi_model.regionFields));
        } else if (has_referrer_domain) { // referrer_domain combinations
            if (has_source_type) {
                if (has_search_terms) {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                    $sort.html(template(combineArrays([aapi_model.referrer_domainFields, aapi_model.source_typeFields, aapi_model.search_termsFields])));
                } else {
                    $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                    $sort.html(template(combineArrays([aapi_model.referrer_domainFields, aapi_model.source_typeFields])));
                }
            } else if (has_search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
                $sort.html(template(combineArrays([aapi_model.referrer_domainFields, aapi_model.search_termsFields])));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.referrer_domainFields));
                $sort.html(template(aapi_model.referrer_domainFields));
            }
        } else if (has_source_type) { // source_type combinations
            if (has_search_terms) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.source_typeFields, aapi_model.search_termsFields])));
                $sort.html(template(combineArrays([aapi_model.source_typeFields, aapi_model.search_termsFields])));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.source_typeFields));
                $sort.html(template(aapi_model.source_typeFields));
            }
        } else if (has_search_terms) { // search_terms combinations
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.search_termsFields));
            $sort.html(template(aapi_model.search_termsFields));
        } else if (has_device_type) { // device_type combinations
            if (has_device_os) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.device_typeFields, aapi_model.device_osFields])));
                $sort.html(template(combineArrays([aapi_model.device_typeFields, aapi_model.device_osFields])));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.device_typeFields));
                $sort.html(template(aapi_model.device_typeFields));
            }
        } else if (has_device_os) { // device_os combinations
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.device_osFields));
            $sort.html(template(aapi_model.device_osFields));
        } else if (has_destination_domain) { // destination_domain combinations
            if (has_destination_path) {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(combineArrays([aapi_model.destination_domainFields, aapi_model.destination_pathFields])));
                $sort.html(template(combineArrays([aapi_model.destination_domainFields, aapi_model.destination_pathFields])));
            } else {
                $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.destination_domainFields));
                $sort.html(template(aapi_model.destination_domainFields));
            }
        } else if (has_destination_path) {
            $fields.html("<option value=\"all\" selected=\"true\">all</option>" + template(aapi_model.destination_pathFields));
            $sort.html(template(aapi_model.destination_pathFields));
        } else {
            onDimesionError(vals);
        }
        // refresh data input values
        buildRequest();
    };
    setDimensions = function () {
        if ($APIrequestType.val() === "report") {
            template = Handlebars.compile(dimensionOptionTemplate);
            $dimensions.html(template(aapi_model));
            $dimensions.children("option").filter(":first").attr("selected", "selected");
            $format.html(reportFormatOptions);
        } else {
            $dimensions.html(rollupDimensionOptions);
            $format.html(rollupFormatOptions);
        }
    };
    // init
    init = function () {
        // initialize requestData object
        requestData.client_id = (isDefined($client_id_display.val())) ? $client_id_display.val() : "4584b1f4-f2fe-479d-aa49-6148568fef50";
        requestData.client_secret = (isDefined($client_secret_display.val())) ? $client_secret_display.val() : "gwk6d9gJ7oHwk7DMF3I6k4fxKn2n0qG3oIou0TPq4tATG24OrGPeJO7MUlyWgzFx2fANHU1kiBnwrM2gyntk7w";
        requestData.requestType = "GET";
        requestData.account = $accountID.val();
        requestData.url = APIrequest.value;
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
            account = removeSpaces($accountID.val());
            requestData.account = account;
        });
        $aapi_token.on("change", function () {
            requestData.aapi_token = $aapi_token.val();
        });
        $client_id_display.on("change", function () {
            requestData.client_id = $client_id_display.val();
        });
        $client_secret_display.on("change", function () {
            account = removeSpaces($accountID.val());
            requestData.client_secret = $client_id_display.val();
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
        $prefillButton.on("click", function () {
            buildDataForInputRequest();
            $prefillButton.html("Getting data...please wait");
        });
        // populate data input selectors
        bclslog("dataCalls.length", dataCalls.length);

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
})($, window, document, Pikaday, Handlebars, BCLSformatJSON, aapi_model);
