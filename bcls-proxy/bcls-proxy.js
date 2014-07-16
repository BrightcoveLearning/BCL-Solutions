var util = require( "util" ),
    colors = require( "colors" ),
    http = require( "http" ),
    request = require( "request" ),
    options = {},
    access_token = "",
    expires = 0,
    // functions
    getFormValues,
    getAccessToken,
    sendRequest,
    returnError;

/*
 * returns an error if something went wrong
 */
returnError = function (type, message) {
    var errorMessage = {};
    errorMessage.type = type;
    errorMessage.message = message;
    process.stdout.write(JSON.stringify(errorMessage));
}

/*
 * extract form values from request body
 */
getFormValues = function (body) {
    // split the request body string into an array
    var valuesArray = body.split("&"),
        valuesObj = {},
        max = valuesArray.length,
        i,
        item;
    // now split each item into key and value and store in the object
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
    // base64 encode the ciient_id:client_secret string for basic auth
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
    	// check for errors
    	if (error === null) {
        	// set the access_token value and send the API request
        	var jsonBody = JSON.parse(body);
        	access_token = jsonBody.access_token;
        	expires = new Date().valueOf() + jsonBody.expires_in * 1000;
        	
        	sendRequest();
    	} else {
        	response.write("Could not get an access token; here's what the OAuth server returned: " + error)
    	}
    	
    });
}

/*
 * sends the request to the targeted API
 */
sendRequest = function () {
    options.url = decodeURIComponent(options.url);
    console.log(access_token);
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
    	if (error === null) {
        	
    	} else {
        	returnError("API", "Your API call was unsuccessful; here is what the server returned: " + error);
    	}
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
        console.log("res", res);
        console.log("req", req);
        console.log("body", body);
        options = getFormValues(body);
        console.log("options", options);
        /*
res.writeHead(200);
        res.write("test");
        res.end;
*/
        // get an access token (since we're not using sockets, need to get one every time)
        console.log("expires", expires);
        console.log("access_token", access_token);
        console.log("now", new Date().valueOf());
        /* getAccessToken(); */
        var now = new Date().valueOf();
        if (expires < now) {
            getAccessToken();
        } else {
            sendRequest();
        }
        
    } );

} ).listen( 8002 );



util.puts( "http server ".blue + "started ".green.bold + "on port ".blue + "8002 ".yellow + "with proxy.web() handler".cyan.underline);
util.puts( "http server ".blue + "started ".green.bold + "on port ".blue + "9001 ".yellow );
