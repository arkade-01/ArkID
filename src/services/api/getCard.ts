import axios from "axios";
// import { getAuthToken } from "../config";

export const getCard = async (username: string) => {
  // const authToken = await getAuthToken();
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/card/${username}`);
  return response.data;
};