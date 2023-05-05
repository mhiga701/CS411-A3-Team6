import { makePlaylist } from './spotify';
const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;
const mongoUri = 'mongodb://localhost:27017/';
const playlist_Id = makePlaylist();
app.get('/playlists', async (req, res) => {
  try {
    // Retrieve the playlist from Spotify API
    const playlistId = await axios.get(`https://api.spotify.com/v1/playlists/${playlist_Id}`)

    // Store the playlist in MongoDB
    const client = new MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const database = client.db('mydb');
    const playlists = database.collection('playlists');
    await playlists.insertOne({ playlist_Id });

    res.status(200).send('Playlist stored successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});