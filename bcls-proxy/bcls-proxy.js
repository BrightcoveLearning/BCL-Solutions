var util = require( "util" ),
    colors = require( "colors" ),
    http = require( "http" ),
    request = require( "request" ),
    options = {},
    access_token = "",
    // functions
    getFormValues,
    getAccessToken,
    sendRequest,
    returnError;

/*
 * returns an error if something went wrong
 */
returnError = function (type, message) {
    var str = "Sorry, there was a problem with your request: ";
    switch (type) {
        
        default:
        str += "an unknown error occurred"
        break;
    }
}

/*
 * extract form values from request body
 */
getFormValues = function (body) {
    var valuesArray = body.split("&"),
        valuesObj = {},
        max = valuesArray.length,
        i,
        item;
    for (i = 0; i < max; i++) {
        item = valuesArray[i].split("=");
        valuesObj[item[0]] = item[1];
    }
    return valuesObj;
}

/*
 * get new access_token
 */
getAccessToken = function () {
    var auth_string = new Buffer(options.client_id + ":" + options.client_secret).toString("base64"),
    response = {};
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
    	response = JSON.parse(body);
    	console.log("response", response);
    	access_token = response.access_token;
    	sendRequest();
    });
}

/*
 * sends the request to the targeted API
 */
sendRequest = function () {
    options.url = decodeURIComponent(options.url);
    console.log(access_token)
    request({
    	method: options.requestType,
    	url: options.url,
    	headers: {
            "Authorization": "Bearer " + access_token
        },
    }, function (error, response, body) {
    	console.log('Status: ', response.statusCode);
    	console.log('Headers: ', JSON.stringify(response.headers, true, "  "));
    	console.log('Response: ', body);
    	console.log('Error: ', error);
    });
}

/*
 * Http Server to handle requests
 */
http.createServer( function( req, res ) {
    console.log(req.headers.origin);
    var body = "";
    req.on( "data", function( chunk ) {
        body += chunk;
    } );
    req.on( "end", function( req, res ) {
        console.log("body", body);
        options = getFormValues(body);
        console.log("options", options)
        // get an access token (since we're not using sockets, need to get one every time)
        getAccessToken();
    } );

} ).listen( 8002 );



util.puts( "http server ".blue + "started ".green.bold + "on port ".blue + "8002 ".yellow + "with proxy.web() handler".cyan.underline);
util.puts( "http server ".blue + "started ".green.bold + "on port ".blue + "9001 ".yellow );
