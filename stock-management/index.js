import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import doorRoutes from './routes/doorRoutes.js';
import doorSkinRoutes from './routes/doorSkinRoutes.js';
import doorFrameRoutes from './routes/doorFrameRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/doors', doorRoutes);
app.use('/api/door-skins', doorSkinRoutes);
app.use('/api/door-frames', doorFrameRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('MongoDB connection failed:', error.message);
});
