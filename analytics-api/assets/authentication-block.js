$aapi_token = $("#aapi_token"),
$client_secret_display = $("#client_secret_display"),
$client_id_display = $("#client_id_display"),
$client_id = $("#client_id"),
$client_secret = $("#client_secret"),
client_id,
client_secret,
default_client_id = "742d6440-58d1-49ed-b2fb-f60d33bf02ae",
default_client_secret = "xs3vuzzKPz5fWHInsON26SXOL54X1GObFW70KylVqdVuIHdkqwqlCs9yVSCRF3i5u_0NcNb7MrzntCLaveZmeQ",
$APIrequestType = $("#aapiRequestType"),
requestType,
APIrequest = document.getElementById("APIrequest"),
$authorization = $("#authorization"),
$authorizationDisplay = $("#authorizationDisplay"),
requestURL = "",
authorization = "",
endDate = "",
startDate = "",
requestData = {},
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
