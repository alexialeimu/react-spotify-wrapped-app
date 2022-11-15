/**
 * Authorization Code Flow
 * More information about the authentication from
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require("express");
const axios = require("axios");
var querystring = require('querystring');
require('dotenv').config();

const app = express();

const PORT = 3000;

let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = process.env.REDIRECT_URI;
let access_token;

// Generates a random string containing numbers and letters
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get("/", (req, res) => {
    res.send("Hello world");
});

/**
 *  Step 1. Request User Authorization.
 *  Redirects to Spotify's authorization page with custom url query.
 */
app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    var scope = 'user-top-read';
  
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }
    ));

});

/**
 *  Step 2. Request Access Token.
 *  The page user is redirected to after accepting data use.
 */
app.get('/callback', async (req, res) => {
    console.log("The response code is " + req.query.code);
    res.send("Callback page");

    const spotifyResponse = await axios.post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: redirect_uri,
        }),
        {
            headers: {
                "Authorization": "Basic " + (new Buffer(client_id + ':' + client_secret).toString('base64')),
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    access_token = spotifyResponse.data.access_token;
});

/**
 *  Example API request.
 *  Get the user's 50 top tracks. 
 *  More info: https://developer.spotify.com/console/get-current-user-top-artists-and-tracks/
 */
app.get('/getData', async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.spotify.com/v1/me/top/tracks?limit=50",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        )
        console.log(response.data)
    }
    catch (error) {
        if (error.response) {
            console.log(error.response.status);
        }
        else if (error.request) {
            console.log(error.request);
        }
        else {
            console.log(error.message);
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});