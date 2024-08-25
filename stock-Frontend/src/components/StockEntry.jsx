import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockEntry = () => {
    const [doors, setDoors] = useState([]); // State to store fetched doors
    const [selectedDoorId, setSelectedDoorId] = useState(""); // State to track selected door
    const [doorQuantity, setDoorQuantity] = useState(""); // State for new door quantity

    const [laminates, setLaminates] = useState([]); // State to store fetched laminates
    const [selectedLaminateId, setSelectedLaminateId] = useState(""); // State to track selected laminate
    const [laminateQuantity, setLaminateQuantity] = useState(""); // State for new laminate quantity

    const fetchDoors = async () => {
        try {
            const response = await axios.get(`${API_URL}/doors`);
            setDoors(response.data); // Set the fetched doors to state
        } catch (err) {
            console.error(err);
            alert('Failed to fetch doors');
        }
    };

    const fetchLaminates = async () => {
        try {
            const response = await axios.get(`${API_URL}/door-skins`); // Adjust the endpoint accordingly
            setLaminates(response.data); // Set the fetched laminates to state
        } catch (err) {
            console.error(err);
            alert('Failed to fetch laminates');
        }
    };

    useEffect(() => {
        fetchDoors(); // Fetch doors when the component mounts
        fetchLaminates(); // Fetch laminates when the component mounts
    }, []);

    const handleDoorStockEntry = async (e) => {
        e.preventDefault();
    
        if (!selectedDoorId || !doorQuantity) {
            alert('Please select a door and enter quantity.');
            return;
        }
    
        try {
            await axios.put(`${API_URL}/doors/${selectedDoorId}/stock`, {
                quantity: Number(doorQuantity) // Send the quantity to add
            });
    
            alert('Stock entry for door added successfully!');
            fetchDoors(); // Refresh the list of doors
            setSelectedDoorId(""); // Reset selected door
            setDoorQuantity(""); // Reset quantity
        } catch (err) {
            console.error(err);
            alert('Failed to update door stock entry');
        }
    };

    const handleLaminateStockEntry = async (e) => {
        e.preventDefault();
    
        if (!selectedLaminateId || !laminateQuantity) {
            alert('Please select a laminate and enter quantity.');
            return;
        }
    
        try {
            await axios.put(`${API_URL}/laminates/${selectedLaminateId}/stock`, {
                quantity: Number(laminateQuantity)
            });
    
            alert('Laminate stock entry added successfully!');
            fetchLaminates(); // Refresh the list of laminates
            setSelectedLaminateId(""); // Reset selected laminate
            setLaminateQuantity(""); // Reset quantity
        } catch (err) {
            console.error(err);
            alert('Failed to update laminate stock entry');
        }
    };
    

    return (
        <div className="container mt-5">
            <h1 className="mb-3">Stock Entry</h1>

            {/* Door Stock Entry */}
            <form onSubmit={handleDoorStockEntry} className="mb-4">
                <h2 className="mb-3">Door Stock Entry</h2>
                <div className="mb-3">
                    <select
                        className="form-select"
                        value={selectedDoorId}
                        onChange={(e) => setSelectedDoorId(e.target.value)}
                        required
                    >
                        <option value="">Select a Door</option>
                        {doors.map(door => (
                            <option key={door._id} value={door._id}>
                                {door.size} - {door.type} - {door.material}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        placeholder="New Quantity"
                        value={doorQuantity}
                        onChange={(e) => setDoorQuantity(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Door Stock</button>
            </form>

            {/* Laminate Stock Entry */}
            <form onSubmit={handleLaminateStockEntry} className="mb-4">
                <h2 className="mb-3">Laminate Stock Entry</h2>
                <div className="mb-3">
                    <select
                        className="form-select"
                        value={selectedLaminateId}
                        onChange={(e) => setSelectedLaminateId(e.target.value)}
                        required
                    >
                        <option value="">Select a Laminate</option>
                        {laminates.map(laminate => (
                            <option key={laminate._id} value={laminate._id}>
                                {laminate.name} - {laminate.thickness} mm
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        placeholder="New Quantity"
                        value={laminateQuantity}
                        onChange={(e) => setLaminateQuantity(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Laminate Stock</button>
            </form>
        </div>
    );
};

export default StockEntry;
