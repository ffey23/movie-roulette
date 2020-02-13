// MovieDB API --v3-- client
import axios from 'axios';
import { onResponseSuccess } from './interceptor-callbacks';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

client.defaults.params = {
  api_key: process.env.REACT_APP_API_BASE_URL,
};

client.interceptors.request.use(config => config);

client.interceptors.response.use(onResponseSuccess);

export default client;
