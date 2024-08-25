import express from 'express';
import {
    createDoors,
    getDoors,
    getDoorsByMaterial,
    getDoorsByType,
    updateDoorStock,
    updateDoor,
    deleteDoor
} from '../controllers/doorController.js';

const router = express.Router();

// Route for creating doors
router.post('/', createDoors);

// Route for getting all doors
router.get('/', getDoors);

// Route for getting doors by material
router.get('/material/:material', getDoorsByMaterial);

// Route for getting doors by type
router.get('/type/:type', getDoorsByType);

// Route for updating door stock
router.put('/:id/stock', updateDoorStock);

// Route for updating a door
router.put('/:id', updateDoor);

// Route for deleting a door
router.delete('/:id', deleteDoor);

export default router;
