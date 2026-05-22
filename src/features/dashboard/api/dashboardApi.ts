import { apiClient } from '../../../services/apiClient';
import type { ApiResponse } from '../../auth/api/authApi';

export interface ApiProfileData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
}

export const getProfileApi = async (): Promise<ApiResponse<ApiProfileData>> => {
  const response = await apiClient.get<ApiResponse<ApiProfileData>>('/profile');
  return response.data;
};

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
}

export const updateProfileApi = async (payload: UpdateProfilePayload): Promise<ApiResponse<ApiProfileData>> => {
  const response = await apiClient.put<ApiResponse<ApiProfileData>>('/profile/update', payload);
  return response.data;
};

export const updateProfileImageApi = async (file: File): Promise<ApiResponse<ApiProfileData>> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.put<ApiResponse<ApiProfileData>>('/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export interface ApiBalanceData {
  balance: number;
}

export const getBalanceApi = async (): Promise<ApiResponse<ApiBalanceData>> => {
  const response = await apiClient.get<ApiResponse<ApiBalanceData>>('/balance');
  return response.data;
};

export interface ApiServiceItem {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export const getServicesApi = async (): Promise<ApiResponse<ApiServiceItem[]>> => {
  const response = await apiClient.get<ApiResponse<ApiServiceItem[]>>('/services');
  return response.data;
};

export interface ApiBannerItem {
  banner_name: string;
  banner_image: string;
  description: string;
}

export const getBannersApi = async (): Promise<ApiResponse<ApiBannerItem[]>> => {
  const response = await apiClient.get<ApiResponse<ApiBannerItem[]>>('/banner');
  return response.data;
};

export interface CreateTransactionPayload {
  service_code: string;
}

export interface ApiTransactionData {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
}

export const createTransactionApi = async (payload: CreateTransactionPayload): Promise<ApiResponse<ApiTransactionData>> => {
  const response = await apiClient.post<ApiResponse<ApiTransactionData>>('/transaction', payload);
  return response.data;
};

export interface TopUpPayload {
  top_up_amount: number;
}

export interface ApiTopUpData {
  balance: number;
}

export const postTopUpApi = async (payload: TopUpPayload): Promise<ApiResponse<ApiTopUpData>> => {
  const response = await apiClient.post<ApiResponse<ApiTopUpData>>('/topup', payload);
  return response.data;
};

export interface ApiTransactionHistoryItem {
  invoice_number: string;
  transaction_type: 'TOPUP' | 'PAYMENT';
  description: string;
  total_amount: number;
  created_on: string;
}

export interface ApiTransactionHistoryData {
  offset: number;
  limit: number;
  records: ApiTransactionHistoryItem[];
}

export const getTransactionHistoryApi = async (
  offset: number,
  limit: number
): Promise<ApiResponse<ApiTransactionHistoryData>> => {
  const response = await apiClient.get<ApiResponse<ApiTransactionHistoryData>>(
    '/transaction/history',
    {
      params: { offset, limit },
    }
  );
  return response.data;
};


