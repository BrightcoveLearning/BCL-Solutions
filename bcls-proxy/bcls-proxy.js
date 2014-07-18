/*
* bcls-proxy
* Version: 0.1
* Author: Robert Crooks
* Description: Proxies Brightcove API requests, getting an access token, making the call, and returning 
* the response to an iframe on the client page
* Requirements:
*   POST your request to solutions.brightcove.com:8002, and target an iframe on your page
*   Required fields for the body:
*       client_id // (get from the Brightcove OAuth UI in Studio)
*       client_secret // (get from the Brightcove OAuth UI in Studio)
*       url // the full url for the API call you want to make, including parameters
*       requestType // GET | POST | PUT | PATCH | DELETE
*       requestBody // (optional) request body for calls that submit data
*
* Note: this is a sample only, not a supported Brightcove plugin
* It only accepts requests from brightcove domains
* If you would like to use the code to build your own proxy, see docs.brightcove.com/en/perform/oauth-api/guides/quick-start.html
*/

var util = require( "util" ),
    colors = require( "colors" ),
    http = require( "http" ),
    request = require( "request" ),
    // functions
    getFormValues,
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
    // initialize options to null
    options.url = null;
    options.client_id = null;
    options.client_secret = null;
    options.requestBody = null;
    // now split each item into key and value and store in the object
    for (i = 0; i < max; i++) {
        item = valuesArray[i].split("=");
        options[item[0]] = item[1];
    }
    // data fixes
    // decode the URL
    options.url = decodeURIComponent(options.url);
    console.log("url", options.url);
    // check for required values
    if (options.client_id === null || options.client_secret === null) {
        error = "Error: client_id and client_secret are required!";
    }
    if (error === null) {
        callback(null, options);
    } else {
        callback(error);
    }
}

/*
 * get new access_token
 */
getAccessToken = function (options, callback) {
    // base64 encode the ciient_id:client_secret string for basic auth
    var auth_string = new Buffer(options.client_id + ":" + options.client_secret).toString("base64"),
        bodyObj;
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
            bodyObj = JSON.parse(body)
            callback(null, bodyObj.access_token);
        } else {
            callback(error);
        }        
    });
}

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
        console.log('Error: ', error);
        console.log('Status: ', response.statusCode);
        console.log('Headers: ', JSON.stringify(response.headers, true, "  "));
        console.log('Response: ', body);
        if (error === null) {
            callback(null, response, body);
        } else {
            callback(error);
        }
    });
}

/*
 * Http Server to handle requests
 */
http.createServer( function( req, res ) {
    console.log(req.headers);
    var body = "";
    req.on( "data", function( chunk ) {
        body += chunk;
    } );
    req.on( "end", function() {
        console.log("body", body);
        getFormValues(body, function (error, options){
            if (error === null) {
                getAccessToken( options, function(err, token) {
                    console.log("Access Token: ", token);
                    sendRequest(token, options, function (error, response, body) {
                        if (error === null) {
                            res.writeHead("");
                            if (body.indexOf("{") === 0) {
                                // prettify JSON
                                body = JSON.stringify(JSON.parse(body), true, 2);
                                res.end(body);
                            } else {
                                res.end("Your response will download automatically...")
                            }
                        } else {
                            res.writeHead(500);
                            res.end("Your API call was unsuccessful; here is what the server returned: " + error); 
                        } 
                    });
                });
            } else {
                res.writeHead(500, response.headers);
                res.end("There was a problem with your request: " + error);
            }
        });
    });

} ).listen( 8002 );

util.puts( "http server ".blue + "started ".green.bold + "on port ".blue + "8002 ".yellow + "with proxy.web() handler".cyan.underline);
