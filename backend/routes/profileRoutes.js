import express from 'express';
const router = express.Router();

import { createOrUpdateProfile,getMyProfile } from '../controllers/profileController.js';

import { protect } from '../middleware/authMiddleware.js';

router.post('/',protect,createOrUpdateProfile);
router.post('/me',protect,getMyProfile);

export default router;