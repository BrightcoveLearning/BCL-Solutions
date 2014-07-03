var request = require('request');
var client_id = "cd2392eb-de67-480c-b67b-2e00a2d28dab";
var client_secret = "H_jedNY5aBUsR-ILm__L6qT-Nxhdel-6gkdlVJXbcjKmylJ3LIvBts2TjNibyBXfu9UaTk_HxbLZJsca2PeaKw";

request({
  method: 'POST',
  url: 'https://oauth.brightcove.com/v3/access_token',
  body: "grant_type=client_credentials
client_id=client_id
client_secret=client_secret
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
