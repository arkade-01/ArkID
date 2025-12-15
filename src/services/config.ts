import { getAccessToken } from "@privy-io/react-auth";

export const getAuthToken = async () => {
  const accessToken = await getAccessToken();
  return accessToken;
};