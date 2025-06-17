import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCategories = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/products/categories`);
  return response.data;
};
