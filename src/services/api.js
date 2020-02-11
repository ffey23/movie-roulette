import axiosV3 from '../utilities/axios/axios-v3';
import axiosV4 from '../utilities/axios/axios-v4';

export default {
  fixtures: {
    get_genres() {
      return axiosV3.get('genre/movie/list', {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      });
    },
  },
  auth: {
    fetch_request_token() {
      return axiosV4.post('auth/request_token', {
        redirect_to: process.env.REACT_APP_LOGIN_REDIRECT,
      });
    },
    create_access_token(request_token) {
      return axiosV4.post('auth/access_token', {
        request_token,
      });
    },
    delete_access_token(access_token) {
      return axiosV4.delete('auth/access_token', {
        access_token,
      });
    },
    create_session_from_v4(access_token) {
      return axiosV3.post(
        'authentication/session/convert/4',
        {
          access_token,
        },
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        }
      );
    },
    delete_session(session_id) {
      return axiosV3.delete('authentication/session', {
        data: { session_id },
        params: { api_key: process.env.REACT_APP_API_KEY },
      });
    },
  },
  movies: {
    get_popular(params) {
      // BUG:
      // on API: in the time of writing code API returns movie with id 522212 on 5th and on 13th
      // we get duplicate api keys because of that in our view
      return axiosV3.get('movie/popular', {
        params: {
          ...params,
          api_key: process.env.REACT_APP_API_KEY,
        },
      });
    },
    get_details(id, session_id) {
      return axiosV3.get(`movie/${id}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          append_to_response: 'account_states',
          language: 'en-US',
          session_id: session_id,
        },
      });
    },
    rate(movie_id, session_id, value) {
      return axiosV3.post(
        `movie/${movie_id}/rating`,
        {
          value,
        },
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            session_id: session_id,
          },
        }
      );
    },
  },
};
