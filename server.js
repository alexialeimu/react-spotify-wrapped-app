/**
 * Authorization Code Flow
 * More information about the authentication from
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
var querystring = require('querystring');
const { json } = require('express');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = 8000;

let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = process.env.REDIRECT_URI;
let access_token = '';
let user;

// Generates a random string containing numbers and letters
var generateRandomString = function (length) {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(
            Math.floor(Math.random() * possible.length)
        );
    }
    return text;
};

/**
 *  Step 1. Request User Authorization.
 *  Redirects to Spotify's authorization page with custom url query.
 */
app.get('/login', function (req, res) {
    var state = generateRandomString(16);
    var scope = 'user-top-read user-read-private';

    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state,
            })
    );
});

/**
 *  Step 2. Request Access Token.
 *  The page user is redirected to after accepting data use.
 */
app.get('/callback', async (req, res) => {
    const { code } = req.query;
    const grant_type = 'authorization_code';

    const basicHeader = Buffer.from(
        `${client_id}:${client_secret}`
    ).toString('base64');
    const { data } = await axios.post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
            grant_type,
            code,
            redirect_uri,
        }),
        {
            headers: {
                Authorization: `Basic ${basicHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    access_token = data.access_token;

    return res.redirect('http://localhost:3000/');
});

/*
 *   Making sure the server is running and working
 */
app.get('/message', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

/*
 *  Get current user's profile
 *  More info: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile
 */
app.get('/user', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/me`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        console.log(response.data);
        user = response.data;
    } catch (err) {
        console.error(err.message);
    }
    res.json({ user: user });
});

/**
 *  Get user's top items
 *  More info: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
 */
app.get('/stats/top', async (req, res) => {
    const timeRange = req.query.timeRange;
    const type = req.query.type;
    const amount = req.query.amount;

    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/me/top/${type}?limit=${amount}&time_range=${timeRange}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        console.log(response.data.items);
        // res.json({ data: response.data.items });
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            console.log('response', error.response);
        } else if (error.request) {
            console.log('request', error.request);
        } else {
            console.log('else', error.message);
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
