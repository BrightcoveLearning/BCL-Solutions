/*
 * bcls-proxy
 * Version: 0.1.3
 ************
 * Change log
 * 0.1.4:   add support for pull based ingest, ingest profiles, and cms api
 * 0.1.3:   add support for Analytics API LA tokens
 *          check for account match before using existing token
 * 0.1.2:   added support for AJAX requests
 * 0.1.1:   added separate ports per API to take advantage of token expire time
 ************
 * Author: Robert Crooks
 * Description: Proxies Brightcove API requests, getting an access token, making the call, and returning
 * the response to an iframe on the client page
 * Requirements:
 *   POST your request to:
 *      solutions.brightcove.com:8001 (any API, no check for existing valid token)
 *      solutions.brightcove.com:8002 (for the Analytics API)
 *      solutions.brightcove.com:8003 (for the Player Management API)
 *      solutions.brightcove.com:8004 (Pull Based Ingest API)
 *      solutions.brightcove.com:8005 (Ingest Profiles API)
 *      solutions.brightcove.com:8006 (CMS API)
 *   target an iframe on your page to display the response (unless using AJAX)
 *   Required fields for the body:
 *       *** client_id      // (get from the Brightcove OAuth UI in Studio)
 *       *** client_secret  // (get from the Brightcove OAuth UI in Studio)
 *       url                // the full url for the API call you want to make, including parameters
 *       requestType        // (optional, default: GET)GET | POST | PUT | PATCH | DELETE
 *       requestBody        // (optional) request body for calls that submit data - must not contain spaces or carriage returns
 *
 *       *** For the ANALYTICS API *ONLY* you can substitute the following for the client_id and client_secret:
 *       aapi_token              // if you have a permanent token from the Limited Availability program
 *
 * Note: this is a sample only, not a supported Brightcove app
 * It only accepts requests from brightcove domains
 * If you would like to use the code to build your own proxy, see
 * http://docs.brightcove.com/en/video-cloud/oauth-api/guides/quick-start.html
 */
