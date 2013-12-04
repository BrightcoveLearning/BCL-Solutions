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
        $serviceURL = $("#serviceURL"),
        $accountID = $("#accountID"),
        $token = $("#token"),
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
    isDefined =  function (v) {
        if (v !== "" && v !== null && v !== undefined) {
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
        params.video_fields = "id,referenceId,name,publishedDate";
        params.get_item_count = true;
        BCMAPI.search(params);

    };
    // handler for MAPI call
    onGetVideos = function (JSONdata) {
        var itemsMax, item;
        itemsMax = JSONdata.items.length;
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
        requestURL += "/account/" + removeSpaces($accountID.val()) + "/report/?dimensions=video&";
        requestURL += "from=" + from + "&";
        // check for limit and offset
        if ($limitText.val() !== "") {
            requestURL += "limit=" + removeSpaces($limitText.val()) + "&";
        }
        if ($offsetText.val() !== "") {
            requestURL += "offset=" + removeSpaces($offsetText.val()) + "&";
        } else if ($offset.val() !== "") {
            requestURL += "offset=" + $offset.val() + "&";
        }
        // add fields
        requestURL += "fields=video,engagement_score,video_view,video_percent_viewed";
        // strip trailing ? or & and replace &&s
        trimRequest();
        $request.html(requestURL);
        $authorizationDisplay.html(authorization);
        $request.attr("value", requestURL);
        $authorization.attr("value", authorization);
    };
    // submit request
    getData = function () {
        var itemsMax, item, video;
        // clear the results frame
        $responseFrame.html("Loading...");
        $.ajax({
            url: $request.attr("value"),
            headers: {
                Authorization : $authorization.attr("value")
            },
            success : function (data) {
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
    $mapitoken.on("change", function () {
        getVideos();
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