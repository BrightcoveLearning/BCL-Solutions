var express = require('express'),
    router = express.Router(),
    request = require('request'),
    bodyParser = require('body-parser'),
    requestQueue = [],
    runningJobCount = 0,
    successCount = 0,
    account_id = '57838016001',
    client_id = '553d4903-4547-435d-944c-2c8e2f6abc5d',
    client_secret = 'ENBQH6pHfJQub7oR0SGCn2Pu_W2SY5QsVw24fK-frXcE6hdTRnJO-0_LBmKZh15rVliIAiECAQF1yBYP_l90gQ',
    callbackURL = 'http://solutions.brightcove.com:3000/notications',
    cmsURL = 'https://cms.api.brightcove.com/v1/accounts/57838016001/videos',
    diURL = 'https://ingest.api.brightcove.com/v1/accounts/57838016001/ingest-requests';

    router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Dynamic Ingest Transceiver',
        runningJobCount: runningJobCount
    });
});

/* GET dashboard. */
router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', {
        title: 'Dynamic Ingest Transceiver Dashboard',
        runningJobCount: runningJobCount,
        jobQueue: requestQueue.length,
        jobsComplete: successCount
    });
});

/* POST notifications. */
router.post('/notifications', function(req, res, next) {

});

/* POST requests. */
router.post('/requests', function(req, res, next) {
    console.log(req);
    var requestData = JSON.parse(req.body),
    options = {};

    /*
     * sends the request to the targeted API
     */
    sendRequest = function (callback) {
        var requestOptions = {},
            requestType = 'cms',
            currentRequest;
            function makeRequest() {
                console.log("requestOptions", requestOptions);
                request(requestOptions, function (error, response, body) {
                    console.log("body", body);
                    console.log("error", error);
                    if (error === null) {
                        callback(null, response.headers, body);
                    } else {
                        callback(error);
                    }
                });
            }
            function setRequestOptions() {
                currentRequest = requestQueue.shift();
                if (requestType === 'cms') {
                    options.url = cmsURL;
                    options.requestType = 'POST';
                    options.requestBody = currentRequest.cms;
                    // set type for next request
                    requestType = 'di';
                } else {
                    options.url = diURL;
                    options.requestType = 'POST';
                    options.requestBody = currentRequest.di;
                    // set type for next request
                    requestType = 'cms';
                }
                requestOptions = {
                    method: options.requestType,
                    url: options.url,
                    headers: {
                        "Authorization": "Bearer " + options.token,
                        "Content-Type": "application/json"
                    },
                    body: options.requestBody
                };

                // make the request
                makeRequest();
            }
        if (options.token === null) {
            // get an access token
            getAccessToken(function (error) {
                if (error === null) {
                    setRequestOptions();
                } else {
                    callback(error);
                }
            });
        } else {
            // we already have a token; good to go
            setRequestOptions();
        }

    };

    /*
     * get new access_token for other APIs
     */
    getAccessToken = function (callback) {
        // base64 encode the ciient_id:client_secret string for basic auth
        var auth_string = new Buffer(options.client_id + ":" + options.client_secret).toString("base64"),
            bodyObj,
            now = new Date().valueOf();
        request({
            method: 'POST',
            url: 'https://oauth.brightcove.com/v3/access_token?grant_type=client_credentials',
            headers: {
                "Authorization": "Basic " + auth_string,
                "Content-Type": "application/json"
            },
            body: 'grant_type=client_credentials'
        }, function (error, response, body) {
            // check for errors
            console.log("error", error);
            console.log("body", body);
            if (error === null) {
                // return the access token to the callback
                bodyObj = JSON.parse(body);
                options.token = bodyObj.access_token;
                options.expires_in = now + bodyObj.expires_in * 1000;
                callback(null);
            } else {
                callback(error);
            }
        });
    };

    if (requestData.length > 0) {
        requestQueue = requestQueue.concat(requestData);
        console.log('requestData', requestData);
        if (runningJobCount < 101) {
            sendRequest();
        }
    }




    res.render('index', {
        title: 'Dynamic Ingest Transceiver'
    });
});


module.exports = router;
