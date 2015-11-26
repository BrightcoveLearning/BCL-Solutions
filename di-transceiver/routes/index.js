var express = require('express'),
    router = express.Router(),
    request = require("request"),
    requestQueue = [{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Biking_Modus-CR550.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Biking_Modus-CR550-2015-11-22T21:27:41.277Z-0","description":"transceiver-Biking_Modus-CR550-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Biking_Modus-CR550-2015-11-22T21:27:41.277Z-0","tags":["biking"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Cartoon_BettyBoop.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Cartoon_BettyBoop-2015-11-22T21:27:41.277Z-0","description":"transceiver-Cartoon_BettyBoop-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Cartoon_BettyBoop-2015-11-22T21:27:41.277Z-0","tags":["cartoon"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_Chickadee.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_Chickadee-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_Chickadee-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_Chickadee-2015-11-22T21:27:41.277Z-0","tags":["bird"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_CommonRedpoll.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_CommonRedpoll-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_CommonRedpoll-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_CommonRedpoll-2015-11-22T21:27:41.277Z-0","tags":["bird"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_Magpie.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_Magpie-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_Magpie-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_Magpie-2015-11-22T21:27:41.277Z-0","tags":["bird"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_Peacock.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_Peacock-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_Peacock-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_Peacock-2015-11-22T21:27:41.277Z-0","tags":["bird"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_Robin.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_Robin-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_Robin-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_Robin-2015-11-22T21:27:41.277Z-0","tags":["bird"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_Seagulls.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_Seagulls-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_Seagulls-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_Seagulls-2015-11-22T21:27:41.277Z-0","tags":["bird","sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_Woodpecker.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_Woodpecker-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_Woodpecker-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_Woodpecker-2015-11-22T21:27:41.277Z-0","tags":["bird"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_Sea_Brown Pelican.mpg"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_Sea_Brown Pelican-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_Sea_Brown Pelican-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_Sea_Brown Pelican-2015-11-22T21:27:41.277Z-0","tags":["bird","sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_Sea_Brown Pelicans on the Rocks.mpg"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_Sea_Brown Pelicans on the Rocks-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_Sea_Brown Pelicans on the Rocks-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_Sea_Brown Pelicans on the Rocks-2015-11-22T21:27:41.277Z-0","tags":["bird","sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bugs-Bee.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bugs-Bee-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bugs-Bee-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bugs-Bee-2015-11-22T21:27:41.277Z-0","tags":["bug"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bugs-Butterfly.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bugs-Butterfly-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bugs-Butterfly-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bugs-Butterfly-2015-11-22T21:27:41.277Z-0","tags":["bug"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Sea Marvels.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Sea Marvels-2015-11-22T21:27:41.277Z-0","description":"transceiver-Sea Marvels-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Sea Marvels-2015-11-22T21:27:41.277Z-0","tags":["sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Sea-Crab.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Sea-Crab-2015-11-22T21:27:41.277Z-0","description":"transceiver-Sea-Crab-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Sea-Crab-2015-11-22T21:27:41.277Z-0","tags":["sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Sea-Dolphins.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Sea-Dolphins-2015-11-22T21:27:41.277Z-0","description":"transceiver-Sea-Dolphins-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Sea-Dolphins-2015-11-22T21:27:41.277Z-0","tags":["sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Sea-SeaTurtle.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Sea-SeaTurtle-2015-11-22T21:27:41.277Z-0","description":"transceiver-Sea-SeaTurtle-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Sea-SeaTurtle-2015-11-22T21:27:41.277Z-0","tags":["sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Sea_Anemone.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Sea_Anemone-2015-11-22T21:27:41.277Z-0","description":"transceiver-Sea_Anemone-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Sea_Anemone-2015-11-22T21:27:41.277Z-0","tags":["sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Sea_ClownFish.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Sea_ClownFish-2015-11-22T21:27:41.277Z-0","description":"transceiver-Sea_ClownFish-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Sea_ClownFish-2015-11-22T21:27:41.277Z-0","tags":["sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Sea_LionFish.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Sea_LionFish-2015-11-22T21:27:41.277Z-0","description":"transceiver-Sea_LionFish-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Sea_LionFish-2015-11-22T21:27:41.277Z-0","tags":["sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Sea_SeaHorse.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Sea_SeaHorse-2015-11-22T21:27:41.277Z-0","description":"transceiver-Sea_SeaHorse-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Sea_SeaHorse-2015-11-22T21:27:41.277Z-0","tags":["sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Space-Galaxy.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Space-Galaxy-2015-11-22T21:27:41.277Z-0","description":"transceiver-Space-Galaxy-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Space-Galaxy-2015-11-22T21:27:41.277Z-0","tags":["space"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Space-Planets.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Space-Planets-2015-11-22T21:27:41.277Z-0","description":"transceiver-Space-Planets-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Space-Planets-2015-11-22T21:27:41.277Z-0","tags":["space"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Space-Satellite.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Space-Satellite-2015-11-22T21:27:41.277Z-0","description":"transceiver-Space-Satellite-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Space-Satellite-2015-11-22T21:27:41.277Z-0","tags":["space"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Water-Bubbles.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Water-Bubbles-2015-11-22T21:27:41.277Z-0","description":"transceiver-Water-Bubbles-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Water-Bubbles-2015-11-22T21:27:41.277Z-0","tags":["water"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Water-Droplet.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Water-Droplet-2015-11-22T21:27:41.277Z-0","description":"transceiver-Water-Droplet-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Water-Droplet-2015-11-22T21:27:41.277Z-0","tags":["water"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Water-Liquid-Flow.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Water-Liquid-Flow-2015-11-22T21:27:41.277Z-0","description":"transceiver-Water-Liquid-Flow-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Water-Liquid-Flow-2015-11-22T21:27:41.277Z-0","tags":["water"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Water-Splashing.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Water-Splashing-2015-11-22T21:27:41.277Z-0","description":"transceiver-Water-Splashing-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Water-Splashing-2015-11-22T21:27:41.277Z-0","tags":["water"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Wildlife_Tiger.mov"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Wildlife_Tiger-2015-11-22T21:27:41.277Z-0","description":"transceiver-Wildlife_Tiger-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Wildlife_Tiger-2015-11-22T21:27:41.277Z-0","tags":["wildlife"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_greatblueheron.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_greatblueheron-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_greatblueheron-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_greatblueheron-2015-11-22T21:27:41.277Z-0","tags":["bird"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_greathornedowl.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_greathornedowl-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_greathornedowl-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_greathornedowl-2015-11-22T21:27:41.277Z-0","tags":["bird"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_Sea_laughing_gull.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_Sea_laughing_gull-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_Sea_laughing_gull-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_Sea_laughing_gull-2015-11-22T21:27:41.277Z-0","tags":["bird","sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Sea_leafy_seadragon.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Sea_leafy_seadragon-2015-11-22T21:27:41.277Z-0","description":"transceiver-Sea_leafy_seadragon-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Sea_leafy_seadragon-2015-11-22T21:27:41.277Z-0","tags":["sea"]}},{"di":{"master":{"url":"http://learning-services-media.brightcove.com/videos/mp4/Bird_Sea_oystercatcher.mp4"},"capture-images":true,"profile":"videocloud-default-v1"},"cms":{"name":"transceiver-Bird_Sea_oystercatcher-2015-11-22T21:27:41.277Z-0","description":"transceiver-Bird_Sea_oystercatcher-2015-11-22T21:27:41.277Z-0","reference_id":"transceiver-Bird_Sea_oystercatcher-2015-11-22T21:27:41.277Z-0","tags":["bird","sea"]}}],
    runningJobCount = 0,
    account_id = '57838016001',
    client_id = '553d4903-4547-435d-944c-2c8e2f6abc5d',
    client_secret = 'ENBQH6pHfJQub7oR0SGCn2Pu_W2SY5QsVw24fK-frXcE6hdTRnJO-0_LBmKZh15rVliIAiECAQF1yBYP_l90gQ',
    callbackURL = 'http://solutions.brightcove.com:3000/notications',
    cmsURL = 'https://cms.api.brightcove.com/v1/accounts/57838016001/videos',
    diURL = 'https://ingest.api.brightcove.com/v1/accounts/57838016001/ingest-requests';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Dynamic Ingest Transceiver'
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
