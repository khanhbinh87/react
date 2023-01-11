export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const FETCH_USER_LOGOUT = 'FETCH_USER_LOGOUT';




export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    };
};
export const doLogout = (email, refresh_token) => {
    return {
        type: FETCH_USER_LOGOUT,
        payload: { email, refresh_token }
    }
}
