var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');
var app = express();
var configure = {}
var request = require("request")

try{
  configure = JSON.parse(fs.readFileSync('configure-local.json', 'utf-8'));
}
catch(e){
  configure = JSON.parse(fs.readFileSync('configure.json', 'utf-8'));
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

// HTTPリクエストを受け取る部分

app.get('/js', function (req, res) {
  res.sendFile(__dirname + "/public/bundle.js")
});

app.post('/oauth/token',function(req,res){
  console.log("呼ばれた")
  let authJson = req.body;
  authJson.grant_type = "password"
  authJson.client_id = configure.client_id;
  authJson.client_secret = configure.client_secret;
  request.post(configure.oauthEndpoint,{form:authJson},function(err,httpResponse,body){
     console.log(body);
     res.send(JSON.parse(body).access_token)
  })
})

app.get('/*', function (req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

// サーバーを起動する部分
var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
