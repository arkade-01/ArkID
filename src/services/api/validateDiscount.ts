import axios from "axios";

export const validateDiscount = async (discountCode: string) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const endpoint = `${apiUrl}/api/discounts/validate/${discountCode}`;

    console.log('Validating discount at:', endpoint);

    const response = await axios.get(endpoint);

    console.log('Discount validation response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Discount validation error:', error);

    if (axios.isAxiosError(error) && error.response) {
      // Return the error response from the API
      console.log('API error response:', error.response.data);
      return error.response.data;
    }

    // For network errors or other issues, throw to be caught by the caller
    throw error;
  }
};