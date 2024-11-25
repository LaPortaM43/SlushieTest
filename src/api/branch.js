// src/api/branch.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/branches'; 

// Fetch all branches
export const getBranches = async () => {
    try {
        const response = await axios.get(`${API_URL}/`); 
        return response.data;
    } catch (error) {
        console.error("Error fetching branches:", error);
        throw error; 
    }
};

// Fetch a single branch by ID
export const getBranchById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`); 
        return response.data;
    } catch (error) {
        console.error("Error fetching branch by ID:", error);
        throw error;
    }
};
