// src/components/LoginPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth"; // Assuming this handles the login API call

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      if (response.token) {
        // Store the token (you can use localStorage or a state management solution)
        localStorage.setItem("token", response.token);
        // Store the email in localStorage as well
        localStorage.setItem("email", email);  // Store the email
        // Redirect to the homepage after login
        navigate("/"); // This will redirect to the home page ("/")
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
