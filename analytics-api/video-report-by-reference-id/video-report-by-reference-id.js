var BCLS = (function ($, window, AnyTime, BCLSformatJSON) {
    "use strict";
    var // aapi stuff
        proxyURL = "https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.php";
        $serviceURL = $("#serviceURL"),
        $accountID = $("#accountID"),
        account_id = "20318290001",
        $client_id = $("#client_id"),
        client_id = "5746d707-db97-42b2-b4f0-3db890429ef0",
        $client_secret = $("#client_secret"),
        client_secret = "JBdg3PLg0NarokKjIihxa_05i-YVyvhICWlQ5NXMSlUX9H9tzYqQ8FE-4mMfhAWOMs0KxUHyUN3anzkZSr3Bvg",
        $requestType = $("#requestType"),
        $startDate = $("#startDate"),
        $startTime = $("#startTime"),
        $endDate = $("#endDate"),
        $endTime = $("#endTime"),
        $reference_id = $("#reference_id"),
        reference_id = "Gallery 1, Gallery 2, Gallery 3",
        $request = $("#request"),
        $authorization = $("#authorization"),
        $authorizationDisplay = $("#authorizationDisplay"),
        $submitButton = $("#submitButton"),
        $selectData = $("#selectData"),
        $required = $(".required"),
        $requestInputs = $(".aapi-request"),
        $directVideoInput = $("#directVideoInput"),
        $responseFrame = $("#responseFrame"),
        $this,
        requestURL = "",
        endDate = "",
        startDate = "",
        i,
        len,
        // functions to be defined
        removeSpaces,
        buildRequest,
        isDefined,
        getData,
        bclslog;

    /**
     * Logging function - safe for IE
     * @param  {string} context description of the data
     * @param  {*} message the data to be logged by the console
     * @return {}
     */
    bclslog = function (context, message) {
        if (window["console"] && console["log"]) {
          console.log(context, message);
        };
        return;
    };

    // more robust test for strings "not defined"
    isDefined =  function (v) {
        if (v !== "" && v !== null && v !== "undefined" && v !== undefined) {
            return true;
        } else { return false; }
    };

    };
    removeSpaces = function (str) {
        if (isDefined(str)) {
            str = str.replace(", ", ",");
            str = encodeURI(str);
            return str;
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
        // build the request
        requestURL = $serviceURL.val();
        requestURL += "/accounts/" + removeSpaces($accountID.val()) + "/report/?dimensions=video";
        if (isDefined($dimension.val())) {
            requestURL += "," + $dimension.val() + "&";
        } else {
            requestURL += "&";
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
        requestURL += "&";
        $request.html(requestURL);
        $request.attr("value", requestURL);
    };
    // submit request
    getData = function () {
        var options = {};
        options.client_id = (isDefined($client_id.val())) ? $client_id.val() : client_id;
        options.client_secret = (isDefined($client_secret.val())) ? $client_secret.val() : client_secret;
        options.url = $request.val();
        options.requestType = "GET";
        options.requestBody = null;
        bclslog("options", options);
        // wait message
        $responseFrame.html("Loading...");
        $.ajax({
            url: proxyURL,
            headers: {
                Authorization : $authorization.attr("value")
            },
            success : function (data) {
                try {
                   var data = JSON.parse(data);
                } catch (e) {
                   alert('invalid json');
                }
                $responseFrame.html(BCLSformatJSON.formatJSON(data));
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, your request was not successful. Here's what the server sent back: " + errorThrown);
            }
        });
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
    // set listener for form fields
    $requestInputs.on("change", buildRequest);
    // send request
    $submitButton.on("click", getData);
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
})($, window, AnyTime, BCLSformatJSON);