// src/App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MenuPage from "./components/MenuPage";
import LoginPage from "./components/LoginPage";
import OrderPage from "./components/OrderPage";
import BranchesList from "./components/BranchesList"; 

function App() {
  return (
    // <Router basename="/Slushie"> 
    <Router> {/* Add the basename prop here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/branches" element={<BranchesList />} />
      </Routes>
    </Router>
  );
}

export default App;
