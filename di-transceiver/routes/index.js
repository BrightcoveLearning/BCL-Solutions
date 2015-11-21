var express = require('express'),
    router = express.Router(),
    request = require("request"),
    requestQueue = [],
    runningJobCount = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST notifications. */
router.post('/notifications', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST requests. */
router.post('/requests', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
