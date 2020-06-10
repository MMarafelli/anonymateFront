import axios from 'axios';
import { AsyncStorage } from 'react-native';

const loginApi = axios.create({
  //http://192.168.0.10:3000/api
  //http://anonymate.com.br/api
  baseURL: 'http://anonymate.com.br/api',
  headers: {
    authorization: ''
  },
});

loginApi.interceptors.request.use(
  async (config) => {
    const token = await writeTolken(); // slightly longer running function than example above
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log("error config")
    console.log(error)
    return Promise.reject(error);
  }
);

async function writeTolken() {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // We have data!!
      return value
    }
  } catch (error) {
    console.log('erro le')
    console.log(error)
    // Error retrieving data
  }
};

export default loginApi;
