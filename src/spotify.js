import axios from 'axios';
import { useState, useEffect } from 'react';
import { errCatch } from './utils';
import { Ids } from './pages/'



//const querystring = require('querystring');
const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
  }

  const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
  };

export const logout = () => {
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    window.location = window.location.origin;
};

const tokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp) {
        return false;
    }

    const msElapsed = Date.now() - Number(timestamp);
    return (msElapsed / 1000 > Number(expireTime));
};

const refreshToken = async () => {
    try {
        if(!LOCALSTORAGE_VALUES.refreshToken || LOCALSTORAGE_VALUES.refreshToken === 'undefined' || Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000) {
            console.error('No refresh token available right now.');
            logout();
        }
        const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

        window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        window.location.reload(); 
    } catch (e) {
        console.error(e);
    }

};


const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };

    const hasError = urlParams.get('error');

    if (hasError || tokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
    }

    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken;
    }

    //first time login by user, no store access token yet but it exists in url
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }
    //mark the time when access token is intially added to local storage
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }
//else case that shouldn't happen
    return false;

};

export const accessToken = getAccessToken();

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';


export const getProfile = () => axios.get('/me');
export const getPlaylists = (limit = 20) => {
    return axios.get(`/me/playlists?limit=${limit}`);
  };

//grabs top artists for the user in the short term time range
export const getArtists = (time_range = 'short_term') => {
    return axios.get(`/me/top/artists?time_range=${time_range}`);
}

//grabs recommendations from the spotify api using top 5 artists as seeds
export const getRecs = (limit=10) => {
    // return axios.get(`/recommendations?limit=${limit}&market=US&seed_artists=${Ids.ids.id1}%${Ids.ids.id2}%${Ids.ids.id3}%${Ids.ids.id4}%${Ids.ids.id5}`);
    return axios.get(`/recommendations?limit=${limit}&market=US&seed_artists=1ybINI1qPiFbwDXamRtwxD`);
}

// export const GetArtistIds = () => {
//     const [id1, setId1] = useState(null);
//     const [id2, setId2] = useState(null);
//     const [id3, setId3] = useState(null);
//     const [id4, setId4] = useState(null);
//     const [id5, setId5] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             const userArtists = await getArtists();
            
//             setId1(userArtists.data.items[0]['id']);
//             setId2(userArtists.data.items[1]['id']);
//             setId3(userArtists.data.items[2]['id']);
//             setId4(userArtists.data.items[3]['id']);
//             setId5(userArtists.data.items[4]['id']);
//         }
//         errCatch(fetchData());
//     },
//     []);
    
// return {id1, id2, id3, id4, id5};
// }

export function handler() {
    try {
    const ENDPOINT = `https://api.spotify.com/v1/me/playlists?limit=1`;
    const makePlaylist = async () => {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                name: 'Your TripMix!',
                public: 'false',
                collaborative: 'false',
                description: 'A playlist for your upcoming trip!'

            }),
        });

        const resp = await response.json();
        console.log(resp['id'])
        let playlist_id = resp['id'];
        

      return axios.post(`/playlists/${playlist_id}/tracks?position=0&uris=5Tp4UJvnsF4Zd05k0zXUte`);
    };
    return makePlaylist();
    } catch (error) {
        console.error("Something went wrong while making your playlist.", error);
      
    }
    

}
// export function handler2(req, res) {
//     try {
//         const ENDPOINT = `https://api.spotify.com/v1/me/playlists?limit=1`;
// }
// }






