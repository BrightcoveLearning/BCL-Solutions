var http      = require('http'),  
    httpProxy = require('http-proxy');

http.createServer(function(req, res) {  
    console.log(req.headers);
    console.log(req.body);
    res.end('hi!');
}).listen(8000);

var proxyServer = httpProxy.createProxyServer({  
  target: 'http://127.0.0.1:8000', // where do we want to proxy to?
  ws    : true // proxy websockets as well 
}).listen(9000);