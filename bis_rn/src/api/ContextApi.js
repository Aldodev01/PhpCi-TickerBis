import axios from 'axios';

export const contextApi = axios.create({
  baseURL: 'http://192.168.1.15/BlueBis/bis-rest-api',
});
