import axios from 'axios';

const HOST_URL = "http://localhost:3001";


// configure an axios instance
const instance = axios.create({
  baseURL: HOST_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status === 401) {
    localStorage.clear();
    window.location.reload(true);
  }
  return Promise.reject(error);
});

export default instance;
