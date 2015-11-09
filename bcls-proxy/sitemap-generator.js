/*
 * video sitemap generator
 * Version: 0.1.0
 ************
 * Change log
 * 0.1.0:   initial release 2015-11-06
 ************
 * Author: Robert Crooks
 * Description: Retrieves all video data using CMS API requests
 * and generates a video sitemap
 * normally you would write the video sitemap to an XML file in your document root directory
 * but here we return the response to the calling page to display it
 *
 * Dependencies
 * This app requires the following modules available via NPM:
 * xmldom
 * util
 * colors
 * request
 *
 * http://ondemand.brightcovelearning.com/
 * http://video.brightcovelearning.com/
 *
 */

'use strict';
var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    request = require('request'),
    DOMParser = require('xmldom').DOMParser,
    XMLSerializer = require('xmldom').XMLSerializer,
    // error messages
    apiError = 'Your API call was unsuccessful; here is what the server returned: ',
    oauthError = 'There was a problem getting your access token: ',
    originError = 'Your request cannot be processed; this proxy only handles requests originating from Brightcove servers. If you would like to build your own version of this proxy, see http://docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html',
    // client credentials and account info
    client_id = 'ca19e0b5-8ab1-4df5-a565-4ebb05fee738',
    client_secret = 'uZsLicAVTrkeQ9sYHNyVk9iv2OY8fCtIYvfs4bnqoGwFRcMrXx8sjL8IY035n4QW2H45Jo1GTLF017L_9Cdokg',
    account_id = '20318290001',
    // base64 encode the ciient_id:client_secret string for basic auth
    authString = new Buffer(client_id + ':' + client_secret).toString('base64'),
    access_token = '',
    currentCall = 0,
    totalCalls = 0,
    callNumber = 0,
    videosArray = [];
    // holder for request options
    options = {},
    // cms api
    baseURL = 'https://cms.api.brightcove.com/v1',
    cmsapiServer,
    cmsapiSettings = {},
    // cms api options
    limit = 25,
    offset = 0,
    sort = '%2Bcreated_at';

/*
 * test for existence
 */
function isDefined(v) {
    if (v === '' || v === null || v === 'undefined' || v === undefined) {
        return false;
    }
    return true;
}
/*
 * get new access_token for other APIs
 */
function getAccessToken(callback) {
    // base64 encode the ciient_id:client_secret string for basic auth
    var bodyObj,
        token;
    // don't know what API was requested, always get new token
    request({
        method: 'POST',
        url: 'https://oauth.brightcove.com/v3/access_token?grant_type=client_credentials',
        headers: {
            'Authorization': 'Basic ' + authString,
            'Content-Type': 'application/json'
        },
        body: 'grant_type=client_credentials'
    }, function (error, response, body) {
        // check for errors
        console.log('error', error);
        console.log('body', body);
        if (error === null) {
            // return the access token to the callback
            bodyObj = JSON.parse(body);
            token = bodyObj.access_token;
            callback(null, token);
        } else {
            callback(error, null);
        }
    });
}

function setUpRequest(type, callback) {
    var endPoint,
        responseData;
    if (type === 'counts') {
        endPoint = '/accounts/' + account_id + '/counts/videos';
    } else if (type = 'video') {
        endPoint = '/accounts/' + account_id + '/videos?limit=' + limit +'&offset=' + offset + '&sort=' + sort;
    }
    options.url = baseURL + endPoint;
    getAccessToken(function(error, token) {
        if (error === null) {
            options.token = token;
            sendRequest(options, function (error, headers, body) {
                if (error === null) {
                    responseData = JSON.parse(body);
                    if (type === 'counts') {
                        callback(null, responseData.count);
                    } else if (type === 'video') {
                        videosArray = videosArray.concat(responseData);
                        currentCall += 1;
                        callback(null, currentCall)
                    }

                } else {
                    callback(error, null);
                }
            })
        }
    });

}

function setUpVideoRequest() {
    var endPoint = '/accounts/' + account_id + '/videos?limit=' + limit +'&offset=' + offset + '&sort=' + sort,
        responseData;
    options.url = baseURL + endPoint;
        getAccessToken(function(error, token) {
        if (error === null) {
            options.token = token;
            sendRequest(options, function (error, headers, body) {
                if (error === null) {
                    responseData = JSON.parse(body);
                    callback(null, responseData.count);
                } else {
                    callback(error, null);
                }
            })
        }
    });

}
/*
 * sends the request to the API
 */
function sendRequest(options, callback) {
    var requestOptions = {},
        makeRequest = function () {
            console.log('requestOptions', requestOptions);
            request(requestOptions, function (error, headers, body) {
                console.log('body', body);
                console.log('error', error);
                if (error === null) {
                    callback(null, response.headers, body);
                } else {
                    callback(error);
                }
            });
        };
    requestOptions = {
        method: options.requestType,
        url: options.url,
        headers: {
            'Authorization': 'Bearer ' + options.token,
            'Content-Type': 'application/json'
        }

    // make the request
    makeRequest();
}


function init() {
    setUpRequest('count', function (error, count) {
        if (error === null) {
            totalCalls = MATH.ceil(count / limit);
            setUpRequest('video', function (error) {

            });
        }
    });
}


util.puts('http server for CMS API '.blue + 'started '.green.bold + 'on port '.blue + '8006 '.yellow);
// initialize
init();
