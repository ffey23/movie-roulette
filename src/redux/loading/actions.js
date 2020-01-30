const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

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

export {
    START_LOADING,
    FINISH_LOADING,
    startLoading,
    finishLoading,
}