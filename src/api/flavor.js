// src/api/flavor.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/flavors'; 

export const getFlavors = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;  
  } catch (error) {
    console.error("Error fetching flavors:", error);
    throw error;  
  }
};

// Fetch a single flavor by ID
export const getFlavorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;  
  } catch (error) {
    console.error("Error fetching flavor by ID:", error);
    throw error;
  }
};
