import {START_LOADING, FINISH_LOADING, LOGIN, LOGOUT} from './actions';

const loading = (state = {
    loading: false,
    message: 'Loading...',
    mainLoader: false,
}, action) => {
    switch(action.type) {
        case START_LOADING:
            return action.payload;
        case FINISH_LOADING:
            return {
                loading: false,
                message: 'Loading...',
                mainLoader: false,
            };
        default:
            return state;
    }
}

const auth = (state = {
    loggedIn: false,
    sessionId: null,
}, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                loggedIn: true,
                sessionId: action.payload,
            };
        case LOGOUT:
            return {
                loggedIn: false,
                sessionId: null,
            };
        default:
            return state;
    }
}

export {
    loading,
    auth,
}