var BCLSPROXY = (function () {
    "use strict";
    var util = require("util"),
        colors = require("colors"),
        http = require("http"),
        request = require("request"),
        options = {},
        // analytics api
        aapiSettings = {},
        aapiServer,
        // player management api
        pmapiSettings = {},
        pmapiServer,
        // pull based ingest api
        pbapiServer,
        pbiapiSettings = {},
        // ingest profiles api
        ipapiServer,
        ipapiSettings = {},
        // cms api
        cmsapiServer,
        cmsapiSettings = {},
        apiServer, // for other APIs
        // functions
        getFormValues,
        getAccessToken,
        sendRequest,
        isDefined,
        init;
    /*
     * initialize data constructs
     */
    init = function () {
        aapiSettings.token = null;
        aapiSettings.la_token = null;
        aapiSettings.expires_in = 0;
        aapiSettings.client_id = null;
        aapiSettings.client_secret = null;
        pmapiSettings.token = null;
        pmapiSettings.expires_in = 0;
        pmapiSettings.client_id = null;
        pmapiSettings.client_secret = null;
        pbiapiSettings.token = null;
        pbiapiSettings.expires_in = 0;
        pbiapiSettings.client_id = null;
        pbiapiSettings.client_secret = null;
        ipapiSettings.token = null;
        ipapiSettings.expires_in = 0;
        ipapiSettings.client_id = null;
        ipapiSettings.client_secret = null;
        cmsapiSettings.token = null;
        cmsapiSettings.expires_in = 0;
        cmsapiSettings.client_id = null;
        cmsapiSettings.client_secret = null;
        // initialize options to null except requestType to GET
        options.url = null;
        options.token = null;
        options.la_token = null;
        options.client_id = null;
        options.client_secret = null;
        options.expires_in = 0;
        options.requestBody = null;
        options.requestType = "GET";
        console.log("init done");
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
        // split the request body string into an array
        var valuesArray = body.split("&"),
            max = valuesArray.length,
            i,
            item,
            error = null;
        // reset options values
        options.url = null;
        options.token = null;
        options.la_token = null;
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
        // data fixes
        // decode the URL and request body
        options.url = decodeURIComponent(options.url);
        options.requestBody = decodeURIComponent(options.requestBody);
        // check for required values
        if (options.client_id === null || options.client_secret === null || options.url === null && options.aapi_token === null) {
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
        if (aapiSettings.expires_in < now || aapiSettings.client_id !== options.client_id) {
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
                    // save the token, expires_in, id, and secret
                    aapiSettings.token = bodyObj.access_token;
                    aapiSettings.expires_in_in = now + (bodyObj.expires_in * 1000);
                    aapiSettings.client_id = options.client_id;
                    aapiSettings.client_secret = options.client_secret;
                    callback(null, aapi_token);
                } else {
                    callback(error);
                }
            });
        } else {
            callback(null, aapi_token);
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
        if (pmapiSettings.expires_in < now || pmapiSettings.client_id !== options.client_id) {
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
                    pmapiSettings.token = bodyObj.access_token;
                    pmapiSettings.expires_in = now + (bodyObj.expires_in * 1000);
                    pmapiSettings.client_id = options.client_id;
                    pmapiSettings.client_secret = options.client_secret;
                    callback(null, pmapi_token);
                } else {
                    callback(error);
                }
            });
        } else {
            callback(null, pmapi_token);
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
                options.token = bodyObj.access_token;
                options.expires_in = bodyObj.expires_in;
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
                "Authorization": "Bearer " + options.token,
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
        if (isDefined(req.headers.origin) && req.headers.origin.indexOf("brightcove.com") < 0) {
            res.writeHead(
                "500",
                "Error", {
                    "access-control-allow-origin": origin,
                    "content-type": "text/plain"
                }
            );
            res.end("Your request cannot be processed; this proxy only handles requests originating from Brightcove servers. If you would like to build your own version of this proxy, see http://docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html");
        } else if (isDefined(req.headers.host) && req.headers.host.indexOf("brightcove.com") < 0) {
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
            getFormValues(body, function (error, options) {
                if (!isDefined(options.la_token))
                    if (error === null) {

                        if (aapiSettings.expires_in < now || aapiSettings.client_id !== options.client_id) {
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
                                            res.writeHead(
                                                "200",
                                                "OK", {
                                                    "access-control-allow-origin": origin,
                                                    "content-type": "text/plain",
                                                    "content-length": body.length
                                                }
                                            );
                                            res.end(body);
                                        } else {
                                            res.writeHead(
                                                "500",
                                                "Error", {
                                                    "access-control-allow-origin": origin,
                                                    "content-type": "text/plain"
                                                }
                                            );
                                            res.end("Your API call was unsuccessful; here is what the server returned: " + error);
                                        }
                                    });
                                } else {
                                    res.writeHead(
                                        "500",
                                        "Error", {
                                            "access-control-allow-origin": origin,
                                            "content-type": "text/plain"
                                        }
                                    );
                                    res.end("There was a problem getting your access token: " + error);
                                }
                            });
                        } else {
                            // we have a permanent aapi token
                            sendRequest(aapiSettings.token, options, function (error, headers, body) {
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
                                    res.writeHead(
                                        "200",
                                        "OK", {
                                            "access-control-allow-origin": origin,
                                            "content-type": "text/plain",
                                            "content-length": body.length
                                        }
                                    );
                                    res.end(body);
                                } else {
                                    res.writeHead(
                                        "500",
                                        "Error", {
                                            "access-control-allow-origin": origin,
                                            "content-type": "text/plain"
                                        }
                                    );
                                    res.end("Your API call was unsuccessful; here is what the server returned: " + error);
                                }
                            });
                        }
                    } else {
                        res.writeHead(
                            "500",
                            "Error", {
                                "access-control-allow-origin": origin,
                                "content-type": "text/plain"
                            }
                        );
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
        var body = "",
            // for CORS - AJAX requests send host instead of origin
            origin = (req.headers.origin || "*");
        /* the published version of this proxy accepts requests only from
         * domains that include "brightcove.com"
         * modify the following line to take requests from
         * other domains or remove the if block to
         * accept requests from any domain (not recommended!)
         * check on host as well as origin for AJAX requests
         */
        if (isDefined(req.headers.origin) && req.headers.origin.indexOf("brightcove.com") < 0) {
            res.writeHead(
                "500",
                "Error", {
                    "access-control-allow-origin": origin,
                    "content-type": "text/plain"
                }
            );
            res.end("Your request cannot be processed; this proxy only handles requests originating from Brightcove servers. If you would like to build your own version of this proxy, see http://docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html");
        } else if (isDefined(req.headers.host) && req.headers.host.indexOf("brightcove.com") < 0) {
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
                                    res.writeHead(
                                        "200",
                                        "OK", {
                                            "access-control-allow-origin": origin,
                                            "content-type": "text/plain",
                                            "content-length": body.length
                                        }
                                    );
                                    res.end(body);
                                } else {
                                    res.writeHead(
                                        "500",
                                        "Error", {
                                            "access-control-allow-origin": origin,
                                            "content-type": "text/plain"
                                        }
                                    );
                                    res.end("Your API call was unsuccessful; here is what the server returned: " + error);
                                }
                            });
                        } else {
                            res.writeHead(
                                "500",
                                "Error", {
                                    "access-control-allow-origin": origin,
                                    "content-type": "text/plain"
                                }
                            );
                            res.end("There was a problem getting your access token: " + error);
                        }
                    });
                } else {
                    res.writeHead(
                        "500",
                        "Error", {
                            "access-control-allow-origin": origin,
                            "content-type": "text/plain"
                        }
                    );
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
        var body = "",
            // for CORS - AJAX requests send host instead of origin
            origin = (req.headers.origin || "*");
        /* the published version of this proxy accepts requests only from
         * domains that include "brightcove.com"
         * modify the following line to take requests from
         * other domains or remove the if block to
         * accept requests from any domain (not recommended!)
         * check on host as well as origin for AJAX requests
         */
        if (isDefined(req.headers.origin) && req.headers.origin.indexOf("brightcove.com") < 0) {
            res.writeHead(
                "500",
                "Error", {
                    "access-control-allow-origin": origin,
                    "content-type": "text/plain"
                }
            );
            res.end("Your request cannot be processed; this proxy only handles requests originating from Brightcove servers. If you would like to build your own version of this proxy, see http://docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html");
        } else if (isDefined(req.headers.host) && req.headers.host.indexOf("brightcove.com") < 0) {
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
                                    res.writeHead(
                                        "200",
                                        "OK", {
                                            "access-control-allow-origin": origin,
                                            "content-type": "text/plain",
                                            "content-length": body.length
                                        }
                                    );
                                    res.end(body);
                                } else {
                                    res.writeHead(
                                        "500",
                                        "Error", {
                                            "access-control-allow-origin": origin,
                                            "content-type": "text/plain"
                                        }
                                    );
                                    res.end("Your API call was unsuccessful; here is what the server returned: " + error);
                                }
                            });
                        } else {
                            res.writeHead(
                                "500",
                                "Error", {
                                    "access-control-allow-origin": origin,
                                    "content-type": "text/plain"
                                }
                            );
                            res.end("There was a problem getting your access token: " + error);
                        }
                    });
                } else {
                    res.writeHead(
                        "500",
                        "Error", {
                            "access-control-allow-origin": origin,
                            "content-type": "text/plain"
                        }
                    );
                    res.end("There was a problem with your request: " + error);
                }
            });
        });
        // change the following line to have the proxy listen for requests on a different port
    }).listen(8004);
    util.puts("http server for Analytics API ".blue + "started ".green.bold + "on port ".blue + "8002 ".yellow);
    util.puts("http server for Player Management API ".blue + "started ".green.bold + "on port ".blue + "8003 ".yellow);
    util.puts("http server for other APIs ".blue + "started ".green.bold + "on port ".blue + "8004 ".yellow);
    // initialize
    init();
})();