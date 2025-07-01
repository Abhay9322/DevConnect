import express from 'express';
const router = express.Router();

import { sendMessage,getMessages } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/',protect,sendMessage);      // POST /api/chat => send message
router.get('/:userId',protect,getMessages);      // GET /api/chat/:userId => chat with user


export default router;