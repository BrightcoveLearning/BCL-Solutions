/*
 * bcls-proxy
 * Version: 0.1.1
 ************
 * Change log
 * 0.1.1: added separate ports per API to take advantage of token expire time
 ************
 * Author: Robert Crooks
 * Description: Proxies Brightcove API requests, getting an access token, making the call, and returning
 * the response to an iframe on the client page
 * Requirements:
 *   POST your request to:
 *      solutions.brightcove.com:8002 (for the Analytics API)
 *      solutions.brightcove.com:8003 (for the Player Management API)
 *      solutions.brightcove.com:8004 (for other APIs)
 *   target an iframe on your page to display the response
 *   Required fields for the body:
 *       client_id // (get from the Brightcove OAuth UI in Studio)
 *       client_secret // (get from the Brightcove OAuth UI in Studio)
 *       url // the full url for the API call you want to make, including parameters
 *       requestType // (optional, default: GET)GET | POST | PUT | PATCH | DELETE
 *       requestBody // (optional) request body for calls that submit data
 *
 * Note: this is a sample only, not a supported Brightcove plugin
 * It only accepts requests from brightcove domains
 * If you would like to use the code to build your own proxy, see docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html
 */
var BCLSPROXY = (function () {
    "use strict";
    var util = require("util"),
        colors = require("colors"),
        http = require("http"),
        request = require("request"),
        aapiToken,
        pmapiToken,
        aapiExpires = 0,
        pmapiExpires = 0,
        aapiServer,
        pmapiServer,
        apiServer, // for other APIs
        // functions
        getFormValues,
        getAAPIAccessToken,
        getPMAPIAccessToken,
        getAccessToken,
        sendRequest;
    /*
     * extract form values from request body
     */
    getFormValues = function (body, callback) {
        // split the request body string into an array
        var valuesArray = body.split("&"),
            options = {},
            max = valuesArray.length,
            i,
            item,
            error = null;
        // initialize options to null except requestType to GET
        options.url = null;
        options.client_id = null;
        options.client_secret = null;
        options.requestBody = null;
        options.requestType = "GET";
        // now split each item into key and value and store in the object
        for (i = 0; i < max; i = i + 1) {
            item = valuesArray[i].split("=");
            options[item[0]] = item[1];
        }
        // data fixes
        // decode the URL
        options.url = decodeURIComponent(options.url);
        // check for required values
        if (options.client_id === null || options.client_secret === null || options.url === null) {
            error = "Error: client_id, client_secret, and url for API request are required!";
        }
        if (error === null) {
            callback(null, options);
        } else {
            callback(error);
        }
    };
    /*
     * get new Analytics API access_token
     */
    getAAPIAccessToken = function (options, callback) {
        // base64 encode the ciient_id:client_secret string for basic auth
        var auth_string = new Buffer(options.client_id + ":" + options.client_secret).toString("base64"),
            bodyObj,
            now = new Date().valueOf();
        if (aapiExpires < now) {
            request({
                method: 'POST',
                url: 'https://oauth.brightcove.com/v3/access_token',
                headers: {
                    "Authorization": "Basic " + auth_string,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'grant_type=client_credentials'
            }, function (error, response, body) {
                // check for errors
                if (error === null) {
                    // return the access token to the callback
                    bodyObj = JSON.parse(body);
                    aapiToken = bodyObj.access_token;
                    aapiExpires = now + (bodyObj.expires_in * 1000);
                    callback(null, aapiToken);
                } else {
                    callback(error);
                }
            });
        } else {
            callback(null, aapiToken);
        }
    };
    /*
     * get new Player Management API access_token
     */
    getPMAPIAccessToken = function (options, callback) {
        // base64 encode the ciient_id:client_secret string for basic auth
        var auth_string = new Buffer(options.client_id + ":" + options.client_secret).toString("base64"),
            bodyObj,
            now = new Date().valueOf();
        if (pmapiExpires < now) {
            request({
                method: 'POST',
                url: 'https://oauth.brightcove.com/v3/access_token',
                headers: {
                    "Authorization": "Basic " + auth_string,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'grant_type=client_credentials'
            }, function (error, response, body) {
                // check for errors
                if (error === null) {
                    // return the access token to the callback
                    bodyObj = JSON.parse(body);
                    pmapiToken = bodyObj.access_token;
                    pmapiExpires = now + (bodyObj.expires_in * 1000);
                    callback(null, pmapiToken);
                } else {
                    callback(error);
                }
            });
        } else {
            callback(null, pmapiToken);
        }
    };
    /*
     * get new access_token for other APIs
     */
    getAccessToken = function (options, callback) {
        // base64 encode the ciient_id:client_secret string for basic auth
        var auth_string = new Buffer(options.client_id + ":" + options.client_secret).toString("base64"),
            bodyObj;
        // don't know what API was requested, always get new token
        request({
            method: 'POST',
            url: 'https://oauth.brightcove.com/v3/access_token',
            headers: {
                "Authorization": "Basic " + auth_string,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'grant_type=client_credentials'
        }, function (error, response, body) {
            // check for errors
            if (error === null) {
                // return the access token to the callback
                bodyObj = JSON.parse(body);
                callback(null, bodyObj.access_token);
            } else {
                callback(error);
            }
        });
    };
    /*
     * sends the request to the targeted API
     */
    sendRequest = function (token, options, callback) {
        var requestOptions = {
                method: options.requestType,
                url: options.url,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: options.requestBody
            };
        request(requestOptions, function (error, response, body) {
            console.log("error", error);
            if (error === null) {
                callback(null, response.headers, body);
            } else {
                callback(error);
            }
        });
    };
/*
 * sends the request to the Analytics API (special case)
 */
sendRequest = function (token, options, callback) {
    var requestOptions = {
            method: options.requestType,
            url: options.url,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: options.requestBody
        };
    request(requestOptions, function (error, response, body) {
        console.log("error", error);
        if (error === null) {
            callback(null, response.headers, body);
        } else {
            callback(error);
        }
    });
};
    /*
     * Http Server to handle Analytics API requests
     */
    aapiServer = http.createServer(function (req, res) {
        var body = "";
        /* the published version of this proxy accepts requests only from
         * domains that include "brightcove.com"
         * modify the following line to take requests from
         * other domains or remove the if block to
         * accept requests from any domain (not recommended!)
         */
        if (req.headers.origin.indexOf("brightcove.com") < 0) {
            res.writeHead(500);
            res.end("Your request cannot be processed; this proxy only handles requests originating from Brightcove servers. If you would like to build your own version of this proxy, see http://docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html");
        }
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on("end", function () {
            getFormValues(body, function (error, options) {
                if (error === null) {
                    getAAPIAccessToken(options, function (error, token) {
                        if (error === null) {
                            sendRequest(token, options, function (error, headers, body) {
                                if (error === null) {
                                    console.log("headers", headers);
                                    var header;
                                    for (header in headers) {
                                        res.setHeader(header, headers[header]);
                                    }
                                    if (body.indexOf("{") === 0 || options.url.indexOf("format=json") > -1) {
                                        // prettify JSON
                                        body = JSON.stringify(JSON.parse(body), true, 2);
                                    }
                                        res.writeHead(200);
                                        res.end(body);
                                } else {
                                    res.writeHead(500);
                                    res.end("Your API call was unsuccessful; here is what the server returned: " + error);
                                }
                            });
                        } else {
                            res.writeHead(500);
                            res.end("There was a problem getting your access token: " + error);
                        }
                    });
                } else {
                    res.writeHead(500);
                    res.end("There was a problem with your request: " + error);
                }
            });
        });
    // change the following line to have the proxy listen for requests on a different port
    }).listen(8002);
    /*
     * Http Server to handle Player Management API requests
     */
    pmapiServer = http.createServer(function (req, res) {
        var body = "";
        // the published version of this proxy accepts requests only from domains that include "brightcove.com"
        // modify the following line to take requests from other domains
        // or remove the if block to accept requests from any domain (not recommended!)
        if (req.headers.origin.indexOf("brightcove.com") < 0) {
            res.writeHead(500);
            res.end("Your request cannot be processed; this proxy only handles requests originating from Brightcove servers. If you would like to build your own version of this proxy, see http://docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html");
        }
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on("end", function () {
            getFormValues(body, function (error, options) {
                if (error === null) {
                    getPMAPIAccessToken(options, function (error, token) {
                        if (error === null) {
                            sendRequest(token, options, function (error, headers, body) {
                                if (error === null) {
                                    console.log("headers", headers);
                                    var header;
                                    for (header in headers) {
                                        res.setHeader(header, headers[header]);
                                    }
                                    if (body.indexOf("{") === 0 || options.url.indexOf("format=json") > -1) {
                                        // prettify JSON
                                        body = JSON.stringify(JSON.parse(body), true, 2);
                                    }
                                        res.writeHead(200);
                                        res.end(body);
                                } else {
                                    res.writeHead(500);
                                    res.end("Your API call was unsuccessful; here is what the server returned: " + error);
                                }
                            });
                        } else {
                            res.writeHead(500);
                            res.end("There was a problem getting your access token: " + error);
                        }
                    });
                } else {
                    res.writeHead(500);
                    res.end("There was a problem with your request: " + error);
                }
            });
        });
    // change the following line to have the proxy listen for requests on a different port
}).listen(8003);
    /*
     * Http Server to handle other API requests
     */
    apiServer = http.createServer(function (req, res) {
        var body = "";
        // the published version of this proxy accepts requests only from domains that include "brightcove.com"
        // modify the following line to take requests from other domains
        // or remove the if block to accept requests from any domain (not recommended!)
        if (req.headers.origin.indexOf("brightcove.com") < 0) {
            res.writeHead(500);
            res.end("Your request cannot be processed; this proxy only handles requests originating from Brightcove servers. If you would like to build your own version of this proxy, see http://docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html");
        }
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on("end", function () {
            getFormValues(body, function (error, options) {
                if (error === null) {
                    getAccessToken(options, function (error, token) {
                        if (error === null) {
                            sendRequest(token, options, function (error, headers, body) {
                                if (error === null) {
                                    console.log("headers", headers);
                                    var header;
                                    for (header in headers) {
                                        res.setHeader(header, headers[header]);
                                    }
                                    if (body.indexOf("{") === 0 || options.url.indexOf("format=json") > -1) {
                                        // prettify JSON
                                        body = JSON.stringify(JSON.parse(body), true, 2);
                                    }
                                        res.writeHead(200);
                                        res.end(body);
                                } else {
                                    res.writeHead(500);
                                    res.end("Your API call was unsuccessful; here is what the server returned: " + error);
                                }
                            });
                        } else {
                            res.writeHead(500);
                            res.end("There was a problem getting your access token: " + error);
                        }
                    });
                } else {
                    res.writeHead(500);
                    res.end("There was a problem with your request: " + error);
                }
            });
        });
    // change the following line to have the proxy listen for requests on a different port
}).listen(8004);
    util.puts("http server for Analytics API ".blue + "started ".green.bold + "on port ".blue + "8002 ".yellow);
    util.puts("http server for Player Management API ".blue + "started ".green.bold + "on port ".blue + "8003 ".yellow);
    util.puts("http server for other APIs ".blue + "started ".green.bold + "on port ".blue + "8004 ".yellow);
})();
