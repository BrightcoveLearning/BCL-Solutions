/*
 * get-client-credentials
 * Version: 0.1.0
 ************
 * Change log
 * 0.1.0:   initial release 2014-10-25
 ************
 * Author: Robert Crooks
 * Description: Gets client credentials for Brightcove APIs
 */
var GETCLIENTCREDENTIALS = (function () {
    "use strict";
    var util = require("util"),
        colors = require("colors"),
        http = require('http'),
        request = require("request"),
        // error messages
        apiError = "Your API call was unsuccessful; here is what the server returned: ",
        oauthError = "There was a problem getting your client credentials: ",
        originError = "Your request cannot be processed; this proxy only handles requests originating from Brightcove servers or localhost.",
        // holder for request options
        options = {},
        clientCredentialsServer, // for other APIs
        // functions
        getFormValues,
        getClientCredentials,
        isDefined,
        init;
    /*
     * initialize data constructs
     */
    init = function () {
        // initialize options to null except requestType to GET
        options.account_id = null;
        options.BC_TOKEN = null;
        options.operations = null;
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
        console.log("getting form values");
        // split the request body string into an array
        var bodyDecoded = decodeURIComponent(body),
            valuesArray = bodyDecoded.split("&"),
            max = valuesArray.length,
            i,
            item,
            error = null;
        console.log("valuesArray",valuesArray)
        // reset options values
        options.BC_TOKEN = null;
        options.operations = [];
        options.product = null;
        // now split each item into key and value and store in the object
        for (i = 0; i < max; i = i + 1) {
            item = valuesArray[i].split("=");
            options[item[0]] = item[1];
        }
        console.log(options);
        // data fixes
        // decode the URL and request body
        options.operations = decodeURIComponent(options.operations);
        if (error === null) {
            callback(null);
        } else {
            callback(error);
        }
    };
    /*
     * get client credentials
     */
    getClientCredentials = function (callback) {
        // base64 encode the ciient_id:client_secret string for basic auth
        var auth_string = new Buffer(options.BC_TOKEN).toString("base64"),
            reqBody = 'name=SampleApp&maximum_scope=[{"identity":{"type":"' + options.product + '","account-id":' + options.account_id + '},"operations":' + options.operations + '}]',
            bodyObj;
            console.log("reqBody", reqBody);
            auth_string = "BC_TOKEN " + auth_string;
        // don't know what API was requested, always get new token
        request({
            method: 'POST',
            url: 'https://oauth.brightcove.com/v3/client_credentials',
            headers: {
                "Authorization": auth_string
            },
            body: reqBody
        }, function (error, response, body) {
            // check for errors
            console.log("error", error);
            console.log("body", body);
            if (error === null) {
                // return the response token to the callback
                callback(null, response.headers, body);
            } else {
                callback(error);
            }
        });
    };
    /*
     * Http Server to handle other API requests
     */
    clientCredentialsServer = http.createServer(function (req, res) {
        var body = "",
            // for CORS - AJAX requests send host instead of origin
            origin = (req.headers.origin || "*");
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

                    getClientCredentials(function (error, headers, body) {
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
                    res.setHeader("Location", "http://solutions.brightcove.com/bcls/bcls-proxy/get-client-credentials.html");
                    res.end();
                }
            });
        });
        // change the following line to have the proxy listen for requests on a different port
    }).listen(8020);

    util.puts("http server for client credentials ".blue + "started ".green.bold + "on port ".blue + "8020 ".yellow);
    // initialize
    init();
})();
