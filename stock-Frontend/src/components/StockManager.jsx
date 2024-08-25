// src/components/StockManager.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config'; // Import the API_URL

const StockManager = () => {
    const [doors, setDoors] = useState([]);
    const [frames, setFrames] = useState([]);
    const [skins, setSkins] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doorsResponse = await axios.get(`${API_URL}/doors`); // Use API_URL
                const framesResponse = await axios.get(`${API_URL}/door-frames`); // Use API_URL
                const skinsResponse = await axios.get(`${API_URL}/door-skins`); // Use API_URL

                setDoors(doorsResponse.data);
                setFrames(framesResponse.data);
                setSkins(skinsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Stock Manager</h2>
            <h3>Doors</h3>
            <ul>
                {doors.map((door) => (
                    <li key={door._id}>{door.size} - {door.type} - {door.material} - {door.quantity} - ${door.price}</li>
                ))}
            </ul>
            <h3>Frames</h3>
            <ul>
                {frames.map((frame) => (
                    <li key={frame._id}>{frame.size} - {frame.material} - {frame.quantity} - ${frame.price}</li>
                ))}
            </ul>
            <h3>Skins</h3>
            <ul>
                {skins.map((skin) => (
                    <li key={skin._id}>{skin.name} - {skin.color} - {skin.texture} - {skin.quantity} - ${skin.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default StockManager;
