import express from 'express';
import {
    createDoorSkin,
    getAllDoorSkins,
    updateDoorSkin,
    deleteDoorSkin
} from '../controllers/doorSkinController.js';

const router = express.Router();

// Routes for door skin operations
router.post('/', createDoorSkin);      // Create a new door skin
router.get('/', getAllDoorSkins);      // Get all door skins
router.put('/:id', updateDoorSkin);     // Update a door skin by ID
router.delete('/:id', deleteDoorSkin);  // Delete a door skin by ID

export default router;
