import mongoose from 'mongoose';

const doorFrameSchema = new mongoose.Schema({
    size: { type: String, required: true },
    material: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('DoorFrame', doorFrameSchema);
