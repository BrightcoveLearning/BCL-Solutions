var BCLS = (function ($, window, BCMAPI, Handlebars, BCLSformatJSON) {
    "use strict";
    var // media api stuff
        $mapitoken = $("#mapitoken"),
        $readApiLocation = $("#readApiLocation"),
        videoData = {},
        itemsArray = [],
        videoCount = 0,
        pageNumber = 0,
        params = {},
        // aapi stuff
        proxyURL = "https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.php",
        useMyAccount = document.getElementById("useMyAccount"),
        basicInfo = document.getElementById("basicInfo"),
        $accountID = $("#accountID"),
        account_id = "20318290001",
        $client_id = $("#client_id"),
        $client_secret = $("#client_secret"),
        client_id = "742d6440-58d1-49ed-b2fb-f60d33bf02ae",
        client_secret = "xs3vuzzKPz5fWHInsON26SXOL54X1GObFW70KylVqdVuIHdkqwqlCs9yVSCRF3i5u_0NcNb7MrzntCLaveZmeQ",
        $limitText = $("#limitText"),
        $offset = $("#offset"),
        $offsetText = $("#offsetText"),
        $fromMonths = $("#fromMonths"),
        $excludeMonths = $("#excludeMonths"),
        $includeVideos = $("#includeVideos"),
        $request = $("#request"),
        $authorization = $("#authorization"),
        $authorizationDisplay = $("#authorizationDisplay"),
        $submitButton = $("#submitButton"),
        $csvButton = $("#csvButton"),
        $selectData = $("#selectData"),
        $required = $(".required"),
        $requestInputs = $(".aapi-request"),
        $responseFrame = $("#responseFrame"),
        mMonth = 2592000000,
        now = new Date(),
        from,
        oldestPubDate = now.valueOf() - ($excludeMonths.val() * mMonth),
        $this,
        requestTrimmed = false,
        lastChar = "",
        requestURL = "",
        authorization = "",
        i,
        len,
        minViews = $includeVideos.val(),
        // functions to be defined
        getVideos,
        onGetVideos,
        trimRequest,
        removeSpaces,
        buildRequest,
        isDefined,
        getData,
        bclslog,
        jsonToCSV;
    // implement array forEach method in older browsers
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn, scope) {
            for (i = 0, len = this.length; i < len; ++i) {
                fn.call(scope || this, this[i], i, this);
            }
        };
    }
    /*************************
    logging
    *************************/
    bclslog = function (context, message) {
        if (window["console"] && console["log"]) {
          console.log(context, message);
        };
    };

    // implement array indexOf method for older browsers
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var pivot = (fromIndex) ? fromIndex : 0,
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
    isDefined = function (v) {
        if (v === "" || v === null || v === undefined) {
            return false
        }
        return true;
    };
    // get videos via MAPI
    getVideos = function () {
        BCMAPI.url = isDefined($readApiLocation.val()) ? $readApiLocation.val() : 'http://api.brightcove.com/services/library';
        BCMAPI.callback = "BCLS.onGetVideos";
        BCMAPI.token = isDefined($mapitoken.val()) ? $mapitoken.val() : 'v87kWelIdjUwVm7_Rzv09k-KqtLz-ty8ONbMxVYAI7-Q0eOilegqqg..';
        params.page_number = pageNumber;
        params.page_size = 100;
        params.sort_by = "PUBLISH_DATE:ASC";
        params.video_fields = "id,referenceId,name,publishedDate";
        params.get_item_count = true;
        BCMAPI.search(params);

    };
    // handler for MAPI call
    onGetVideos = function (JSONdata) {
        var itemsMax, item;
        bclslog("jsonData", JSONdata);
        if (isDefined(JSONdata.items)) {
            itemsMax = JSONdata.items.length;
        } else {
            itemsMax = 0;
        }
        videoCount += itemsMax;
        for (i = 0; i < itemsMax; i++) {
            item = JSONdata.items[i];
            item.publishedDate = parseInt(item.publishedDate);
            videoData[item.id] = item;
        }
        if (videoCount < JSONdata.total_count) {
            pageNumber++;
            getVideos();
        } else {
            $limitText.val(videoCount);
            $submitButton.html("Generate Report");
            $submitButton.on("click", getData);
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
        // build the request
        account_id = (isDefined($accountID.val())) ? $accountID.val() : account_id;

        requestURL = "https://analytics.api.brightcove.com/v1";
        requestURL += "/data?accounts=" + account_id + "&dimensions=video";
        requestURL += "&from=" + from;
        // check for limit and offset
        if ($limitText.val() !== "") {
            requestURL += "&limit=" + removeSpaces($limitText.val());
        }
        if ($offsetText.val() !== "") {
            requestURL += "&offset=" + removeSpaces($offsetText.val());
        } else if ($offset.val() !== "") {
            requestURL += "offset=" + $offset.val();
        }
        // add fields
        requestURL += "&fields=video,engagement_score,video_view,video_percent_viewed";
        // strip trailing ? or & and replace &&s
        $request.html(requestURL);
        $request.attr("value", requestURL);
    };
    // submit request
    getData = function () {
        var itemsMax, item, video, options = {};
        // clear the results frame
        $responseFrame.html("Loading...");
        options.client_id = (isDefined($client_id.val())) ? $client_id.val() : client_id;
        options.client_secret = (isDefined($client_secret.val())) ? $client_secret.val() : client_secret;
        options.url = $request.val();
        options.requestType = "GET";
        options.requestBody = null;
        bclslog("options", options);
        $.ajax({
            url: proxyURL,
            type: "POST",
            data: options,
            success : function (data) {
                try {
                  var data = JSON.parse(data);
                } catch (e) {
                  alert('invalid json');
                }
                minViews = $includeVideos.val();
                itemsMax = data.items.length;
                // add analytics data to video data
                for (i = 0; i < itemsMax; i++) {
                    item = data.items[i];
                    if (isDefined(videoData[parseInt(item.video)])) {
                        videoData[item.video].engagement_score = item.engagement_score;
                        videoData[item.video].video_view = item.video_view;
                        videoData[item.video].average_percent_viewed = item.video_percent_viewed / item.video_view;
                    }
                }
                // convert it to a simple array to make conversion to CSV easier
                for (video in videoData) {
                    itemsArray.push(videoData[video]);
                }

                itemsMax = itemsArray.length;
                // assume videos not returned in analytics data had 0 views
                for (i = 0; i < itemsMax; i++) {
                    video = itemsArray[i];
                    if (!video.hasOwnProperty("video_view")) {
                        video.engagement_score = 0;
                        video.video_view = 0;
                        video.average_percent_viewed = 0;
                    }
                }
                // remove videos above the views minimum
                i = itemsArray.length;
                while (i--) {
                    video = itemsArray[i];
                    if (video.video_view > minViews) {
                        itemsArray.splice(i, 1);
                    }
                }
                // remove items if the published date is too new
                i = itemsArray.length;
                while (i--) {
                    video = itemsArray[i];
                    if (video.publishedDate > oldestPubDate) {
                        itemsArray.splice(i, 1);
                    }
                }
                $responseFrame.html(BCLSformatJSON.formatJSON(itemsArray));
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, your request was not successful. Here's what the server sent back: " + errorThrown);
            }
        });
    };
    // convert data to CSV
    jsonToCSV = function () {
        // templates are built dynamically to allow for additional fields added later
        var headersRow = "", rowTemplate = "{{#items}}", property, template, results, str = "", obj = {};
        obj.items = itemsArray;
        $responseFrame.html("Loading CSV data...");
        for (property in obj.items[0]) {
            headersRow += "\"" + property + "\",";
            rowTemplate += "\"{{" + property + "}}\",";
        }
        headersRow += " \r";
        rowTemplate += "\r{{/items}}";
        str = headersRow;
        template = Handlebars.compile(rowTemplate);
        results = template(obj);
        str += results;
        $responseFrame.html(str);
    };

    // set event listeners
    useMyAccount.addEventListener("click", function () {
        if (basicInfo.className === "height-zero") {
            basicInfo.className = "height-auto";
            useMyAccount.innerHTML = "Use Sample Account";
        } else {
            basicInfo.className = "height-zero";
            useMyAccount.innerHTML = "Use My Account Instead";
        }
    });
    $mapitoken.on("change", function () {
        videoData = {};
        getVideos();
        $submitButton.html("Getting video data...please wait...");
        $submitButton.off("click", getData);
    });
    // listener for videos request
    $requestInputs.on("change", buildRequest);
    // listener for change in from months
    $fromMonths.on("change", function () {
        from = now.valueOf() - ($fromMonths.val() * mMonth);
        buildRequest();
    });
    // listener for change in exclude months
    $excludeMonths.on("change", function () {
        oldestPubDate = now.valueOf() - ($excludeMonths.val() * mMonth);
    });
    // listener for change in minimum views threshhold
    $includeVideos.on("change", function () {
        minViews = $includeVideos.val();
    });
    // send request
    $submitButton.on("click", getData);
    // convert to csv
    $csvButton.on("click", jsonToCSV);
    // select all the data
    $selectData.on("click", function () {
        document.getElementById("responseFrame").select();
    });
    // set initial value of from
    from = now.valueOf() - mMonth;
    // make the Media API calls
    getVideos();
    // generate initial request
    buildRequest();
    return {
        buildRequest: buildRequest,
        onGetVideos: onGetVideos
    };
})($, window, BCMAPI, Handlebars, BCLSformatJSON);
