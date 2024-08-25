import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AddFrame = () => {
    const [frameData, setFrameData] = useState({ thickness: '', density: '', length: '', quantity: '', runningFeet: 0 });
    const [frames, setFrames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesCount, setEntriesCount] = useState(5);
    const [editMode, setEditMode] = useState(false);
    const [currentFrameId, setCurrentFrameId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...frameData, [name]: value };

        // Calculate runningFeet whenever length or quantity changes
        if (name === 'length' || name === 'quantity') {
            const length = parseFloat(newData.length) || 0;
            const quantity = parseFloat(newData.quantity) || 0;
            newData.runningFeet = length * quantity;
        }

        setFrameData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const frameExists = frames.some(frame => 
            frame.thickness === frameData.thickness && 
            frame.density === frameData.density && 
            frame.length === frameData.length &&
            frame._id !== currentFrameId
        );

        if (frameExists) {
            alert('A frame with this thickness, density, and length already exists. Please choose different values.');
            return;
        }

        try {
            if (editMode) {
                await axios.put(`${API_URL}/doorframes/${currentFrameId}`, frameData);
                alert('Frame updated successfully!');
            } else {
                await axios.post(`${API_URL}/doorframes`, frameData);
                alert('Frame added successfully!');
            }
            fetchFrames();
            resetForm();
        } catch (err) {
            console.error(err);
            alert('Failed to add/update frame');
        }
    };

    const resetForm = () => {
        setFrameData({ thickness: '', density: '', length: '', quantity: '', runningFeet: 0 });
        setEditMode(false);
        setCurrentFrameId(null);
    };

    const fetchFrames = async () => {
        try {
            const response = await axios.get(`${API_URL}/doorframes`);
            setFrames(response.data);
        } catch (err) {
            console.error(err);
            alert('Failed to fetch frames');
        }
    };

    useEffect(() => {
        fetchFrames();
    }, []);

    const handleEdit = (frame) => {
        setFrameData(frame);
        setEditMode(true);
        setCurrentFrameId(frame._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this frame?')) {
            try {
                await axios.delete(`${API_URL}/doorframes/${id}`);
                alert('Frame deleted successfully!');
                fetchFrames();
            } catch (err) {
                console.error(err);
                alert('Failed to delete frame');
            }
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredFrames = frames.filter(frame =>
        frame.thickness.toString().includes(searchTerm) ||
        frame.density.toString().includes(searchTerm) ||
        frame.length.toString().includes(searchTerm)
    );

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="mb-4">
                <h1 className="mb-3">{editMode ? 'Edit Frame' : 'Add Frame'}</h1>
                <div className="row mb-2">
                    <div className="col-md-4">
                        <input type="text" name="thickness" placeholder="Thickness" value={frameData.thickness} onChange={handleChange} required className="form-control form-control-sm" />
                    </div>
                    <div className="col-md-4">
                        <input type="number" name="density" placeholder="Density" value={frameData.density} onChange={handleChange} required className="form-control form-control-sm" />
                    </div>
                    <div className="col-md-4">
                        <input type="number" name="length" placeholder="Length" value={frameData.length} onChange={handleChange} required className="form-control form-control-sm" />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-4">
                        <input type="number" name="quantity" placeholder="Quantity" value={frameData.quantity} onChange={handleChange} required className="form-control form-control-sm" />
                    </div>
                    <div className="col-md-4">
                        <input type="text" name="runningFeet" placeholder="Running Feet" value={frameData.runningFeet} readOnly className="form-control form-control-sm" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-sm">{editMode ? 'Update Frame' : 'Add Frame'}</button>
            </form>

            <h2>Existing Frames</h2>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Search by thickness, density, or length"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control form-control-sm"
                />
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Thickness</th>
                        <th>Density</th>
                        <th>Length</th>
                        <th>Quantity</th>
                        <th>Running Feet</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFrames.slice(0, entriesCount).map(frame => (
                        <tr key={frame._id}>
                            <td>{frame.thickness}</td>
                            <td>{frame.density}</td>
                            <td>{frame.length}</td>
                            <td>{frame.quantity}</td>
                            <td>{frame.runningFeet}</td>
                            <td>
                                <EditIcon onClick={() => handleEdit(frame)} style={{ cursor: 'pointer', color: 'blue' }} />
                                <DeleteIcon onClick={() => handleDelete(frame._id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddFrame;
