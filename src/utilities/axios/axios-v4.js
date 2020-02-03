// MovieDB API --v4-- client
import axios from 'axios';
import { onError, onResponseSuccess } from './interceptor-callbacks';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_V4_BASE_URL,
});

client.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
  };
}, onError);

client.interceptors.response.use(onResponseSuccess, onError);

export default client;
