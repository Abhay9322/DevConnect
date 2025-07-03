import express from 'express';
const router = express.Router();

import { 
    createPost,
    getPosts,
    toggleLike,
    addComment,
    sharePost
 } from '../controllers/postController.js';

 import { protect } from '../middleware/authMiddleware.js'

 router.post('/', protect, createPost);     //  POST /api/posts
 router.get('/', protect, getPosts);
 router.put('/like/:id', protect, toggleLike);
 router.post('/comment/:id', protect, addComment);
 router.post('/share/:id', protect, sharePost);

 export default router;

