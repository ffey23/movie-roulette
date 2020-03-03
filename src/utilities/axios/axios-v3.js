// MovieDB API --v3-- client
import axios from 'axios';
import { onResponseSuccess } from './interceptor-callbacks';

const API_BASE_URL = 'https://api.themoviedb.org/3/';

const client = axios.create({
  baseURL: API_BASE_URL,
});

client.defaults.params = {
  api_key: API_BASE_URL,
};

client.interceptors.request.use(config => {
  return {
    ...config,
    params: {
      ...config.params,
      api_key: process.env.REACT_APP_API_KEY,
    },
  };
});

client.interceptors.response.use(onResponseSuccess);

export default client;
