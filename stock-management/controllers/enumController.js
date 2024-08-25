import Door from '../models/Door.model.js';

// Get enum values for material and type
export const getDoorEnums = async (req, res) => {
    try {
        const materialEnum = Door.schema.path('material').enumValues;
        const typeEnum = Door.schema.path('type').enumValues;

        res.status(200).json({ materials: materialEnum, types: typeEnum });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
