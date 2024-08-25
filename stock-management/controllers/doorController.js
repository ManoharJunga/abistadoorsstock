import mongoose from 'mongoose';
import Door from '../models/Door.model.js';

// Create doors
export const createDoors = async (req, res) => {
    try {
        const doors = req.body; // Expecting an array of doors

        // Use insertMany to handle bulk insertion
        const savedDoors = await Door.insertMany(doors);

        res.status(201).json(savedDoors);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};


// Update door stock quantity
export const updateDoorStock = async (req, res) => {
    const { id } = req.params; // Get the door ID from request parameters
    const { quantity } = req.body; // Get the quantity to add from request body

    try {
        // Find the door by ID and increment the quantity
        const updatedDoor = await Door.findByIdAndUpdate(
            id,
            { $inc: { quantity: quantity } }, // Increment the quantity by the specified amount
            { new: true } // Return the updated document
        );

        if (!updatedDoor) {
            return res.status(404).json({ message: 'Door not found' });
        }

        res.status(200).json(updatedDoor); // Return the updated door
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all doors
export const getDoors = async (req, res) => {
    try {
        const doors = await Door.find();
        res.status(200).json(doors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get doors by material
export const getDoorsByMaterial = async (req, res) => {
    const { material } = req.params; // Get the material from request parameters

    try {
        const doors = await Door.find({ material }); // Find doors with the specified material
        res.status(200).json(doors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get doors by type
export const getDoorsByType = async (req, res) => {
    const { type } = req.params; // Get the type from request parameters

    try {
        const doors = await Door.find({ type }); // Find doors with the specified type
        res.status(200).json(doors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update a door
export const updateDoor = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedDoor = await Door.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedDoor) return res.status(404).json({ message: 'Door not found' });
        res.json(updatedDoor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a door
export const deleteDoor = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDoor = await Door.findByIdAndDelete(id);
        if (!deletedDoor) return res.status(404).json({ message: 'Door not found' });
        res.json({ message: 'Door deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};