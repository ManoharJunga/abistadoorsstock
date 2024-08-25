// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AddDoor from './components/AddDoor';
import AddFrame from './components/AddFrame';
import AddSkin from './components/AddSkin';
import StockManager from './components/StockManager';
import 'bootstrap/dist/css/bootstrap.min.css';
import StockEntry from './components/StockEntry';
import AddProduct from './components/AddProduct';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="add-door" element={<AddDoor />} />
        <Route path="add-frame" element={<AddFrame />} />
        <Route path="add-skin" element={<AddSkin />} />
        <Route path="stock-manager" element={<StockManager />} />
        <Route path="/stock-entry" element={<StockEntry />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
