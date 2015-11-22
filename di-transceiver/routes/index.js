var express = require('express'),
    router = express.Router(),
    request = require("request"),
    requestQueue = [],
    runningJobCount = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

/* POST notifications. */
router.post('/notifications', function(req, res, next) {
    
});

/* POST requests. */
router.post('/requests', function(req, res, next) {
    var requestData = JSON.parse(req.body);
    
    console.log('requestData', requestData);

    res.render('index', {
        title: 'Express'
    });
});


module.exports = router;
