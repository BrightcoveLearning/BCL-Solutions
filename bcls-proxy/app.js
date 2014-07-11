var util = require('util'),
    http = require('http'),
    colors = require('colors'),
    httpProxy = require('http-proxy');

try {
  var io = require('socket.io'),
      client = require('socket.io-client');
}
catch (ex) {
  console.error('Socket.io is required for this example:');
  console.error('npm ' + 'install'.green);
  process.exit(1);
}

//
// Create the target HTTP server and setup
// socket.io on it.
//
var server = io.listen(9014);
server.sockets.on('connection', function (client) {
  util.debug('Got websocket connection');

  client.on('message', function (msg) {
    util.debug('Got message from client: ' + msg);
  });

  client.send('from server');
});

//
// Create a proxy server with node-http-proxy
//
httpProxy.createServer({ target: 'ws://localhost:9014', ws: true }).listen(8014);

//
// Setup the socket.io client against our proxy
//
var ws = client.connect('ws://localhost:8014');

ws.on('message', function (msg) {
  util.debug('Got message: ' + msg);
  ws.send('I am the client');
});
