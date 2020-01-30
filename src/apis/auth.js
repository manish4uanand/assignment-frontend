import axios from './base';

export function login(data) {
  return axios.request({
    url: '/auth/sign_in',
    method: 'POST',
    data: data
  })
};

export function signup(data) {
  return axios.request({
    url: '/auth',
    method: 'POST',
    data: data
  })
};
