/*NEXT STEPS: 
Spotfiy does not let you generate playlists by time limit, but by number of tracks
So, our best bet would be to take the average song length and generate songs up to the length of the trip. 
There is a limit of 100 songs per generated playlist by the spotify api so any trip time longer will get only a 
100 song playlist. According to googled spotify data, the average song length is 3 mins and 17 seconds == 197 seconds. 
100 of these average length songs give us a playlist time limit of rouhgly 5hours and 30 mins.*/

//server/index.js
require('dotenv').config();
const axios = require('axios');
//
const querystring = require('querystring');
//
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});

/**AUTHORIZATION CODE BELOW */
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += options.charAt(Math.floor(Math.random() * options.length));
    }
    return text;
  };
  
  
const tokenState = 'spotify_auth_state';


app.get('/login', (req, res) => {

    const state = generateRandomString(16);
    res.cookie(tokenState, state);
//various permissions to perform all necessary changes
    const scope = [
      'user-read-private',
      'user-read-email', 
      'user-top-read',
      'user-read-private', 
      'user-read-email', 
      'playlist-read-private', 
      'playlist-read-collaborative', 
      'user-read-currently-playing', 
      'user-top-read', 
      'playlist-modify-public', 
      'playlist-modify-private'
  ].join(' ');

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
      });
      res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
    //console.log(process.env.CLIENT_ID);
  });

  app.get('/callback', (req, res) => {
    const code = req.query.code || null;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;
        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        });
        res.redirect(`http://localhost:3000/?${queryParams}`);
   
      } else {
        res.redirect(`/?${querystring.stringify({ error: 'invalid token' })}`);
      }
    })
    .catch(error => {
      res.send(error);
    });

  })

  app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.send(error);
      });
  });




