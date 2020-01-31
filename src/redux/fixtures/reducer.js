import {RECEIVE_GENRES} from './actions';

const fixtures = (state = {
    genres: []
}, action) => {
    switch(action.type) {
        case RECEIVE_GENRES:
            return {
                ...state,
                genres: action.payload.genres,
            }
        default:
            return state;
    }
}

export default fixtures;