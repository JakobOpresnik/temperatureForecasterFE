import { API_BASE_URL } from '../constants/apiClient';

export const ValidationReportApi = {
  async getAll(): Promise<string[]> {
    const response: Response = await fetch(`${API_BASE_URL}/report/validation`);
    if (!response.ok) {
      throw new Error(`Error fetching validation reports: ${response.status}`);
    }
    return response.json();
  },
};
