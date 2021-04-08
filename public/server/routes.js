const e = require('express');
const { Router } = require('express');
const https = require('https');
const querystring = require('querystring');

const routes = new Router();

routes.get('/speech/:voice/:text', function(request, res) {

  let postData = querystring.stringify({
    voice: request.params.voice,
    text: request.params.text
  });

  // request option
  let options = {
    host: 'streamlabs.com',
    port: 443,
    method: 'POST',
    path: '/polly/speak',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  // request object
  var req = https.request(options, function (apiResult) {
    var result = '';
    apiResult.on('data', function (chunk) {
      result += chunk;
    });
    apiResult.on('end', function () {
      let statusCode = apiResult.statusCode;

      if(statusCode == 200) {
        res.send(GetSpeechResponse(result));
      }
      else {
        res.statusCode = statusCode;
        res.send();
      }
    });
    apiResult.on('error', function (err) {
      console.log(err);
      res.send(err);
    })
  });
  
  // req error
  req.on('error', function (err) {
    console.log(err);
  });
  
  //send request witht the postData form
  req.write(postData);
  req.end();
});

function GetSpeechResponse(dataResult) {
  var data = JSON.parse(dataResult);

  return {
    speakUrl: data.speak_url
  }
}

module.exports = routes;