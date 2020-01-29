import { LOGIN, LOGOUT } from '../actions';

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
    auth as default,
}