// src/components/OrderPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBranches } from '../api/branch';
import { getFlavors } from '../api/flavor';
import { createOrder } from '../api/order';
import { getCustomerByEmail } from '../api/customer';  
import "../components/OrderPage.css";

function OrderPage() {
  const [branches, setBranches] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [flavor1, setFlavor1] = useState(""); 
  const [selectedSecondFlavor, setSelectedSecondFlavor] = useState("");  
  const [selectedThirdFlavor, setSelectedThirdFlavor] = useState("");  
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchesData = await getBranches();
        setBranches(branchesData);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    const fetchFlavors = async () => {
      try {
        const flavorsData = await getFlavors();
        setFlavors(flavorsData);
      } catch (error) {
        console.error("Error fetching flavors:", error);
      }
    };

    fetchBranches();
    fetchFlavors();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const customerEmail = localStorage.getItem("email");
  
    if (!customerEmail) {
      alert("Please log in to place an order.");
      navigate("/login");
      return;
    }
  
    let customerID;
    try {
      const customerData = await getCustomerByEmail(customerEmail);
      console.log(customerData); 
      customerID = customerData.customerID;
    } catch (error) {
      console.error("Error fetching customer ID:", error);
      return;
    }

    const selectedFlavor1ID = flavors.find(flavor => flavor.flavorName === flavor1)?.flavorID;
    const selectedSecondFlavorID = flavors.find(flavor => flavor.flavorName === selectedSecondFlavor)?.flavorID;
    const selectedThirdFlavorID = flavors.find(flavor => flavor.flavorName === selectedThirdFlavor)?.flavorID;
  
    if (!selectedFlavor1ID || !selectedSecondFlavorID || !selectedThirdFlavorID) {
      alert("Please select valid flavors.");
      return;
    }
  
    const orderDetails = {
      customerID,            
      branchID: selectedBranch, 
      flavor1ID: selectedFlavor1ID, 
      flavor2ID: selectedSecondFlavorID, 
      flavor3ID: selectedThirdFlavorID, 
      price: '10',            
      deliveryAddress,       
    };

    console.log("Order details being sent to backend:", orderDetails); 
  
    try {
      // Send the order details to the backend
      const createdOrder = await createOrder(orderDetails);
  
      if (createdOrder) {
        setOrderPlaced(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);  
      alert("An unexpected error occurred while placing your order. Please try again.");
    }
  };

  const goBackHome = () => {
    navigate("/");
  };

  const filterFlavors = (excludeFlavor1, excludeFlavor2, excludeFlavor3) => {
    return flavors.filter(flavor => 
      flavor.flavorName !== excludeFlavor1 && flavor.flavorName !== excludeFlavor2 && flavor.flavorName !== excludeFlavor3
    );
  };

  return (
    <div className="order-container">
      <h1>Order Your Slushie!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="branch">Select Branch:</label>
          <select
            id="branch"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            required
          >
            <option value="">--Select Branch--</option>
            {branches.map((branch) => (
              <option key={branch.branchID} value={branch.branchID}>
                {branch.branchAddress}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="flavor1">Select Base Flavor (Flavor 1):</label>
          <select
            id="flavor1"
            value={flavor1}  
            onChange={(e) => setFlavor1(e.target.value)} 
            required
          >
            <option value="">--Select Base Flavor--</option>
            {flavors.map((flavor) => (
              <option key={flavor.flavorID} value={flavor.flavorName}>
                {flavor.flavorName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="secondFlavor">Select Second Flavor:</label>
          <select
            id="secondFlavor"
            value={selectedSecondFlavor}
            onChange={(e) => setSelectedSecondFlavor(e.target.value)}
            required
          >
            <option value="">--Select Second Flavor--</option>
            {filterFlavors(flavor1, selectedThirdFlavor, "").map((flavor) => (
              <option key={flavor.flavorID} value={flavor.flavorName}>
                {flavor.flavorName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="thirdFlavor">Select Third Flavor:</label>
          <select
            id="thirdFlavor"
            value={selectedThirdFlavor}
            onChange={(e) => setSelectedThirdFlavor(e.target.value)}
            required
          >
            <option value="">--Select Third Flavor--</option>
            {filterFlavors(flavor1, selectedSecondFlavor, "").map((flavor) => (
              <option key={flavor.flavorID} value={flavor.flavorName}>
                {flavor.flavorName}
              </option>
            ))}
          </select>
        </div>

        {/* Delivery Address Input */}
        <div className="form-group">
          <label htmlFor="deliveryAddress">Enter Delivery Address:</label>
          <input
            type="text"
            id="deliveryAddress"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="order-button">
          Place Order
        </button>
      </form>

      <button onClick={goBackHome} className="back-to-home-button">
        Back to Home
      </button>

      {orderPlaced && (
        <div className="order-confirmation">
          <p>Your order has been placed successfully!</p>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
