// MovieDB API --v4-- client
import axios from 'axios';
import { onResponseSuccess } from './interceptor-callbacks';

const API_BASE_URL = 'https://api.themoviedb.org/4/';

const client = axios.create({
  baseURL: API_BASE_URL,
});

client.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
  };
});

client.interceptors.response.use(onResponseSuccess);

export default client;
