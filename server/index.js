var axios = require('axios');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const PORT = 8000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.post('/gh-oauth', function (req, res) {
  const url = 'https://github.com/login/oauth/access_token'
  const client_id = 'b0af111fa670f5c709c8'
  const client_secret = '95389c8326fe033dcf8bc1e79f24dd70cb39aee2'
  const { code } = req.body;

  console.log("I'm gone");

  axios({
    method: 'post',
    url,
    data: {
      client_id,
      client_secret,
      code
    }
  })
  .then(function (response) {
    let params = new URLSearchParams(response.data);
    res.send(params.get("access_token"));
    console.log('Success ' + response)
  })
  .catch(function (error) {
    console.error('Error ' + error.message)
  })
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});