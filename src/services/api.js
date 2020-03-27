import axiosV3 from '../utilities/axios/axios-v3';
import axiosV4 from '../utilities/axios/axios-v4';

export default {
  fixtures: {
    get_genres() {
      return axiosV3.get('genre/movie/list');
    },
  },
  auth: {
    fetch_request_token() {
      const REDIRECT_BACK_URL = `${process.env.REACT_APP_HOMEPAGE}?get_access_token=true`;
      return axiosV4.post('auth/request_token', {
        redirect_to: REDIRECT_BACK_URL,
      });
    },
    fetch_access_token(request_token) {
      return axiosV4.post('auth/access_token', {
        request_token,
      });
    },
    delete_access_token(access_token) {
      return axiosV4.delete('auth/access_token', {
        access_token,
      });
    },
    fetch_session(access_token) {
      return axiosV3.post('authentication/session/convert/4', {
        access_token,
      });
    },
    delete_session(session_id) {
      return axiosV3.delete('authentication/session', {
        data: { session_id },
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
        },
      });
    },
    get_details(id, session_id) {
      return axiosV3.get(`movie/${id}`, {
        params: {
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
            session_id: session_id,
          },
        }
      );
    },
  },
};
