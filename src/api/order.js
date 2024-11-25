// src/api/order.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/orders'; 

// Create an order
export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }

    const response = await axios.post('http://localhost:8000/api/orders', orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return response.data;  
    } else {
      console.error("Failed to create order. Status code:", response.status);
      throw new Error("Failed to create order");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("An unexpected error occurred while placing your order. Please try again.");
  }
};


