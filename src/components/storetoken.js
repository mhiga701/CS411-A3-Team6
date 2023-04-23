const jwtManager = () => {
    let jwtManager = null;

    const getToken = () => jwtManager;
    const setToken = (token) => {
        jwtManager = token;
        return true;
    };

    const delToken = () => {
        jwtManager = null;
        return true;
    };

    return {
        getToken,
        setToken,
        delToken
    };
};

export default jwtManager();