import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_ENV === 'dev' ? 'http://localhost:8040/api/' : 'https://kerstspelapi.dary-testing.nl/api/',
  timeout: 10000,
  params: {},
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;