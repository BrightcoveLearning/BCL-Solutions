var BCLS = (function ($, Handlebars) {
    "use strict";
    var proxyURL = "http://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.php",
        $accountID = $("#accountID"),
        accountID = "20318290001",
        $client_id = $("#client_id"),
        $client_secret = $("#client_secret"),
        client_id = "5746d707-db97-42b2-b4f0-3db890429ef0",
        client_secret = "JBdg3PLg0NarokKjIihxa_05i-YVyvhICWlQ5NXMSlUX9H9tzYqQ8FE-4mMfhAWOMs0KxUHyUN3anzkZSr3Bvg",
        $videoSelector = $("#videoSelector"),
        $geoSelector = $("#geoSelector"),
        $sortSelector = $("#sortSelector"),
        $reportTableBody = $("#reportTableBody"),
        $fromDate = $("#fromDatePicker"),
        $toDate = $("#toDatePicker"),
        $getData = $("#getData"),
        $gettingDataDisplay = $("#gettingDataDisplay"),
        $video_player_info = $("#video_player_info"),
        $requestURL = $("#requestURL"),
        currentVideo,
        analyticsData = {},
        chartData = [],
        dataDisplayBodyTemplate = "{{#items}}<tr><td>{{country_name}}</td><td>{{region_name}}</td><td>{{city}}</td><td>{{video_view}}</td><td>{{average_seconds_viewed}}</td></tr>{{/items}}",
        videoSelectTemplate = "<option value=\"\">Select a video</option>{{#items}}<option value=\"{{video}}\">{{video_name}}</options>{{/items}}",
        callType,
        // more robust test for strings "not defined"
        isDefined =  function (v) {
            if(v !== "" && v !== null && v !== "undefined") { return true; }
            else { return false; }
        },
        displayData = function () {
            var displayStr, template, results;
            currentVideo = $videoSelector.filter(":selected").text();
            displayStr = "";
            if (currentVideo !== "") {
                displayStr += "Video: " + currentVideo;
            }
            $video_player_info.html(displayStr);
            // table
            template = Handlebars.compile(dataDisplayBodyTemplate);
            results = template(analyticsData);
            $reportTableBody.html(results);
            // chart
            $.plot("#chartView", [ chartData] , {
                series: {
                    bars: {
                        show: true,
                        barWidth: 0.6,
                        align: "center"
                    }
                },
                xaxis: {
                    mode: "categories",
                    tickLength: 0
                }
            });
        },
        makeAnalyticsCall = function (callURL, callType) {
            var options = {};
            // clear chart data
            chartData = [];
            // set up options
            options.url = callURL;
            options.requestType = "GET";
            options.client_id = (isDefined($client_id.val())) ? $client_id.val() : client_id;
            options.client_secret = (isDefined($client_secret.val())) ? $client_secret.val() : client_secret;
            $.ajax({
                url: proxyURL,
                data: options,
                success : function (data) {
                    var template, i, itemsmax, item, selectedGeo = $geoSelector.val();
                    try {
                       var data = JSON.parse(data);
                    } catch(e) {
                       alert('invalid json');
                    }
                    switch (callType) {
                        case "videos":
                            // populate the video selector
                            template = Handlebars.compile(videoSelectTemplate);
                            $videoSelector.html(template(data));
                            $gettingDataDisplay.text("Video data retrieved");
                            break;
                        case "analytics":
                            itemsmax = data.items.length;
                            for (i = 0; i < itemsmax; i++) {
                                item = data.items[i];
                                item.avgSecondsViewed = item.video_seconds_viewed / item.video_view;
                                chartData.push([item[selectedGeo], item.video_view]);
                            }
                            analyticsData = data;
                            $gettingDataDisplay.text("Data retrieved - " + callNumber + " API calls made");
                            displayData();
                            break;
                }
            },
            error : function (XMLHttpRequest, textStatus, errorThrown)
                {
                    $gettingDataDisplay.text("Sorry, your request was not successful. Here's what the server sent back: " + errorThrown);
                }
            });
        },
        // get the analytics data for the videos
        getAnalyticsData = function () {
            var callURL;
            accountID = (isDefined($accountID.val())) ? $accountID.val() : accountID;
            $gettingDataDisplay.text("Getting analytics data...");
            callType = "analytics";
            currentVideo = $videoSelector.val();
            callURL = "https://analytics.api.brightcove.com/v1/data?accounts=" + accountID + "&dimensions=country,city,region&limit=all";

            if (isDefined($fromDate.val())) {
                callURL += "&from=" + $fromDate.val();
            }
            if (isDefined($toDate.val())) {
                callURL += "&to=" + $toDate.val();
            }
            if (isDefined(currentVideo)) {
                callURL += "&where=video==" + currentVideo;
            }
            $requestURL.text(callURL);
            makeAnalyticsCall(callURL, callType);

        },
        /** get the videos for the time period
        * note the limit of 200 videos - to get more simply
        * change that value, or you could provide an additional field
        * to let the user decide how many to retrieve
        */
        getVideoData = function () {
            var callURL = "";
            accountID = (isDefined($accountID.val())) ? $accountID.val() : accountID;
            $gettingDataDisplay.text("Getting video data...");
            callType = "videos";
            callURL = "https://analytics.api.brightcove.com/v1/data?accounts=" + accountID + "&dimensions=video&limit=all&fields=video,video_name&sort=video_view";
            $requestURL.text(callURL);
            makeAnalyticsCall(callURL, callType);
        };
    // add date pickers to the date input fields
    new datepickr ("fromDatePicker", {
        "fullCurrentMonth": false,
        "dateFormat": "Y-m-d"
    });
    new datepickr ("toDatePicker", {
        "fullCurrentMonth": false,
        "dateFormat": "Y-m-d"
    });

    // set event listeners

    $videoSelector.on("change", function () {
        getAnalyticsData();
    });
    $getData.on("click", getAnalyticsData);
    $client_secret.on("blur", function () {
        // refetch player and video data
        getVideoData();
    })
    // get initial players and video data
    getVideoData();
    return {};
})($, Handlebars);