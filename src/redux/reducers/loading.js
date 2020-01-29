import {START_LOADING, FINISH_LOADING } from '../actions';

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

export {
    loading as default,
}