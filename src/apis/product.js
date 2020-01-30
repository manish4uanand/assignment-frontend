import axios from './base';

export function getProducts(token, data) {
  return axios.request({
    url: '/products',
    method: 'GET',
    headers: token
  })
};

export function getProductDetails(token, product_id) {
  return axios.request({
    url: `/products/${product_id}`,
    method: 'GET',
    headers: token
  })
};
