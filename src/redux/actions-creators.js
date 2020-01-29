import {START_LOADING, FINISH_LOADING, LOGIN, LOGOUT} from './actions';
/**
 * @param {boolean} [mainLoader=true] Determines if main loader will bi triggered 
 * @param {string} [message="Loading..."] Loading message which we can use somewhere
 */
const startLoading = (mainLoader = true, message = "Loading...") => {
    return {
        type: START_LOADING,
        payload: {
            loading: true,
            mainLoader,
            message,
        }
    }
}

const finishLoading = () => {
    return {
        type: FINISH_LOADING,
    }

}

const login = (sessionId) => {
    return {
        type: LOGIN,
        payload: sessionId,
    }

}

const logout = () => {
    return {
        type: LOGOUT,
    }

}
export {
    startLoading,
    finishLoading,
    login,
    logout,
}
