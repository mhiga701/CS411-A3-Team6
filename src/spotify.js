import axios from 'axios';


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

export const getArtists = (time_range = 'short_term') => {
    return axios.get(`/me/top/artists?time_range=${time_range}`);
    // const { items } = art.json();
    // const artists = items.map((artist) => ({
    //                 genre: artist.genres,
    //                 pic: artist.images[0].url,
    //                 name: artist.name,
    //                 id: artist.id,
    //             })); 
    // return artists;
}

export function handler(req, res) {
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

      return res.status(200).json(resp);
    };
    return makePlaylist();
    } catch (error) {
        console.error("Something went wrong while making your playlist.", error);
        return res.status(400);
    }
    

}
// export function handler2(req, res) {
//     try {
//         const ENDPOINT = `https://api.spotify.com/v1/me/playlists?limit=1`;
// }
// }
export const getRecs = (limit = 50) => {
    return axios.get(`/me/recommendations/?seed_artists=${getArtists('short_term')}`)
}
console.log(getRecs);


