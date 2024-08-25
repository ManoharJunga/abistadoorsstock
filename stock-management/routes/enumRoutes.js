import express from 'express';
import { getDoorEnums } from '../controllers/enumController.js';

const router = express.Router();

// Route to fetch enum values for material and type
router.get('/door-enums', getDoorEnums);

export default router;
