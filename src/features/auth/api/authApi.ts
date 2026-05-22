import { apiClient } from '../../../services/apiClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T | null;
}

export interface LoginResponseData {
  token: string;
}

export const loginApi = async (payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> => {
  const response = await apiClient.post<ApiResponse<LoginResponseData>>('/login', payload);
  return response.data;
};

export const registerApi = async (payload: RegisterPayload): Promise<ApiResponse<null>> => {
  const response = await apiClient.post<ApiResponse<null>>('/registration', payload);
  return response.data;
};
