import axios from 'axios';
import API_URL, { API_ENDPOINTS } from './constants';
import { useAppStore } from './stores';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = useAppStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAppStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  email: string;
}

export interface RegisterResponse {
  message: string;
  id: number;
}

export interface JournalEntry {
  id: number;
  title: string;
  entry: string;
  created_at: string;
}

export interface JournalsResponse {
  success: boolean;
  data: JournalEntry[];
}

export interface CreateJournalRequest {
  title: string;
  entry: string;
}

export interface CreateJournalResponse {
  success: boolean;
  message: string;
  journalId: number;
  data: JournalEntry[];
}

// Auth endpoints
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
  return response.data;
};

export const register = async (credentials: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiClient.post(API_ENDPOINTS.REGISTER, credentials);
  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  const response = await apiClient.post(API_ENDPOINTS.REQUEST_PASSWORD, { email });
  return response.data;
};

export const resetPassword = async (data: { token: string; password: string }) => {
  const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, data);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await apiClient.post(API_ENDPOINTS.VERIFY_EMAIL, { token });
  return response.data;
};

// Journal endpoints
export const getJournals = async (): Promise<JournalsResponse> => {
  const response = await apiClient.get(API_ENDPOINTS.JOURNALS);
  return response.data;
};

export const createJournal = async (
  data: CreateJournalRequest
): Promise<CreateJournalResponse> => {
  const response = await apiClient.post(API_ENDPOINTS.JOURNALS, data);
  return response.data;
};

export const updateJournal = async (id: number, data: CreateJournalRequest): Promise<CreateJournalResponse> => {
  const response = await apiClient.put(`${API_ENDPOINTS.JOURNALS}/${id}`, data);
  return response.data;
};

export const deleteJournal = async (id: number): Promise<CreateJournalResponse> => {
  const response = await apiClient.delete(`${API_ENDPOINTS.JOURNALS}/${id}`);
  return response.data;
};

// Health check
export const healthCheck = async () => {
  const response = await apiClient.get(API_ENDPOINTS.HEALTHCHECK);
  return response.data;
};

export default apiClient;
