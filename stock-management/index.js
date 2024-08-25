import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import doorRoutes from './routes/doorRoutes.js';
import doorSkinRoutes from './routes/doorSkinRoutes.js';
import doorFrameRoutes from './routes/doorFrameRoutes.js';
import enumRoutes from './routes/enumRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use('/api/doors', doorRoutes);
app.use('/api/door-skins', doorSkinRoutes);
app.use('/api/doorframes', doorFrameRoutes);
app.use('/api/enums', enumRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
    });
