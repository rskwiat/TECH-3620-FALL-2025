const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  REQUEST_PASSWORD: '/request-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  JOURNALS: '/journals',
  HEALTHCHECK: '/healthcheck',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
};

export default API_URL;
