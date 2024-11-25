// src/api/customer.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/customers'; 

export const getCustomerByEmail = async (email) => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);

  if (!token) {
    alert("You need to be logged in to fetch customer data.");
    return; 
  }

  try {
    console.log("Requesting customer with email:", email);
    const response = await axios.get(`${API_URL}/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200 && response.data) {
      console.log("Customer data received:", response.data);
      return response.data;
    } else {
      console.error("Failed to fetch customer data, status code:", response.status);
      alert("Failed to fetch customer data. Please try again.");
      return null;  
    }
  } catch (error) {
    console.error("Error fetching customer by email:", error);
    alert("An error occurred while fetching customer data. Please try again.");
    return null;  
  }
};
