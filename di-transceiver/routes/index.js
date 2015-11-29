var express = require('express'),
    router = express.Router(),
    request = require('request'),
    bodyParser = require('body-parser'),
    requestQueue = [],
    requestType = 'cms',
    currentVideoId = '',
    submittedJobs = [],
    errorLog = [],
    runningJobCount = 0,
    successCount = 0,
    account_id = '57838016001',
    callbackURL = 'http://solutions.brightcove.com:3000/notications',
    cmsURL = '',
    diURL = '',
    options = {
        expires_in: 0,
        token: null,
        client_id: '553d4903-4547-435d-944c-2c8e2f6abc5d',
        client_secret: 'ENBQH6pHfJQub7oR0SGCn2Pu_W2SY5QsVw24fK-frXcE6hdTRnJO-0_LBmKZh15rVliIAiECAQF1yBYP_l90gQ'
    };

router.use(bodyParser.urlencoded({
    extended: false
}));

function makeRequest(requestOptions, callback) {
    console.log("requestOptions", requestOptions);
    request(requestOptions, function(error, response, body) {
        console.log('response', response);
        console.log("body", body);
        if (error === null) {
            responseData = JSON.parse(body);
            if (requestType === 'cms') {
                currentVideoId = responseData.id;
                requestType = 'di';
            } else {
                submittedJobs.push(responseData.id);
                runningJobCount += 1;
                requestQueue.splice(0, 1);
                requestType = 'cms';
            }
        } else {
            errorLog.push(error);
        }
        checkJobCount();
    });

}

/*
 * sends the request to the targeted API
 */
function setUpRequest(callback) {
    console.log('setUpRequest');
    var now = new Date().valueOf(),
        currentRequest;
        if (options.token === null || options.expires_in < now) {
            // get an access token
            getAccessToken(function(error) {
                if (error === null) {
                    setRequestOptions(function(error, requestOptions) {
                        if (error === null) {
                            makeRequest(requestOptions);
                        } else {
                            errorLog.push(error);
                        }
                    });
                } else {
                    callback(error);
                }
            });
        } else {
            // we already have a token; good to go
            setRequestOptions(function(error, requestOptions) {
                if (error === null) {
                    makeRequest(requestOptions);
                } else {
                    errorLog.push(error);
                }
            });
        }
}


function setRequestOptions(callback) {
    console.log('setRequestOptions');
    var requestType = 'cms',
    currentRequest = requestQueue[0];
    if (requestType === 'cms') {
        options.url = 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/videos';
        options.requestType = 'POST';
        options.requestBody = JSON.stringify(currentRequest.cms);
    } else {
        options.url = 'https://ingest.api.brightcove.com/v1/accounts/' + account_id + '/videos/' + currentVideoId + '/ingest-requests';
        options.requestType = 'POST';
        options.requestBody = JSON.stringify(currentRequest.di);
        options.requestBody.callbacks = [callbackURL];
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
    makeRequest(requestOptions);
}

/*
 * get new access_token for other APIs
 */
function getAccessToken(callback) {
    console.log('getAccessToken');
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
    }, function(error, response, body) {
        // check for errors
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
}

function checkJobCount() {
    console.log('checkJobCount');
    if (requestQueue.length > 0 && runningJobCount < 101) {
        setUpRequest();
    }
}


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
    var notificationData;

    var content = '';

    req.on('data', function(data) {
        // Append data.
        content += data;
    });

    req.on('end', function() {
        // Assuming, we're receiving JSON, parse the string into a JSON object to return.
        notificationData = JSON.parse(content);
        if (notificationData.status === 'SUCCESS') {
            successCount += 1;
            runningJobCount -= 1;
            checkJobCount();
        }
        // console.log('requestData', requestData);
    });

});

/* POST requests. */
router.post('/requests', function(req, res, next) {
    var requestData,
        origin = (req.headers.origin || "*"),
        options = {};

    var content = '';

    req.on('data', function(data) {
        // Append data.
        content += data;
    });

    req.on('end', function() {
        // Assuming, we're receiving JSON, parse the string into a JSON object to return.
        requestData = JSON.parse(content);
        if (requestData.length > 0) {
            requestQueue = requestQueue.concat(requestData);
            console.log('requestData', requestData.length);
            checkJobCount();
        }
        // return ok
        res.writeHead(
            "200",
            "OK", {
                "access-control-allow-origin": origin,
                "content-type": "text/plain"
            }
        );
        res.end('Request received');
        // console.log('requestData', requestData);
    });


});


module.exports = router;
