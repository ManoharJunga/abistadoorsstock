
import express from 'express';
import { createDoor, getDoors } from '../controllers/doorController.js';

const router = express.Router();

router.post('/', createDoor);
router.get('/', getDoors);

export default router;
