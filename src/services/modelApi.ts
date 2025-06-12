import { API_BASE_URL } from '../constants/apiClient';
import type { ModelsMetrics } from '../types/model';

export const ModelApi = {
  async getAllRegistered(): Promise<ModelsMetrics> {
    const response: Response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`Error loading registered models: ${response.status}`);
    }
    return response.json();
  },

  async getRegisteredByName(name: string): Promise<string> {
    const response: Response = await fetch(`${API_BASE_URL}/load_models/${name}`);
    if (!response.ok) {
      throw new Error(`Error loading registered model with name '${name}': ${response.status}`);
    }
    return response.json();
  },
};
