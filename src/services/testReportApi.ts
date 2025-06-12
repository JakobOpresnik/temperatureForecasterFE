import { API_BASE_URL } from '../constants/apiClient';

export const TestReportApi = {
  async getAll(): Promise<string[]> {
    const response: Response = await fetch(`${API_BASE_URL}/report/test`);
    if (!response.ok) {
      throw new Error(`Error fetching test reports: ${response.status}`);
    }
    return response.json();
  },

  async getByStation(name: string): Promise<string> {
    const response: Response = await fetch(`${API_BASE_URL}/report/test/${name}`);
    if (!response.ok) {
      throw new Error(`Error fetching test report for station '${name}': ${response.status}`);
    }
    return response.json();
  },
};
