import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    skin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DoorSkin', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true,
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: props => `Quantity must be greater than 0`
        }
    },
    price: { 
        type: Number, 
        required: true,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: props => `Price must be a positive number`
        }
    },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
