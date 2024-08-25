import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AddDoor = () => {
    const [doorData, setDoorData] = useState({ size: '', type: '', material: '', thickness: '', quantity: '', price: '' });
    const [doors, setDoors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [materialFilter, setMaterialFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [materials, setMaterials] = useState([]);
    const [types, setTypes] = useState([]);
    const [entriesCount, setEntriesCount] = useState(5);
    const [editMode, setEditMode] = useState(false); // State to control edit mode
    const [currentDoorId, setCurrentDoorId] = useState(null); // State to store the ID of the door being edited

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoorData({ ...doorData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if a door with the same size, material, and type already exists
        const doorExists = doors.some(door => 
            door.size === doorData.size && 
            door.material === doorData.material && 
            door.type === doorData.type &&
            door._id !== currentDoorId // Exclude the current door in edit mode
        );

        if (doorExists) {
            alert('A door with this size, material, and type already exists. Please choose different values.');
            return; // Exit the function to prevent adding the door
        }

        try {
            if (editMode) {
                // Update the existing door
                await axios.put(`${API_URL}/doors/${currentDoorId}`, doorData);
                alert('Door updated successfully!');
            } else {
                // Create a new door
                await axios.post(`${API_URL}/doors`, doorData);
                alert('Door added successfully!');
            }
            fetchDoors(); // Fetch doors after adding/updating a door
            resetForm(); // Reset form after submission
        } catch (err) {
            console.error(err);
            alert('Failed to add/update door');
        }
    };

    const resetForm = () => {
        setDoorData({ size: '', type: '', material: '', thickness: '', quantity: '', price: '' });
        setEditMode(false);
        setCurrentDoorId(null);
    };

    const fetchDoors = async () => {
        try {
            const response = await axios.get(`${API_URL}/doors`);
            setDoors(response.data);
        } catch (err) {
            console.error(err);
            alert('Failed to fetch doors');
        }
    };

    const fetchEnums = async () => {
        try {
            const response = await axios.get(`${API_URL}/enums/door-enums`);
            setMaterials(response.data.materials);
            setTypes(response.data.types);
        } catch (err) {
            console.error('Failed to fetch enum values:', err);
        }
    };

    useEffect(() => {
        fetchDoors();
        fetchEnums();
    }, []);

    const handleEdit = (door) => {
        setDoorData(door); // Populate form with the selected door data
        setEditMode(true);
        setCurrentDoorId(door._id); // Set current door ID for updating
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this door?')) {
            try {
                await axios.delete(`${API_URL}/doors/${id}`);
                alert('Door deleted successfully!');
                fetchDoors(); // Refresh the door list after deletion
            } catch (err) {
                console.error(err);
                alert('Failed to delete door');
            }
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredDoors = doors
        .filter(door =>
            (door.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
                door.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                door.material.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (materialFilter ? door.material === materialFilter : true) &&
            (typeFilter ? door.type === typeFilter : true)
        );

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="mb-4">
                <h1 className="mb-3">{editMode ? 'Edit Door' : 'Add Door'}</h1>
                <div className="row mb-2">
                    <div className="col-md-4">
                        <input type="text" name="size" placeholder="Size" value={doorData.size} onChange={handleChange} required className="form-control form-control-sm" />
                    </div>
                    <div className="col-md-4">
                        <select name="material" value={doorData.material} onChange={handleChange} required className="form-select form-select-sm">
                            <option value="">Select Material</option>
                            {materials.map((material, index) => (
                                <option key={index} value={material}>{material}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select name="type" value={doorData.type} onChange={handleChange} required className="form-select form-select-sm">
                            <option value="">Select Type</option>
                            {types.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-4">
                        <input type="number" name="thickness" placeholder="Thickness" value={doorData.thickness} onChange={handleChange} required className="form-control form-control-sm" />
                    </div>
                    <div className="col-md-4">
                        <input type="number" name="quantity" placeholder="Quantity" value={doorData.quantity} onChange={handleChange} required className="form-control form-control-sm" />
                    </div>
                    <div className="col-md-4">
                        <input type="number" name="price" placeholder="Price" value={doorData.price} onChange={handleChange} required className="form-control form-control-sm" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-sm">{editMode ? 'Update Door' : 'Add Door'}</button>
            </form>

            <h2>Existing Doors</h2>
            <div className="d-flex justify-content-start mb-3">
                <div className="form-group me-2">
                    <input
                        type="text"
                        placeholder="Search by size, type, or material"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-control form-control-sm"
                        style={{ width: '200px' }}
                    />
                </div>

                <div className="form-group me-2">
                    <select className="form-select form-select-sm" onChange={(e) => setMaterialFilter(e.target.value)} value={materialFilter} style={{ width: '150px' }}>
                        <option value="">Filter by Material</option>
                        {materials.map((material, index) => (
                            <option key={index} value={material}>{material}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <select className="form-select form-select-sm" onChange={(e) => setTypeFilter(e.target.value)} value={typeFilter} style={{ width: '150px' }}>
                        <option value="">Filter by Type</option>
                        {types.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="entriesCount" className="me-2">Show:</label>
                <select id="entriesCount" className="form-select form-select-sm d-inline" style={{ width: '80px' }} value={entriesCount} onChange={(e) => setEntriesCount(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
                <span className="ms-2">entries</span>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Material</th>
                        <th>Thickness (mm)</th>
                        <th>Quantity</th>
                        <th>Price ($)</th>
                        <th>Actions</th> {/* Add a header for actions */}
                    </tr>
                </thead>
                <tbody>
                    {filteredDoors.slice(0, entriesCount).map(door => (
                        <tr key={door._id}>
                            <td>{door.size}</td>
                            <td>{door.type}</td>
                            <td>{door.material}</td>
                            <td>{door.thickness}</td>
                            <td>{door.quantity}</td>
                            <td>{door.price}</td>
                            <td>
                                <EditIcon onClick={() => handleEdit(door)} style={{ cursor: 'pointer', color: 'blue' }} />
                                <DeleteIcon onClick={() => handleDelete(door._id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddDoor;
