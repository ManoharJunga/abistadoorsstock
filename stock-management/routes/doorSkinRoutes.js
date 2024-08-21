import express from 'express';
import { createDoorSkin, getDoorSkins } from '../controllers/doorSkinController.js';

const router = express.Router();

router.post('/', createDoorSkin);
router.get('/', getDoorSkins);

export default router;
