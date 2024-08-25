import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [doors, setDoors] = useState([]);
    const [skins, setSkins] = useState([]);
    const [selectedDoor, setSelectedDoor] = useState('');
    const [selectedSkin, setSelectedSkin] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/doors`).then(res => setDoors(res.data));
        axios.get(`${API_URL}/door-skins`).then(res => setSkins(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newProduct = { name, door: selectedDoor, skin: selectedSkin, quantity };
            await axios.post(`${API_URL}/products`, newProduct);
            setMessage('Product added successfully');
        } catch (error) {
            setMessage('Failed to add product');
        }
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Select Door</label>
                    <select value={selectedDoor} onChange={(e) => setSelectedDoor(e.target.value)} required>
                        <option value="">Select Door</option>
                        {doors.map(door => (
                            <option key={door._id} value={door._id}>{door.size} - {door.material}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Select Door Skin</label>
                    <select value={selectedSkin} onChange={(e) => setSelectedSkin(e.target.value)} required>
                        <option value="">Select Door Skin</option>
                        {skins.map(skin => (
                            <option key={skin._id} value={skin._id}>{skin.name} - {skin.thickness}mm</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" required />
                </div>
                <button type="submit">Add Product</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddProduct;
