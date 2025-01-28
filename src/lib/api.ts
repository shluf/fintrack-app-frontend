import axios from 'axios';

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// DEBUG

// api.interceptors.response.use(
//   (response) => {
//     console.log('Response Headers:', response.headers);
//     console.log('Cookies after request:', document.cookie);
//     return response;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    return api.post('/login', { email, password });
  },
  register: async (name: string, email: string, password: string) => {
    return api.post('/register', { name, email, password });
  },
  setAuthToken: (token: string) => {
    document.cookie = `token=${token}; Path=/; Secure; Max-Age=${24 * 60 * 60}; SameSite=Strict;`;
  }
};

// Transactions API
export const transactionsApi = {
  getAll: async () => {
    return api.get('/transactions');
  },
  create: async (data: {
    amount: number;
    type: 'income' | 'expense';
    date: string;
    description: string;
  }) => {
    return api.post('/transactions', data);
  },
  update: async (id: string, data: Partial<{
    amount: number;
    type: 'income' | 'expense';
    date: string;
    description: string;
  }>) => {
    return api.put(`/transactions/${id}`, data);
  },
  delete: async (id: string) => {
    return api.delete(`/transactions/${id}`);
  }
};

// Budgets API
export const budgetsApi = {
  getAll: async () => {
    return api.get('/budgets');
  },
  create: async (data: { monthly_limit: number }) => {
    return api.post('/budgets', data);
  },
  update: async (id: string, data: { monthly_limit: number }) => {
    return api.put(`/budgets/${id}`, data);
  }
};

// Reports API
export const reportsApi = {
  getMonthly: async () => {
    return api.get('/reports/monthly');
  },
  getYearly: async () => {
    return api.get('/reports/yearly');
  }
};

// Types
export interface Transaction {
    _id: string;
    user_id: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    description: string;
    category?: string;
  }
  
export interface Budget {
    _id: string;
    user_id: string;
    monthly_limit: number;
  }