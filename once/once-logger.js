/*
 * Once message notification receiver
 */
var ONCELOGGER = (function () {
    "use strict";
    var util = require("util"),
        colors = require("colors"),
        http = require('http'),
        fs = require("fs"),
        onceLoggerServer,
        // error messages
        apiError = "Your API call was unsuccessful; here is what the server returned: ",
        // holder for server options
        serverOptions = {},
        // functions
        isDefined,
    /*
     * test for existence
     */
    isDefined = function (v) {
        if (v !== "" && v !== null && v !== "undefined" && v !== undefined) {
            return true;
        }
        return false;
    };
    console.log("fs", fs);
    /*
     * Http Server to handle Analytics API requests
     */
    onceLoggerServer = http.createServer(function (req) {
        var body = "",
            // for CORS - AJAX requests send host instead of origin
            origin = (req.headers.origin || "*"),
            now = new Date().valueOf();
        console.log("origin", origin);
        req.on("data", function (chunk) {
            body += chunk;
        });
        // handle data on query strings (AJAX requests)
        // if (body === "") {
        //     body = req.url.substring(2);
        // }
        req.on("end", function () {
            console.log("body", body);
            var now = new Date().toISOString();
            var data = '\n ' + now + '\n' + body + '\n';
                fs.append('./once-log.txt', data, function (err) {
                if (err) throw err;
                console.log('data appended: ', data);
            });

        });
        // change the following line to have the proxy listen for requests on a different port
    }).listen(9001);

    util.puts("http server for Once Logger ".blue + "started ".green.bold + "on port ".blue + "9001 ".yellow);
})();