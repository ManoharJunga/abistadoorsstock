import mongoose from 'mongoose';

const doorFrameSchema = new mongoose.Schema({
    thickness: { type: String, required: true },
    density: { type: Number, required: true },
    length: { type: Number, required: true },
    quantity: { type: Number, required: true },
    runningFeet: { type: Number, required: true },
}, { timestamps: true });

// Calculate runningFeet before saving
doorFrameSchema.pre('save', function (next) {
    this.runningFeet = this.length * this.quantity;
    next();
});

export default mongoose.model('DoorFrame', doorFrameSchema);
