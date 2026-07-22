import axios from "axios";

export const validateDiscount = async (discountCode: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const endpoint = `${apiUrl}/api/discounts/validate/${discountCode}`;

    const response = await axios.get(endpoint);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Return the error response from the API
      return error.response.data;
    }

    // For network errors or other issues, throw to be caught by the caller
    throw error;
  }
};