import Door from '../models/Door.model.js'; // Adjusted import to match your model file naming convention

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


export const getDoors = async (req, res) => {
    try {
        const doors = await Door.find();
        res.status(200).json(doors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
