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
    videosArray = [],
    // holder for request options
    options = {},
    // cms api
    baseURL = 'https://cms.api.brightcove.com/v1',
    cmsapiServer,
    cmsapiSettings = {},
    // cms api options
    limit = 25,
    offset = 0,
    sort = 'created_at',
    // doc generation
    contentStr = '',
    doc;

/**
 * create an element
 *
 * @param  {string} type - the element type
 * @param  {object} attributes - attributes to add to the element
 * @return {object} the HTML element
 */
function createEl(type, attributes) {
    var el;
    if (isDefined(type)) {
        el = doc.createElement(type);
        if (isDefined(attributes)) {
            var attr;
            for (attr in attributes) {
                el.setAttribute(attr, attributes[attr]);
            }
        }
        return el;
    }
};

/**
 * creates a text node and adds it to an element
 * @param {object|node} el - the node (element) to add the text to
 * @param {string} str - the text to add
 */
function addText(el, str) {
    var text = doc.createTextNode(str);
    el.appendChild(text);
}


function generateSitemap() {
    var urlset,
        url,
        loc,
        video,
        video_thumbnail_loc,
        video_title,
        video_description,
        video_content_loc,
        video_player_loc,
        video_duration,
        video_view_count,
        video_gallery_loc,
        i,
        iMax;
    doc = new DOMParser().parseFromString(contentStr);
    urlset = createEl('urlset', {xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9', 'xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1'});
    doc.appendChild(urlset)
    iMax = videosArray.length;
    for (i = 0; i < iMax; i += 1) {
        url = createEl('url');
        video = createEl('video');

    }
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
        // console.log('error', error);
        // console.log('body', body);
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

function setUpCountsRequest(callback) {
    var endPoint,
        responseData;
    endPoint = '/accounts/' + account_id + '/counts/videos';
    options.url = baseURL + endPoint;
    getAccessToken(function(error, token) {
        if (error === null) {
            options.token = token;
            sendRequest(options, function (error, body) {
                if (error === null) {
                    responseData = JSON.parse(body);
                    console.log('responseData', responseData);
                    callback(null, responseData.count);
                    } else {
                    callback(error, null);
                }
            });
        }
    });
}

function setUpVideoRequest(callback) {
    var endPoint,
        responseData;
    makeRequest();
    function makeRequest() {
        endPoint = '/accounts/' + account_id + '/videos?limit=' + limit +'&offset=' + (currentCall * limit) + '&sort=' + sort;
        options.url = baseURL + endPoint;
        // note that access tokens live for 5 minutes
        // you could check the time when you get one, and only request another
        // if the current one has timed out;
        // for an account with few videos, you may only need one
        // but you can always request one for each call to be safe
        getAccessToken(function (error, token) {
            if (error === null) {
                options.token = token;
                sendRequest(options, function (error, body) {
                    if (error === null) {
                        responseData = JSON.parse(body);
                        videosArray = videosArray.concat(responseData);
                        currentCall += 1;
                        if (currentCall < totalCalls) {
                            makeRequest();
                        } else {
                            callback(null);
                        }
                    }
                });
            } else {
                callback(error);
            }
        });
    }
}

/*
 * sends the request to the API
 */
function sendRequest(options, callback) {
    var requestOptions = {};
    function makeRequest() {
        request(requestOptions, function (error, headers, body) {
            // console.log('body', body);
            if (error === null) {
                callback(null, body);
            } else {
                callback(error);
            }
        });
    }
    requestOptions = {
        method: 'GET',
        url: options.url,
        headers: {
            'Authorization': 'Bearer ' + options.token,
            'Content-Type': 'application/json'
        }
    }

    // make the request
    makeRequest();
}


function init() {
    setUpCountsRequest(function (error, count) {
        if (error === null) {

            totalCalls = Math.ceil(count / limit);
            setUpVideoRequest(function (error) {
                if (error === null) {
                    console.log('videosArray', videosArray);
                    generateSitemap();
                }
            });
        }
    });
}


// util.puts('http server for CMS API '.blue + 'started '.green.bold + 'on port '.blue + '8006 '.yellow);
// initialize
init();