import DoorSkin from '../models/DoorSkin.model.js';

// Create a new door skin
export const createDoorSkin = async (req, res) => {
    try {
        const { name, thickness, quantity, unitType, price } = req.body;

        // Validate required fields
        if (!name || !thickness || !unitType || !quantity || !price) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // Check if a door skin with the same name already exists
        const existingSkin = await DoorSkin.findOne({ name });
        let totalQuantity;

        if (existingSkin) {
            // If it exists, add the new quantity to the existing quantity
            totalQuantity = existingSkin.quantity + quantity;
            existingSkin.quantity = totalQuantity; // Update the existing skin's quantity
            await existingSkin.save(); // Save the updated skin
            res.status(200).json({
                ...existingSkin.toObject(),
                sheets: totalQuantity,  // Rename quantity to sheets in the response
                squareFeetTotal: existingSkin.unitType === 'squareFeet' ? totalQuantity * 28 : 0,  // Add square feet total to the response
            });
        } else {
            // If it does not exist, create a new DoorSkin
            const newSkin = new DoorSkin({
                name,
                thickness,
                quantity,  // Keep quantity in the database as 'quantity'
                unitType,
                price,
            });

            const savedSkin = await newSkin.save();

            // Respond with the saved skin data and include calculated square feet if applicable
            res.status(201).json({
                ...savedSkin.toObject(),
                sheets: savedSkin.quantity,  // Rename quantity to sheets in the response
                squareFeetTotal: unitType === 'squareFeet' ? quantity * 28 : 0,  // Add square feet total to the response
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all door skins
export const getAllDoorSkins = async (req, res) => {
    try {
        const skins = await DoorSkin.find();

        // Add calculated square feet or pieces based on the unit type for each skin
        const skinsWithCalculatedFields = skins.map(skin => ({
            ...skin.toObject(),
            sheets: skin.quantity,  // Rename quantity to sheets in the response
            squareFeetTotal: skin.unitType === 'squareFeet' ? skin.quantity * 28 : 0,  // Add square feet total to the response
        }));

        res.json(skinsWithCalculatedFields);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a door skin
export const updateDoorSkin = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedSkin = await DoorSkin.findById(id);
        if (!updatedSkin) return res.status(404).json({ message: 'Door skin not found' });

        const { quantity } = req.body;

        // If quantity is provided, add it to the existing quantity
        if (quantity) {
            updatedSkin.quantity += quantity;
        }

        // Update the other fields
        Object.assign(updatedSkin, req.body); // Merge other fields

        const savedSkin = await updatedSkin.save();

        // Add calculated square feet or pieces based on the unit type for the updated skin
        const updatedSkinWithCalculatedFields = {
            ...savedSkin.toObject(),
            sheets: savedSkin.quantity,  // Rename quantity to sheets in the response
            squareFeetTotal: savedSkin.unitType === 'squareFeet' ? savedSkin.quantity * 28 : 0,  // Add square feet total to the response
        };

        res.json(updatedSkinWithCalculatedFields);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a door skin
export const deleteDoorSkin = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSkin = await DoorSkin.findByIdAndDelete(id);
        if (!deletedSkin) return res.status(404).json({ message: 'Door skin not found' });

        res.json({ message: 'Door skin deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
