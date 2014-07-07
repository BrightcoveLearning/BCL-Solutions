var request = require('request');
var client_id = "cd2392eb-de67-480c-b67b-2e00a2d28dab";
var client_secret = "H_jedNY5aBUsR-ILm__L6qT-Nxhdel-6gkdlVJXbcjKmylJ3LIvBts2TjNibyBXfu9UaTk_HxbLZJsca2PeaKw";
var auth_string = new Buffer(client_id + ":" + client_secret).toString('base64');
request({
    method: 'POST',
    url: 'https://oauth.brightcove.com/v3/access_token?client_id=cd2392eb-de67-480c-b67b-2e00a2d28dab&client_secret=H_jedNY5aBUsR-ILm__L6qT-Nxhdel-6gkdlVJXbcjKmylJ3LIvBts2TjNibyBXfu9UaTk_HxbLZJsca2PeaKw&grant_type=client_credentials'
}, function (error, response, body) {
     console.log('Status: ', response.statusCode);
     console.log('Headers: ', JSON.stringify(response.headers));
     console.log('Response: ', body);
     console.log('Error: ', error);
});
