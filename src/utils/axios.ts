import axios from 'axios';
import config from '@/config';
import store from '@/redux/store';
import { setToken } from '@/redux/actions';
import { get } from 'lodash';

const service = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = store.getState().token;
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const jwtToken = get(response,'headers.x-token');
    if(jwtToken) {
      store.dispatch(setToken(jwtToken));
      const token = store.getState().token;
    }
    
    if (response.status === 401) {
      console.error('Unauthorized');
    }
    return response.data;
  },
  (error) => {
    const { response } = error;
    if (response) {
      const statusCode = response.status;
      switch (statusCode) {
        case 400:
          console.error('Bad Request:', response.data);
          break;
        case 401:
          console.error('Unauthorized:', response.data);
          break;
        default:
          console.error('Error:', response.data);
      }
    } else {
      console.error('Request failed:', error.message);
    }
    return Promise.reject(error);
  }
);

export default service;
