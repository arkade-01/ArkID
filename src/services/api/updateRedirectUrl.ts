import axios from "axios";
import { getAuthToken } from "../config";

export const updateRedirectUrl = async ( redirectUrl: string) => {
  const authToken = await getAuthToken();
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/card/update`, {
    redirectUrl,
  }, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};