const getAccToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    return accToken;
};

export const accToken = getAccToken();