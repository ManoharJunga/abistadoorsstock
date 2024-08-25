import DoorFrame from '../models/DoorFrame.model.js';

// Create DoorFrame
export const createDoorFrame = async (req, res) => {
    try {
        const { thickness, density, length, quantity } = req.body;

        const doorFrame = new DoorFrame({
            thickness,
            density,
            length,
            quantity,
            runningFeet: length * quantity, // Running feet calculated in the pre-save hook
        });

        const savedDoorFrame = await doorFrame.save();
        res.status(201).json(savedDoorFrame);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all DoorFrames
export const getDoorFrames = async (req, res) => {
    try {
        const doorFrames = await DoorFrame.find();
        res.status(200).json(doorFrames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update DoorFrame
export const updateDoorFrame = async (req, res) => {
    try {
        const { id } = req.params;
        const { thickness, density, length, quantity } = req.body;

        const updatedDoorFrame = await DoorFrame.findByIdAndUpdate(
            id,
            {
                thickness,
                density,
                length,
                quantity,
                runningFeet: length * quantity, // Running feet recalculated
            },
            { new: true }
        );

        res.status(200).json(updatedDoorFrame);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete DoorFrame
export const deleteDoorFrame = async (req, res) => {
    try {
        const { id } = req.params;
        await DoorFrame.findByIdAndDelete(id);
        res.status(200).json({ message: 'Door frame deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
