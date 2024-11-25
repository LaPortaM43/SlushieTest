// src/api/auth.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth'; 

export const register = async (name, email, password, address) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        customerName: name,
        customerEmail: email,
        customerPassword: password,
        customerAddress: address,
      });
      return response.data;
    } catch (error) {
      console.error("Error in register function:", error.response?.data || error.message);
      throw error;
    }
  };
  

  export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        customerEmail: email,
        customerPassword: password,
      });
  
      if (response.data.token) {
        return { token: response.data.token };
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

// Fetch profile
export const getProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,  
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;  
    }
};