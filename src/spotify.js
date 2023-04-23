import axios from 'axios';


const LOCSTORAGE_K = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expiration: 'spotify_token_expiry',
    timeLim: 'spotify_token_timestamp',
}

const LOCSTORAGE_V = {
    accessToken: window.localStorage.getItem(LOCSTORAGE_K.accessToken),
    refreshToken: window.localStorage.getItem(LOCSTORAGE_K.refreshToken),
    expiration: window.localStorage.getItem(LOCSTORAGE_K.expiration),
    timeLim: window.localStorage.getItem(LOCSTORAGE_K.timeLim),
};

export const logout = () => {
    for (const param in LOCSTORAGE_K) {
        window.localStorage.removeItem(LOCSTORAGE_K[param]);
    }
    window.location = window.location.origin;
};

const tokenExpired = () => {
    const { accessToken, timeLim, expiration } = LOCSTORAGE_V;
    if (!accessToken || !timeLim) {
        return false;
    }

    const msElapsed = Date.now() - Number(timeLim);
    return (msElapsed / 1000 > Number(expiration));
};

const refreshToken = async () => {
    try {
        if(!LOCSTORAGE_V.refreshToken || LOCSTORAGE_V.refreshToken === 'undefined' || Date.now() - Number(LOCSTORAGE_V.timeLim) / 1000 < 1000) {
            console.error('No refresh token available right now.');
            logout();
        }
        const { data } = await axios.get(`/refresh_token?refresh_token=${LOCSTORAGE_V.refreshToken}`);

        window.localStorage.setItem(LOCSTORAGE_K.accessToken, data.access_token);
        window.localStorage.setItem(LOCSTORAGE_K.timeLim, Date.now());

        window.location.reload(); 
    } catch (e) {
        console.error(e);
    }

};


const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const queryParams = {
        [LOCSTORAGE_K.accessToken]: urlParams.get('access_token'),
        [LOCSTORAGE_K.refreshToken]: urlParams.get('refresh_token'),
        [LOCSTORAGE_K.expiration]: urlParams.get('expiry'),
    };

    const hasError = urlParams.get('error');

    if (hasError || tokenExpired() || LOCSTORAGE_V.accessToken === 'undefined') {
        refreshToken();
    }

    if (LOCSTORAGE_V.accessToken && LOCSTORAGE_V.accessToken !== 'undefined') {
        return LOCSTORAGE_V.accessToken;
    }

    //first time login by user, no store access token yet but it exists in url
    if (queryParams[LOCSTORAGE_K]) {
        for (const param in queryParams) {
            window.localStorage.setItem(param, queryParams[param]);
        }
    //mark the time when access token is intially added to local storage
    window.localStorage.setItem(LOCSTORAGE_K.timeLim, Date.now());

    return queryParams[LOCSTORAGE_K.accessToken];
    }
//else case that shouldn't happen
    return false;

};

export const accToken = getAccessToken();

