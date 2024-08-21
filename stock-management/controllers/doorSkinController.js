import DoorSkin from '../models/DoorSkin.model.js';

export const createDoorSkin = async (req, res) => {
    try {
        const newSkin = new DoorSkin(req.body);
        const savedSkin = await newSkin.save();
        res.status(201).json(savedSkin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getDoorSkins = async (req, res) => {
    try {
        const skins = await DoorSkin.find();
        res.status(200).json(skins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
