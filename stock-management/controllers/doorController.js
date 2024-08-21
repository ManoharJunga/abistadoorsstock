import Door from '../models/Door.model.js';

export const createDoor = async (req, res) => {
    try {
        const newDoor = new Door(req.body);
        const savedDoor = await newDoor.save();
        res.status(201).json(savedDoor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getDoors = async (req, res) => {
    try {
        const doors = await Door.find();
        res.status(200).json(doors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
