import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Product {
    _id: string;
    name: string;
    description: string;
    image_url: string;
    price: number;
    category: string;
    material: string;
    dimensions: string;
    weight: string;
    features: string[];
    created_at: string;
    updated_at: string;
}

export const productApi = {
    getAll: async (): Promise<Product[]> => {
        const response = await api.get('/products/');
        return response.data;
    },

    getById: async (id: string): Promise<Product> => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    create: async (product: Omit<Product, '_id' | 'created_at' | 'updated_at'>): Promise<Product> => {
        const response = await api.post('/products/', product);
        return response.data;
    },

    update: async (id: string, product: Partial<Product>): Promise<Product> => {
        const response = await api.put(`/products/${id}`, product);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/products/${id}`);
    },
}; 