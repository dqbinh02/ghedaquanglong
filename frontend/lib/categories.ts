import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const getCategories = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/products/categories`);
  return response.data;
};
