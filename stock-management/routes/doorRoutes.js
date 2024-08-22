import express from 'express';
import { createDoors, getDoors, getDoorsByMaterial, getDoorsByType } from '../controllers/doorController.js';

const router = express.Router();

// Route for creating doors
router.post('/', createDoors);

// Route for getting all doors
router.get('/', getDoors);

// Route for getting doors by material
router.get('/material/:material', getDoorsByMaterial);

// Route for getting doors by type
router.get('/type/:type', getDoorsByType);

export default router;
