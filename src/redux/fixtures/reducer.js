import { GENRES_SUCCESS } from './actions';

const fixtures = (
  state = {
    genres: [],
  },
  action
) => {
  switch (action.type) {
    case GENRES_SUCCESS:
      return {
        ...state,
        genres: action.response.genres,
      };
    default:
      return state;
  }
};

export default fixtures;
