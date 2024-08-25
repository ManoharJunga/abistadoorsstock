// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li><Link to="/add-door">Add Door</Link></li>
                <li><Link to="/add-frame">Add Frame</Link></li>
                <li><Link to="/add-skin">Add Laminate</Link></li>
                <li><Link to="/stock-manager">Stock Manager</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
