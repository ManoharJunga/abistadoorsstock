// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for routing

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the username and password match the specified values
        if (username === 'manohar' && password === '1234567890') {
            // Store the token or user info in localStorage or state management
            alert('Login successful!');
            // Redirect to the dashboard or home page
            navigate('/dashboard/*'); // Adjust this path as needed
        } else {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
