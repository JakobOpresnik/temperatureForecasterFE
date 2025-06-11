import { API_BASE_URL } from "../constants/apiClient";

export const getRegisteredModels = async (): Promise<string[]> => {
    const response: Response = await fetch(API_BASE_URL)
    if (!response.ok) {
        throw new Error(`Errro loading registered models: ${response.status}`)
    }
    const data = response.json()
    return data

    /*  try {
      const response: Response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('data: ', data);
    //   setModels(data);
    } catch (err) {
      console.log(err);
    } */
  };