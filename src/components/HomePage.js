// src/components/HomePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const email = localStorage.getItem("email"); 
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="homepage">
      <div className="top-bar">
        <div className="menu-icon" onClick={toggleMenu}>☰</div>
        <div className="auth-buttons">
          {/* Show Logout and email only if user is logged in */}
          {localStorage.getItem("token") ? (
            <div>
              <span>{userEmail}</span> {/* Display the user's email */}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      </div>
      <div className={`menu ${menuOpen ? "show" : ""}`}>
        <p>Slushie Deluxe</p>
        <button onClick={() => navigate("/menu")}>Menu</button>
        <button onClick={() => navigate("/branches")}>Branches</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
      <div className="content">
        <h1>Welcome to Slushie Deluxe!</h1>
        <button className="order-button" onClick={() => navigate("/order")}>
          Place Your Order
        </button>
      </div>
    </div>
  );
}

export default HomePage;


