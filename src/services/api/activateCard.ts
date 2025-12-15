import axios from "axios";
import { getAuthToken } from "../config";

export const activateCard = async (username: string, redirectUrl: string) => {
  const authToken = await getAuthToken();
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/card/activate`, {
    username,
    redirectUrl,
  }, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};
