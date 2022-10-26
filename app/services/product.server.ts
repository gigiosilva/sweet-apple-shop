import axios from 'axios';
import type { Product } from '~/models/Product';

interface ProductItems {
  productId: string;
  quantity: number;
}

interface ProductResponse {
  name: string;
  deliveryAddress: string;
  items: ProductItems[];
}

const API_URL = 'https://sweet-apple-acres.netlify.app/.netlify/functions/api';

export const getProducts = async (query: string) => {
  const { data: products } = await axios.get<Product[]>(`${API_URL}/products`, {
    params: {
      search: query,
    },
  });
  return products;
};

export const getProduct = async (id: string | undefined) => {
  const { data: product } = await axios.get<Product>(`${API_URL}/products/${id}`);
  return product;
};

export const postOrder = async (order: any) => {
  const { data: orderResponse } = await axios.post<ProductResponse>(`${API_URL}/orders`, order);
  return orderResponse;
};