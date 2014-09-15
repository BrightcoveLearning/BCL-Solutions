var BCLS = (function ($, Handlebars) {
    "use strict";
    var callNumber = 0,
        $accountID = $("#accountID"),
        $token = $("#token"),
        $playerSelector = $("#playerSelector"),
        $videoSelector = $("#videoSelector"),
        $geoSelector = $("#geoSelector"),
        $sortSelector = $("#sortSelector"),
        $reportTableBody = $("#reportTableBody"),
        $fromDate = $("#fromDatePicker"),
        $toDate = $("#toDatePicker"),
        $limit = $("#limit"),
        $offset = $("#offset"),
        $getData = $("#getData"),
        $gettingDataDisplay = $("#gettingDataDisplay"),
        $video_player_info = $("#video_player_info"),
        $requestURL = $("#requestURL"),
        currentPlayer,
        currentVideo,
        analyticsData = {},
        chartData = [],
        dataDisplayBodyTemplate = "{{#items}}<tr><td>{{country_name}}</td><td>{{region_name}}</td><td>{{city}}</td><td>{{video_view}}</td><td>{{average_seconds_viewed}}</td></tr>{{/items}}",
        playerSelectTemplate = "<option value=\"\">Select a player</option>{{#items}}<option value=\"{{player}}\">{{player_name}}</options>{{/items}}",
        videoSelectTemplate = "<option value=\"\">Select a video</option>{{#items}}<option value=\"{{video}}\">{{video_name}}</options>{{/items}}",
        callType,
        // more robust test for strings "not defined"
        isDefined =  function (v) {
            if(v !== "" && v !== null && v !== "undefined") { return true; }
            else { return false; }
        },
        displayData = function () {
            var displayStr, template, results;
            currentPlayer = $playerSelector.filter(":selected").text();
            currentVideo = $videoSelector.filter(":selected").text();
            displayStr = "";
            if (currentPlayer !== "") {
                displayStr += "Player: " + currentPlayer + " ";
            }
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
        makeAnalyticsCall = function (callURL) {
            // clear chart data
            chartData = [];
            $.ajax({
            url: callURL,
            headers: {
                Authorization : "Bearer " + $token.val()
            },
            success : function (data) {
                var template, i, itemsmax, item, selectedGeo = $geoSelector.val();
                switch (callType) {
                    case "players":
                        callNumber++;
                        template = Handlebars.compile(playerSelectTemplate);
                        $playerSelector.html(template(data));
                        $gettingDataDisplay.text("Player data retrieved");
                        // now get the videos data
                        getVideoData();
                        break;
                    case "videos":
                        callNumber++;
                        // populate the video selector
                        template = Handlebars.compile(videoSelectTemplate);
                        $videoSelector.html(template(data));
                        $gettingDataDisplay.text("Video data retrieved");
                        break;
                    case "analytics":
                        callNumber++;
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
            $gettingDataDisplay.text("Getting analytics data...");
            callType = "analytics";
            currentPlayer = $playerSelector.val();
            currentVideo = $videoSelector.val();
            callURL = "https://data.brightcove.com/analytics-api/videocloud/accounts/" + $accountID.val()+ "/report/?dimensions=country,city,region&sort_by=" + $sortSelector.val();

            if (isDefined($fromDate.val())) {
                callURL += "&from=" + $fromDate.val();
            }
            if (isDefined($toDate.val())) {
                callURL += "&to=" + $toDate.val();
            }
            if (isDefined(currentPlayer)) {
                if (isDefined(currentVideo)) {
                    callURL += "&where=player==" + currentPlayer + ";video==" + currentVideo;
                } else {
                    callURL += "&where=player==" + currentPlayer;
                }
            } else if (isDefined(currentVideo)) {
                callURL += "video==" + currentVideo;
            }
            if (isDefined($limit.val())) {
                callURL += "&limit=" + $limit.val();
            }
            if (isDefined($offset.val())) {
                callURL += "&offset=" + $offset.val();
            }
            $requestURL.text(callURL);
            makeAnalyticsCall(callURL);

        },
        /** get the videos for the time period
        * note the limit of 200 videos - to get more simply
        * change that value, or you could provide an additional field
        * to let the user decide how many to retrieve
        */
        getVideoData = function () {
            var callURL = "";
            $gettingDataDisplay.text("Getting video data...");
            callType = "videos";
            callURL = "https://data.brightcove.com/analytics-api/videocloud/accounts/" + $accountID.val()+ "/report/?dimensions=video&limit=200&fields=video,video_name&sort=video_view";
            makeAnalyticsCall(callURL);
        },
        /** get the players for the time period
        * note the limit of 100 players - to get more simply
        * change that value, or you could provide an additional field
        * to let the user decide how many to retrieve
        */
        getPlayersData = function () {
            var callURL = "";
            $gettingDataDisplay.text("Getting player data...");
            callType = "players";
            callURL = "https://data.brightcove.com/analytics-api/videocloud/accounts/" + $accountID.val()+ "/report/?dimensions=player&limit=100&fields=player,player_name&sort=video_view";
            makeAnalyticsCall(callURL);
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
        $playerSelector.val(0);
        getAnalyticsData();
    });
    $playerSelector.on("change", function () {
        $videoSelector.val(0);
        getAnalyticsData();
    });
    $getData.on("click", getAnalyticsData);
    $token.on("blur", function () {
        // refetch player and video data
        getPlayersData();
    })
    // get initial players and video data
    getPlayersData();
    return {
    };
})($, Handlebars);