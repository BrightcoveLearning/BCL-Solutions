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

/*
 * CMS API
 */
cmsapiServer = http.createServer(function (req, res) {
    var body = '',
        // for CORS - AJAX requests send host instead of origin
        origin = (req.headers.origin || '*'),
        now = new Date().valueOf(),
        writeData,
        endRes;
    endRes = function () {
        console.log('res ending');
        res.end();
    }
    writeData = function (data, callback) {
        var numCharacters = data.length,
            totalChunks = Math.ceil(numCharacters / 1024),
            i = totalChunks,
            thisChunk,
            ok = true,
            j = 0;
        write();

        function write() {
            do {
                ok = true;
                i -= 1;
                console.log('i start of loop', i);
                if (i === 0) {
                    // last time
                    console.log('last write - j: ', j);
                    thisChunk = data.substring(j * 1024, numCharacters);
                    console.log('thisChunk last time', thisChunk);
                    ok = res.write(thisChunk);

                } else {
                    // see if we should continue, or wait
                    // don't pass the callback, because we're not done yet.
                    console.log('j', j);
                    thisChunk = data.substring(j * 1024, (j * 1024) + 1024);
                    console.log('thisChunk', thisChunk);
                    // ok = res.write(thisChunk);
                    res.write(thisChunk);
                    j++;
                    console.log('ok', ok);
                }
            } while (i > 0);
        }
        callback(ok);
        // if (i > 0) {
        //   console.log('had to stop early!')
        //   // write some more once it drains
        //   res.once('drain', write);
        // }
    };        console.log('origin', origin);
    /* the published version of this proxy accepts requests only from
     * domains that include 'brightcove.com'
     * modify the following line to take requests from
     * other domains or remove the if block to
     * accept requests from any domain (not recommended!)
     * check on host as well as origin for AJAX requests
     */
    if (isDefined(req.headers.origin) && req.headers.origin.indexOf('brightcove.com') < 0 && req.headers.origin.indexOf('localhost') < 0) {
        res.writeHead(
            '500',
            'Error', {
                'access-control-allow-origin': origin,
                'content-type': 'text/plain'
            }
        );
        res.end(originError);
    } else if (isDefined(req.headers.host) && req.headers.host.indexOf('brightcove.com') < 0 && req.headers.host.indexOf('localhost') < 0) {
        res.writeHead(
            '500',
            'Error', {
                'access-control-allow-origin': origin,
                'content-type': 'text/plain'
            }
        );
        res.end('Your request cannot be processed; this proxy only handles requests originating from Brightcove servers. If you would like to build your own version of this proxy, see http://docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html');
    }
    req.on('data', function (chunk) {
        body += chunk;
    });
    // handle data on query strings (AJAX requests)
    if (body === '') {
        body = req.url.substring(2);
    }
    req.on('end', function () {
        // console.log('body', body);
        setUpRequest('count', function (error, count) {
            if (error === null) {
                totalCalls = MATH.ceil(count / limit);
                setUpRequest('video', function (error) {

                });
                }
                        // return the body from the response
                        res.writeHead(
                            '200',
                            'OK', {
                                'access-control-allow-origin': origin,
                                'content-type': 'text/plain',
                                'content-length': Buffer.byteLength(body, 'utf8')
                            }
                        );
                        res.end(body);
                    } else {
                        // request failed, return api error
                        res.writeHead(
                            '500',
                            'Error', {
                                'access-control-allow-origin': origin,
                                'content-type': 'text/plain'
                            }
                        );
                        res.end(apiError + error);
                    }
                    if (body.length > 1024) {
                        writeData(body, function (ok) {
                            console.log('ending...', ok);
                            if (ok) {
                                res.end();
                            } else {
                                var t = setTimeout(endRes, 300);
                            }

                        });
                    } else {
                        res.end(body);
                    }

                });
            } else {
                // there was no data or data was bad - redirect to usage notes
                res.statusCode = 302;
                res.setHeader('Location', 'http://solutions.brightcove.com/bcls/bcls-proxy/sitemap-generator.html');
                res.end();
            }
        });
    });
    // change the following line to have the proxy listen for requests on a different port
}).listen(8008);

util.puts('http server for CMS API '.blue + 'started '.green.bold + 'on port '.blue + '8006 '.yellow);
// initialize
init();
