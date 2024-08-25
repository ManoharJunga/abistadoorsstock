import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import API_URL from '../config';

const THICKNESS_OPTIONS = [0.72, 0.8, 0.92, 1.00, 1.25]; // Thickness options

const AddSkin = () => {
    const [skinData, setSkinData] = useState({ name: '', thickness: '', quantity: '', unitType: 'pieces', price: '' });
    const [calculatedSquareFeet, setCalculatedSquareFeet] = useState(0);
    const [skins, setSkins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentSkinId, setCurrentSkinId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSkinData({ ...skinData, [name]: value });

        if (name === 'quantity' && skinData.unitType === 'squareFeet') {
            setCalculatedSquareFeet(value * 28);
        }
    };

    const handleUnitTypeChange = (e) => {
        const { value } = e.target;
        setSkinData((prevData) => {
            const quantityInSquareFeet = value === 'squareFeet' ? prevData.quantity * 28 : prevData.quantity;
            setCalculatedSquareFeet(quantityInSquareFeet);
            return {
                ...prevData,
                unitType: value,
                quantity: prevData.quantity,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editMode) {
                await axios.put(`${API_URL}/door-skins/${currentSkinId}`, skinData);
                alert('Skin updated successfully!');
            } else {
                await axios.post(`${API_URL}/door-skins`, skinData);
                alert('Skin added successfully!');
            }
            fetchSkins();
            resetForm();
        } catch (err) {
            console.error(err);
            alert('Failed to add/update skin');
        }
    };

    const resetForm = () => {
        setSkinData({ name: '', thickness: '', quantity: '', unitType: 'pieces', price: '' });
        setCalculatedSquareFeet(0);
        setEditMode(false);
        setCurrentSkinId(null);
    };

    const fetchSkins = async () => {
        try {
            const response = await axios.get(`${API_URL}/door-skins`);
            setSkins(response.data);
        } catch (err) {
            console.error(err);
            alert('Failed to fetch skins');
        }
    };

    useEffect(() => {
        fetchSkins();
    }, []);

    const handleEdit = (skin) => {
        setSkinData(skin);
        setEditMode(true);
        setCurrentSkinId(skin._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this skin?')) {
            try {
                await axios.delete(`${API_URL}/door-skins/${id}`);
                alert('Skin deleted successfully!');
                fetchSkins();
            } catch (err) {
                console.error(err);
                alert('Failed to delete skin');
            }
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSkins = skins.filter(skin =>
        skin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="mb-4">
                <h1 className="mb-3">{editMode ? 'Edit Laminate' : 'Add Laminate'}</h1>
                <div className="row mb-2">
                    <div className="col-md-2">
                        <div className="form-floating mb-2">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={skinData.name}
                                onChange={handleChange}
                                required
                                className="form-control form-control-sm"
                                id="floatingName"
                            />
                            <label htmlFor="floatingName">Name</label>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-floating mb-2">
                            <select
                                name="thickness"
                                value={skinData.thickness}
                                onChange={handleChange}
                                required
                                className="form-control form-control-sm"
                                id="floatingThickness"
                            >
                                <option value="" disabled>Select Thickness</option>
                                {THICKNESS_OPTIONS.map(thickness => (
                                    <option key={thickness} value={thickness}>
                                        {thickness} mm
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="floatingThickness">Thickness</label>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-floating mb-2">
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Sheets"
                                value={skinData.quantity}
                                onChange={handleChange}
                                required
                                className="form-control form-control-sm"
                                id="floatingQuantity"
                            />
                            <label htmlFor="floatingQuantity">Sheets</label>
                            {skinData.unitType === 'squareFeet' && (
                                <div className="text-muted">
                                    Total: {calculatedSquareFeet} square feet
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-floating mb-2">
                            <select
                                name="unitType"
                                value={skinData.unitType}
                                onChange={handleUnitTypeChange}
                                className="form-control form-control-sm"
                                id="floatingUnitType"
                            >
                                <option value="pieces">Pieces</option>
                                <option value="squareFeet">Square Feet</option>
                            </select>
                            <label htmlFor="floatingUnitType">Unit Type</label>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-floating mb-2">
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={skinData.price}
                                onChange={handleChange}
                                required
                                className="form-control form-control-sm"
                                id="floatingPrice"
                            />
                            <label htmlFor="floatingPrice">Price</label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-sm">
                    {editMode ? 'Update Skin' : 'Add Skin'}
                </button>
            </form>

            <h2>Existing Laminates</h2>
            <div className="d-flex justify-content-start mb-3">
                <div className="form-group me-2">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-control form-control-sm"
                        style={{ width: '300px' }}
                    />
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Thickness (mm)</th>
                        <th>Sheets</th>
                        <th>Total Square Feet / Pieces</th>
                        <th>Price ($)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSkins.map(skin => (
                        <tr key={skin._id}>
                            <td>{skin.name}</td>
                            <td>{skin.thickness}</td>
                            <td>{skin.quantity} {skin.unitType === 'squareFeet' ? 'sheets' : ''}</td>
                            <td>
                                {skin.unitType === 'squareFeet'
                                    ? `${skin.quantity * 28} sq ft`
                                    : `${skin.quantity} pieces`}
                            </td>
                            <td>{skin.price}</td>
                            <td>
                                <EditIcon onClick={() => handleEdit(skin)} style={{ cursor: 'pointer', color: 'blue' }} />
                                <DeleteIcon onClick={() => handleDelete(skin._id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddSkin;
