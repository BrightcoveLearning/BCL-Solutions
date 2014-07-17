var util = require( "util" ),
    colors = require( "colors" ),
    http = require( "http" ),
    request = require( "request" ),
    options = {},
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
        valuesObj[item[0]] = item[1];
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
    var auth_string = new Buffer(options.client_id + ":" + options.client_secret).toString("base64");
    request({
        method: 'POST',
        url: 'https://oauth.brightcove.com/v3/access_token',
        headers: {
            "Authorization": "Basic " + auth_string,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'grant_type=client_credentials'
    }, function (error, response, body) {
        console.log('Status: ', response.statusCode);
        console.log('Headers: ', JSON.stringify(response.headers));
        console.log('Response: ', JSON.parse(body));
        console.log('Error: ', error);
        // check for errors
        if (error === null) {
            // return the access token to the callback
            callback(null, jsonBody.access_token);
        } else {
            callback(error);
        }        
    });
}

/*
 * sends the request to the targeted API
 */
sendRequest = function (token, options, callback) {
    request({
        method: options.requestType,
        url: options.url,
        headers: {
            "Authorization": "Bearer " + token
        },
    }, function (error, response, body) {
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
                            if (body.indexOf("{" === 0) {
                                // prettify JSON
                                body = JSON.stringify(JSON.parse(body), true, 2);
                            }
                            res.writeHead(response.statusCode, response.headers);
                            res.end(body);
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
        console.log("options", options);
                
                
    });

} ).listen( 8002 );



util.puts( "http server ".blue + "started ".green.bold + "on port ".blue + "8002 ".yellow + "with proxy.web() handler".cyan.underline);
util.puts( "http server ".blue + "started ".green.bold + "on port ".blue + "9001 ".yellow );
