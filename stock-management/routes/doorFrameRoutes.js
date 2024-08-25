import express from 'express';
import { createDoorFrame, getDoorFrames, updateDoorFrame, deleteDoorFrame } from '../controllers/doorFrameController.js';

const router = express.Router();

router.post('/', createDoorFrame);
router.get('/', getDoorFrames);
router.put('/:id', updateDoorFrame);
router.delete('/:id', deleteDoorFrame);

export default router;
