/*
 * api-proxy
 * Version: 0.1.0
 ************
 * Change log
 * 0.1.0:   initial release 2014-10-07
 ************
 * Author: Robert Crooks
 * Description: Proxies Brightcove API requests, getting an access token, making the call, and returning
 * the response to an iframe on the client page
 *
 * If you would like to use the code to build your own proxy, see
 * http://docs.brightcove.com/en/video-cloud/oauth-api/guides/quick-start.html
 */
var APIPROXY = (function () {
    "use strict";
    var util = require("util"),
        colors = require("colors"),
        http = require('http'),
        request = require("request"),
        // error messages
        apiError = "Your API call was unsuccessful; here is what the server returned: ",
        oauthError = "There was a problem getting your access token: ",
        originError = "Your request cannot be processed; this proxy only handles requests originating from Brightcove servers. If you would like to build your own version of this proxy, see http://docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html",
        // holder for request options
        options = {},
        apiServer, // for other APIs
        // functions
        getFormValues,
        getAccessToken,
        sendRequest,
        isDefined,
        copyProps,
        init;
    /*
     * initialize data constructs
     */
    init = function () {
        // initialize options to null except requestType to GET
        options.url = null;
        options.token = null;
        options.aapi_token = null;
        options.client_id = null;
        options.client_secret = null;
        options.expires_in = 0;
        options.requestBody = null;
        options.requestType = "GET";
        console.log("init done");
    };
    /*
     * copy properties from one object to another
     */
    copyProps = function (obj1, obj2) {
        var prop;
        for (prop in obj1) {
            if (obj1.hasOwnProperty(prop)) {
                obj2[prop] = obj1[prop];
            }
        }
    };
    /*
     * test for existence
     */
    isDefined = function (v) {
        if (v !== "" && v !== null && v !== "undefined" && v !== undefined) {
            return true;
        }
        return false;
    };
    /*
     * extract form values from request body
     */
    getFormValues = function (body, callback) {
        console.log("getting form values");
        // split the request body string into an array
        var valuesArray = body.split("&"),
            max = valuesArray.length,
            i,
            item,
            error = null;
        // reset options values
        options.url = null;
        options.token = null;
        options.aapi_token = null;
        options.client_id = null;
        options.client_secret = null;
        options.expires_in = 0;
        options.requestBody = null;
        options.requestType = "GET";

        // now split each item into key and value and store in the object
        for (i = 0; i < max; i = i + 1) {
            item = valuesArray[i].split("=");
            options[item[0]] = item[1];
        }
        console.log(options);
        // data fixes
        // decode the URL and request body
        options.url = decodeURIComponent(options.url);
        options.requestBody = decodeURIComponent(options.requestBody);
        options.requestBody = options.requestBody.replace(/\+/g, " ");
        // check for required values
        if (options.client_id === null || options.client_secret === null || (options.url === null && options.aapi_token === null)) {
            error = "Error: your request did not contain the correct data - please see http://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.html for usage instructions";
        }
        if (error === null) {
            callback(null);
        } else {
            callback(error);
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
        // don't know what API was requested, always get new token
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
    /*
     * sends the request to the targeted API
     */
    sendRequest = function (callback) {
        var requestOptions = {},
            makeRequest = function () {
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
            },
            setRequestOptions = function () {
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
            };
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
     * Http Server to handle other API requests
     */
    apiServer = http.createServer(function (req, res) {
        var body = "",
            // for CORS - AJAX requests send host instead of origin
            origin = (req.headers.origin || "*"),
            now = new Date().valueOf();
        console.log("origin", origin);
        /* the published version of this proxy accepts requests only from
         * domains that include "brightcove.com"
         * modify the following line to take requests from
         * other domains or remove the if block to
         * accept requests from any domain (not recommended!)
         * check on host as well as origin for AJAX requests
         */
        if (isDefined(req.headers.origin) && req.headers.origin.indexOf("brightcove.com") < 0 && req.headers.origin.indexOf("localhost") < 0) {
            res.writeHead(
                "500",
                "Error", {
                    "access-control-allow-origin": origin,
                    "content-type": "text/plain"
                }
            );
            res.end(originError);
        } else if (isDefined(req.headers.host) && req.headers.host.indexOf("brightcove.com") < 0 && req.headers.host.indexOf("localhost") < 0) {
            res.writeHead(
                "500",
                "Error", {
                    "access-control-allow-origin": origin,
                    "content-type": "text/plain"
                }
            );
            res.end("Your request cannot be processed; this proxy only handles requests originating from Brightcove servers. If you would like to build your own version of this proxy, see http://docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html");
        }
        req.on("data", function (chunk) {
            body += chunk;
        });
        // handle data on query strings (AJAX requests)
        if (body === "") {
            body = req.url.substring(2);
        }
        req.on("end", function () {
            // console.log("body", body);
            getFormValues(body, function (error) {
                if (error === null) {
                    sendRequest(function (error, headers, body) {
                        if (error === null) {
                            // request successful
                            var header;
                            // return headers from the response
                            for (header in headers) {
                                if (headers.hasOwnProperty(header)) {
                                    res.setHeader(header, headers[header]);
                                }
                            }
                            // return the body from the response
                            res.writeHead(
                                "200",
                                "OK", {
                                    "access-control-allow-origin": origin,
                                    "content-type": "text/plain",
                                    "content-length": Buffer.byteLength(body, 'utf8')
                                }
                            );
                            res.end(body);
                        } else {
                            // request failed, return api error
                            res.writeHead(
                                "500",
                                "Error", {
                                    "access-control-allow-origin": origin,
                                    "content-type": "text/plain"
                                }
                            );
                            res.end(apiError + error);
                        }
                    });
                } else {
                    // there was no data or data was bad - redirect to usage notes
                    res.statusCode = 302;
                    res.setHeader("Location", "http://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.html");
                    res.end();
                }
            });
        });
        // change the following line to have the proxy listen for requests on a different port
    }).listen(8001);

    util.puts("http server for any API ".blue + "started ".green.bold + "on port ".blue + "8001 ".yellow);
    // initialize
    init();
})();
