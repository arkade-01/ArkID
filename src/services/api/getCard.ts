import axios from "axios";

export const getCard = async (username: string) => {
  if (!username) {
    throw new Error('Username is required');
  }
  
  // Use proxy in development, full URL in production
  const isDevelopment = import.meta.env.DEV;
  const fullUrl = isDevelopment 
    ? `/api/card/${username}` 
    : `${import.meta.env.VITE_API_URL}/api/card/${username}`;

  try {
    const response = await axios.get(fullUrl, {
      timeout: 15000, // 15 second timeout
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // Add these for CORS
      withCredentials: false,
      // Handle CORS preflight
      validateStatus: function (status) {
        return status < 600; // Accept any status less than 600 (including 4xx and 5xx)
      }
    });

    // If it's a 500 error but we got a response, treat it as a CORS/server issue
    if (response.status >= 500) {
      throw new Error(`Server error: ${response.status}. This might be a CORS issue.`);
    }
    
    // Handle 404 or other client errors that might contain useful data
    if (response.status >= 400 && response.status < 500) {
      if (response.data && typeof response.data === 'object') {
        return response.data; // Return the error response from API
      } else {
        throw new Error(`Client error: ${response.status} ${response.statusText}`);
      }
    }
    
    return response.data;
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        throw new Error('Cannot connect to server. Please check your internet connection and try again.');
      } else if (error.code === 'ENOTFOUND') {
        throw new Error('Server not found. Please check the API URL.');
      } else if (error.response) {
        // Handle specific status codes
        if (error.response.status === 404) {
          return { success: false, message: "Card not found" };
        } else if (error.response.status === 500) {
          throw new Error('Server error (500). This might be a CORS configuration issue on the backend.');
        } else {
          throw new Error(`Server error ${error.response.status}: ${error.response.statusText}`);
        }
      } else if (error.request) {
        // Request made but no response (likely CORS)
        throw new Error('No response from server. This is likely a CORS issue - the backend needs to allow requests from your domain.');
      } else {
        // Request setup error
        throw new Error(`Request setup error: ${error.message}`);
      }
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};
