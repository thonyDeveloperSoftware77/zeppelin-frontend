import { useAuth } from "@clerk/clerk-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useDataService = () => {
  const { getToken, refreshSession } = useAuth(); 

  const refreshTokenIfNeeded = async () => {
    try {
      const jwt = await getToken();

      if (!jwt) {
        await refreshSession();
        return await getToken();
      }

      return jwt;
    } catch (error) {
      console.error("Error retrieving or refreshing the token:", error);
      throw new Error("Failed to retrieve or refresh the token");
    }
  };

  const getAuthHeaders = async () => {
    const validToken = await refreshTokenIfNeeded();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${validToken}`,
    };
  };

  const handleResponse = async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.statusText}`);
    }
    return response.json();
  };

  return {
    get: async (endpoint) => {
      const headers = await getAuthHeaders();
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, { method: "GET", headers });
        return handleResponse(response);
      } catch (error) {
        console.error(error);
        throw error;  // This is where you might want to throw the error to handle it in your component
      }
    },

    post: async (endpoint, data) => {
      const headers = await getAuthHeaders();
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        });
        return handleResponse(response);
      } catch (error) {
        console.error(error);
        throw error;  // This is where you might want to throw the error to handle it in your component
      }
    },

    put: async (endpoint, data) => {
      const headers = await getAuthHeaders();
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(data),
        });
        return handleResponse(response);
      } catch (error) {
        console.error(error);
        throw error;  // This is where you might want to throw the error to handle it in your component
      }
    },

    delete: async (endpoint) => {
      const headers = await getAuthHeaders();
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, { method: "DELETE", headers });
        return handleResponse(response);
      } catch (error) {
        console.error(error);
        throw error;  // This is where you might want to throw the error to handle it in your component
      }
    },
  };
};

export default useDataService;
