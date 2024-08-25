// src/pages/Dashboard.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AddDoor from '../components/AddDoor';
import AddFrame from '../components/AddFrame';
import AddSkin from '../components/AddSkin';
import StockManager from '../components/StockManager';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Header />
            <Sidebar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Navigate to="stock-manager" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
