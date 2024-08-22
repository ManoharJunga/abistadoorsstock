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
