var util = require( 'util' ),
    colors = require( 'colors' ),
    http = require( 'http' ),
    httpProxy = require( 'http-proxy' ),
    bodyParamsArray = [],
    options = {},
    optionsTmp = {},
    expiresTime = 0;

//
// Http Server with proxyRequest Handler and Latency
//
var proxy = new httpProxy.createProxyServer();
console.log("proxy", proxy);
http.createServer( function( req, res ) {
    console.log( req );
    var body = '';
    req.on( 'data', function( chunk ) {
        body += chunk;
    } );
    req.on( 'end', function( req, res ) {
        console.log( body);
        bodyParamsArray = body.split("&");
        for (var i = 0; i < bodyParamsArray.length; i++) {
            var tmpArray = bodyParamsArray[i].split("=");
            optionsTmp[tmpArray[0]] = tmpArray[1];
        }
        // proxy.web( req, res, {
        //     target: 'http://localhost:9002'
        // } );
    } );

} ).listen( 8002 );

//
// Target Http Server
//
http.createServer( function( req, res ) {
    res.writeHead( 200, {
        'Content-Type': 'text/plain'
    } );
    res.write( 'request successfully proxied to: ' + req.url + '\n' + JSON.stringify( req.headers, true, 2 ) );
    res.end();
} ).listen( 9002 );

util.puts( 'http server '.blue + 'started '.green.bold + 'on port '.blue + '8002 '.yellow + 'with proxy.web() handler'.cyan.underline + ' and latency'.magenta );
util.puts( 'http server '.blue + 'started '.green.bold + 'on port '.blue + '9001 '.yellow );