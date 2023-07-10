require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT;
const clientId = process.env.your_client_id;
const clientSecret = process.env.your_client_secret;

const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const searchEndpoint = 'https://api.spotify.com/v1/search';

const getAccessToken = async () => {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('client_id', clientId);
  data.append('client_secret', clientSecret);

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const response = await axios.post(tokenEndpoint, data, config);
  const { access_token } = response.data;
  return access_token;
};

const searchArtist = async (accessToken, artistName) => {
  const searchQuery = encodeURIComponent(artistName);
  const searchUrl = `${searchEndpoint}?q=${searchQuery}&type=artist&limit=1`;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await axios.get(searchUrl, config);
  return response.data;
};

app.get('/', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const artistName = 'Queen'; // can change this name for anything
    const searchResult = await searchArtist(accessToken, artistName);
    console.log(searchResult);
    res.send(searchResult);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
