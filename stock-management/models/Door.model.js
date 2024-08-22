import mongoose from 'mongoose';

const doorSchema = new mongoose.Schema({
    size: { type: String, required: true },
    type: { 
        type: String, 
        required: true, 
        enum: ['single', 'double'],  // Only allow 'single' or 'double' as valid values
    },
    material: { 
        type: String, 
        required: true, 
        enum: ['Mango Wood', 'WPC', 'PVC'],  // Only allow specific materials
    },
    thickness: { 
        type: Number, 
        required: true,  // Thickness is required
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Door', doorSchema);
