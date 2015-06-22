var BCLS = (function ($, window, BCLSformatJSON) {
    "use strict";
	  var proxyURL = "https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.php",
        $serviceURL = $("#serviceURL"),
        $accountID = $("#account_id"),
        $client_id = $("#client_id"),
        $client_secret = $("#client_secret"),
		$playerID = $("#player_id"),
        $requestType = $("#requestType"),
        $request = $("#request"),
		$request2 = $("#request2"),
        $submitButton = $("#submitButton"),
        $required = $(".required"),
        $requestInputs = $(".papi-request"),
        $responseFrame = $("#responseFrame"),
        $this,
        requestBase = "",
		requestURL = "",
		requestURL2 = "",
        endDate = "",
        startDate = "",
        // functions
        removeSpaces,
        buildRequest,
        isDefined,
        patchPlayer,
		publishPlayer,
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

    // remove space after comma and URI encode
    removeSpaces = function (str) {
        if (isDefined(str)) {
            str = str.replace(", ", ",");
            str = encodeURI(str);
            return str;
        }
    };

    // construct the request
    buildRequest = function () {
		var account_id = $accountID.val(),
			player_id = $playerID.val();
        // build the request for the PATCH
        requestBase = $serviceURL.val();
        requestBase += "/accounts/" + account_id + "/players/" + player_id;
		requestURL = requestBase + "/configuration";
        $request.html(requestURL);
        $request.attr("value", requestURL);
		
		// build the request for the Publish
		requestURL2 = requestBase + "/publish";
        $request2.html(requestURL2);
        $request2.attr("value", requestURL2);
    };
    // submit request
    patchPlayer = function () {
        var options = {};
		options.client_id = $client_id.val();
        options.client_secret = $client_secret.val();
        options.url = $request.val();
        options.requestType = "PATCH";
        options.requestBody = '{"playlist":true}';
        bclslog("options", options);
        // wait message
        $responseFrame.html("Loading...");
        $.ajax({
            url: proxyURL,
            type: "POST",
            data: options,
            success : function (data) {
                try {
                    var data = JSON.parse(data);
										publishPlayer();
								} catch (e) {
										$responseFrame.html("invalid json");
										alert('invalid json');
                }
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, the PATCH request to update the player was not successful. Here's what the server sent back: " + errorThrown);
            }
        });
    };
	
	// submit request
    publishPlayer = function () {
        var options = {};
        options.client_id = (isDefined($client_id.val())) ? $client_id.val() : client_id;
        options.client_secret = (isDefined($client_secret.val())) ? $client_secret.val() : client_secret;
        options.url = $request2.val();
        options.requestType = "POST";
        options.requestBody = null;
        bclslog("options", options);
        // wait message
        $responseFrame.html("Loading...");
        $.ajax({
            url: proxyURL,
            type: "POST",
            data: options,
            success : function (data) {
                try {
                   var data = JSON.parse(data);	
                } catch (e) {
										$responseFrame.html("invalid json");
                    alert('invalid json');
                }
                $responseFrame.html(BCLSformatJSON.formatJSON(data));
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                $responseFrame.html("Sorry, the Publish request was not successful. Here's what the server sent back: " + errorThrown);
            }
        });
    };

    // set event listeners
    // set listener for form fields
    $requestInputs.on("change", buildRequest);
    // send request
    $submitButton.on("click", patchPlayer);
	
})($, window, BCLSformatJSON);