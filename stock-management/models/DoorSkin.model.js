import mongoose from 'mongoose';

const doorSkinSchema = new mongoose.Schema({
    name: { type: String, required: true },                 // Name of the door skin
    thickness: { 
        type: Number, 
        required: true, 
        enum: [0.72, 0.8, 0.92, 1.00, 1.25],               // Allowed thickness values
        validate: {
            validator: function(value) {
                return [0.72, 0.8, 0.92, 1.00, 1.25].includes(value);
            },
            message: props => `${props.value} is not a valid thickness!`
        }
    },
    quantity: { type: Number, required: true, min: 0 },     // Quantity (for pieces) or total square feet
    unitType: { type: String, required: true, enum: ['pieces', 'squareFeet'] }, // Unit type
    price: { type: Number, required: true, min: 0 },        // Price of the door skin in $
}, { timestamps: true });

export default mongoose.model('DoorSkin', doorSkinSchema);
