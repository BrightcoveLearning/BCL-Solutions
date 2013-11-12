HOST: https://data.brightcove.com/analytics-api/videocloud

--- Analytics API v1 ---
---
The Analytics API allows you to obtain analytics data for your Video Cloud accounts directly. You can also view the built-in analytics reports in the Analytics Module of [Video Cloud Studio](http://videocloud.brightcove.com). Accessing the data programmatically gives you additional flexibility for such purposes as:

* Creating custom charts and displays
* Merging or aggregating data from multiple accounts
* Combining your video analytic data with other site analytics data

### <a id="metrics"></a>Available Metrics (by report type)
| Metric                | Player    | Video    | Referrer_domain    | Search_terms | Account Rollup   |
| -----                 | :----:    | :---:    | :-------------:    | :----------: | :------------:   |
| player_load           | **x**     |          |     **x**          | **x**        |  **x**           |
| video_impression      | **x**     |  **x**   |     **x**          | **x**        |  **x**           |
| video_view            | **x**     |  **x**   |     **x**          | **x**        |  **x**           |
| video_engagement      | **x**     |  **x**   |                    |              |  **x**           |
| video_percent_viewed  | **x**     |  **x**   |                    |              |  **x**           |
| video_seconds_viewed  | **x**     |  **x**   |                    |              |  **x**           |
| active_media          |           |          |                    |              |  **x**           |
| bytes_in              |           |          |                    |              |  **x**           |
| bytes_out             |           |          |                    |              |  **x**           |
| bytes_overhead        |           |          |                    |              |  **x**           |
| bytes_stored          |           |          |                    |              |  **x**           |
| bytes_player          |           |          |                    |              |  **x**           |

# Operations
---

--
Report

Reports return analytics data on one or more dimensions

###Parameters

| Parameter     | Required  | Default               | Description |
| ---------     | :------:  | -------               | ----------- |
| dimensions    | yes       | none                  | The dimesion(s) to report on &mdash; one or more of the following values in a comma-delimited list: *video*, *player*, *referrer_domain*, *search_terms*, *source_type*, *device_type*, *device_os* |
| where         | no        | none                  | Filters for the report in the form *dimension1==value1;dimension2==value2* &mdash; for example: **video==123455;player==67890;search_terms==brightcove** |
| from          | no        | 30 days before now    | Start time for the period covered by the report &mdash; either epoch time in milliseconds or *alltime* |
| to            | no        | now                   | End time for the period covered by the report &mdash; either epoch time in milliseconds or *now* |
| limit         | no        | 10                    | The number of results to return &mdash; an integer greater than 0 |
| offset        | no        | 0                     | The number of results to skip &mdash; an integer greater than or equal to 0 |
| fields        | no        | [all fields]          | The [metrics fields](#metrics) to return &mdash; one or more metrics as a comma-delimited list |
| format        | no        | json                  | The format to return the results in &mdash; *json*, *csv*, or *xlsx* |


--
Get an analytics report for your account
GET /account/{accountId}/report?{dimensions,where,limit,offset,from,to,sort,fields,format}
> Authorization: Bearer 15075c51ae4b0af095c9a619a
< 200
< Content-Type: application/json
{
    "account": "20318290001",
    "item_count": 123,
    "items": [
        {
            "video": "2127145422001",
            "video_duration": "124",
            "video_engagement_1": 0,
            "video_engagement_25": 4,
            "video_engagement_50": 2,
            "video_engagement_75": 2,
            "video_engagement_100": 2,
            "video_impression": 65,
            "video_name": "Creating a Playlist (Japanese)",
            "video_percent_viewed": 297.81667977970096,
            "video_seconds_viewed": 369,
            "video_view": 9
        }
    ]
}

-- Account Rollup --
Rollup reports return summary data for your account

###Parameters

| Parameter     | Required  | Default               | Description |
| ---------     | :------:  | -------               | ----------- |
| where         | no        | none                  | Filters for the report in the form *dimension1==value1;dimension2==value2* &mdash; for example: **video==123455;player==67890;search_terms==brightcove** |
| from          | no        | 30 days before now    | Start time for the period covered by the report &mdash; either epoch time in milliseconds or *alltime* |
| to            | no        | now                   | End time for the period covered by the report &mdash; either epoch time in milliseconds or *now* |
| limit         | no        | 10                    | The number of results to return &mdash; an integer greater than 0 |
| offset        | no        | 0                     | The number of results to skip &mdash; an integer greater than or equal to 0 |
| fields        | no        | [all fields]          | The [metrics fields](#metrics) to return &mdash; one or more metrics as a comma-delimited list


GET /account/{accountId}?{dimensions,where,limit,offset,from,to,sort,fields}
> Authorization: Bearer 15075c51ae4b0af095c9a619a
< 200
{
    "video": "2487896957001",
    "account": "20318290001",
    "metrics": {
        "video_engagement": {
            "series": {
                "type": "percentile",
                "values": [
                    2.9999999999999987,
                    2.9999999999999987,
                    2.8469750889679704,
                    1.9999999999999991,
                    1.9999999999999991,
                    1.9999999999999991,
                    2.000000000000001,
                    1.9999999999999991,
                    1.9999999999999991,
                    1.9999999999999991,
                    1.3202846975088989,
                    0.9999999999999996,
                    1.9003558718861209,
                    1.167259786476865,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    1.000000000000003,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    1.0000000000000067,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    1.0000000000000067,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    1.0000000000000138,
                    0.9999999999999996,
                    0.9999999999999996,
                    1.0000000000000138,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    1.0000000000000138,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    1.0000000000000138,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    1.0000000000000138,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    0.9999999999999996,
                    1.0000000000000138,
                    0.9999999999999996
                ]
            }
        },
        "video_seconds_viewed": {
            "series": {
                "step": 3600000,
                "values": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    11,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    310,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "type": "time",
                "start": 1377144000000
            },
            "alltime": 45988
        },
        "video_percent_viewed": {
            "series": {
                "step": 3600000,
                "values": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    3.914590747330961,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    110.32028469750897,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "type": "time",
                "start": 1377144000000
            },
            "alltime": 16375.596219195944
        },
        "video_impression": {
            "series": {
                "step": 3600000,
                "values": [
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    2,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    2,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "type": "time",
                "start": 1377144000000
            },
            "alltime": 408
        },
        "video_view": {
            "series": {
                "step": 3600000,
                "values": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    2,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "type": "time",
                "start": 1377144000000
            },
            "alltime": 229
        }
    },
    "video_name": "Calculating Video Engagement Score",
    "video_duration": "281"
}