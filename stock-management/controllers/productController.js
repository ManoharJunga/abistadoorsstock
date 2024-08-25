import Product from '../models/Product.model.js';
import Door from '../models/Door.model.js';
import DoorSkin from '../models/DoorSkin.model.js';

export const createProduct = async (req, res) => {
    try {
        const { name, door, skin, quantity } = req.body;

        const doorData = await Door.findById(door);
        const skinData = await DoorSkin.findById(skin);

        if (!doorData || !skinData) {
            return res.status(404).json({ message: 'Door or Skin not found' });
        }

        const price = (doorData.price + skinData.price) * quantity;

        const newProduct = new Product({ name, door, skin, quantity, price });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error });
    }
};


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('door')
            .populate('skin');

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error });
    }
};
