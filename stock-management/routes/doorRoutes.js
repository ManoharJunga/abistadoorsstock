import express from 'express';
import { createDoors, getDoors } from '../controllers/doorController.js';

const router = express.Router();

router.post('/', createDoors);
router.get('/', getDoors);

export default router;
