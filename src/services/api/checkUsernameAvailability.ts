import axios from "axios";

export const checkUsernameAvailability = async (
  username: string,
  signal?: AbortSignal
) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const endpoint = `${apiUrl}/api/card/${encodeURIComponent(username)}/available`;

  const response = await axios.get(endpoint, { signal });
  return response.data;
};
