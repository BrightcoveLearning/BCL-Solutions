var express = require('express'),
    router = express.Router(),
    request = require("request"),
    requestQueue = [],
    runningJobCount = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

/* POST notifications. */
router.post('/notifications', function(req, res, next) {
    
});

/* POST requests. */
router.post('/requests', function(req, res, next) {
    var requestData = JSON.parse(req.body),
    options = {};
    
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
    }
    
    options
    

    res.render('index', {
        title: 'Express'
    });
});


module.exports = router;
