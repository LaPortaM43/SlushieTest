// src/components/BranchesList.js

import React, { useEffect, useState } from 'react';
import { getBranches } from '../api/branch'; 
import { useNavigate } from 'react-router-dom';

const BranchesList = () => {
    const [branches, setBranches] = useState([]);
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const data = await getBranches();
                setBranches(data);
            } catch (error) {
                setError("Failed to fetch branches.");
                console.error("Error fetching branches:", error);
            }
        };

        fetchBranches();
    }, []);

    if (error) {
        return <div>{error}</div>;  
    }

    return (
        <div>
            <button onClick={() => navigate('/')}>Back to Homepage</button> {/* Button for navigation */}
            <ul>
                {branches.map((branch) => (
                    <li key={branch.branchID}>
                        <strong>{branch.branchName}</strong> <br />
                        {/* Make sure to use the correct field name for the address */}
                        <p>Address: {branch.branchAddress}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BranchesList;

