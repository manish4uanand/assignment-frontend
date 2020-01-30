import axios from './base';

export function getProducts(token, data) {
  return axios.request({
    url: '/products',
    method: 'GET',
    headers: token
  })
};
