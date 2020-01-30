import store from '../redux/store';
import api from '../services/api';
import Swal from 'sweetalert2';
import {login as loginAC, logout as logoutAC} from '../redux/auth/actions';

const fetchRequestToken = () => {
    return api.auth.create_request_token();
}

const storeRequestToken = (requestToken) => {
    window.localStorage.setItem('request_token', requestToken);
    return Promise.resolve(requestToken);
}

const requestTokenAuthorization = (requestToken) => {
    const validateRequestTokenUrl = `${process.env.REACT_APP_AUTHORIZATION_PAGE}request_token=${requestToken}`;
    window.location = validateRequestTokenUrl;
    return Promise.resolve()
}

const createRequestToken = () => {
    return fetchRequestToken().then(({request_token : requestToken}) => storeRequestToken(requestToken))
        .then((requestToken) => requestTokenAuthorization(requestToken))
}

const fetchAccessToken = (requestToken) => {
    return api.auth.create_access_token(requestToken);
}

const fetchSessionId = (accessToken) => {
    return Promise.resolve(api.auth.create_session_from_v4(accessToken));
}

const storeLoginData = (sessionId) => {
    window.localStorage.setItem('session_id', sessionId);
    store.dispatch(loginAC(sessionId));
    return Promise.resolve();
}

const displaySuccess = (message) => {
    Swal.fire({
        icon: 'success',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
        text: message,
    })
    Promise.resolve()
}

const login = (requestToken) => {
    return fetchAccessToken(requestToken).then(({access_token}) => fetchSessionId(access_token))
        .then(({session_id}) => storeLoginData(session_id)).then(() => displaySuccess('You have logged in!'))
}

const deleteSession = () => {
    return api.auth.delete_session(store.getState().auth.sessionId).then(() => 
        unstoreLoginData()
    );
}

const unstoreLoginData = () => {
    store.dispatch(logoutAC());
    window.localStorage.removeItem('session_id');
    Promise.resolve();
}

const logout = () => {
    return deleteSession().then(() => displaySuccess('You have logged out!'))
}

const syncReduxWithLocalStorage = () => {
    if (!store.getState().loggedIn && window.localStorage.getItem('session_id')) {
        store.dispatch(loginAC(window.localStorage.getItem('session_id')));
    }
}

export {
    login,
    logout,
    createRequestToken,
    syncReduxWithLocalStorage,
}