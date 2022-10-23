import axios from 'axios';
import type { Product } from '~/models/Product';

const API_URL = 'https://sweet-apple-acres.netlify.app/.netlify/functions/api';

export const getProducts = async (query: string) => {
  const { data: products }: { data: Product[] } = await axios.get(`${API_URL}/products`, {
    params: {
      search: query,
    },
  });
  return products;
};

export const getProduct = async (id: string | undefined) => {
  const { data: product }: { data: Product } = await axios.get(`${API_URL}/products/${id}`);
  return product;
};

export const postOrder = async (order: any) => {
  const { data: orderResponse } = await axios.post(`${API_URL}/orders`, order);
  return orderResponse;
};