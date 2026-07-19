import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface CodeRequest {
  code: string;
  language: string;
}

export interface GreenOpsAudit {
  original_complexity: string;
  optimized_complexity: string;
  carbon_penalty_score: number;
  explanation: string;
  optimized_code: string;
}

export interface HealthResponse {
  status: string;
  service: string;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 45000, // 45 second timeout for AI operations
});

export const checkHealth = async (): Promise<HealthResponse> => {
  const response = await apiClient.get<HealthResponse>('/api/health');
  return response.data;
};

export const auditCode = async (payload: CodeRequest): Promise<GreenOpsAudit> => {
  const response = await apiClient.post<GreenOpsAudit>('/api/audit', payload);
  return response.data;
};
