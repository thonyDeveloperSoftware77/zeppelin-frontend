import { useAuth } from "@clerk/clerk-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const useDataService = () => {
  const { getToken } = useAuth(); 

  const getAuthHeaders = async () => {
    const jwt = await getToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
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
      const response = await fetch(`${BASE_URL}${endpoint}`, { method: "GET", headers });
      return handleResponse(response);
    },

    post: async (endpoint, data) => {
      const headers = await getAuthHeaders();
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },

    put: async (endpoint, data) => {
      const headers = await getAuthHeaders();
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },

    delete: async (endpoint) => {
      const headers = await getAuthHeaders();
      const response = await fetch(`${BASE_URL}${endpoint}`, { method: "DELETE", headers });
      return handleResponse(response);
    },
  };
};

export default useDataService;
