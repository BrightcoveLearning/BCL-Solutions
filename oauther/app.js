var express = require('express'),
    app = express(),
    server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });
    
app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});

