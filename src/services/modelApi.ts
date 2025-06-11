import { API_BASE_URL } from '../constants/apiClient';

export const ModelApi = {
  async getAllRegistered(): Promise<string[]> {
    const response: Response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`Errro loading registered models: ${response.status}`);
    }
    const data = response.json();
    return data;
  },

  async getRegisteredByName(name: string): Promise<string> {
    const response: Response = await fetch(
      `${API_BASE_URL}/load_models/${encodeURIComponent(name)}`,
    );
    if (!response.ok) {
      throw new Error(`Error loading registered model with name '${name}': ${response.status}`);
    }
    return response.json();
  },
};
