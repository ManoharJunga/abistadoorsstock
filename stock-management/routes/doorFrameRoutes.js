import express from 'express';
import { createDoorFrame, getDoorFrames } from '../controllers/doorFrameController.js';

const router = express.Router();

router.post('/', createDoorFrame);
router.get('/', getDoorFrames);

export default router;
