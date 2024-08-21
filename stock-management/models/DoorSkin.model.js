import mongoose from 'mongoose';

const doorSkinSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    texture: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('DoorSkin', doorSkinSchema);
