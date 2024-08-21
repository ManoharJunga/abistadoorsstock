import DoorFrame from '../models/DoorFrame.model.js';

export const createDoorFrame = async (req, res) => {
    try {
        const newFrame = new DoorFrame(req.body);
        const savedFrame = await newFrame.save();
        res.status(201).json(savedFrame);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getDoorFrames = async (req, res) => {
    try {
        const frames = await DoorFrame.find();
        res.status(200).json(frames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
