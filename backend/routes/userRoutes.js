import express from 'express';
const router = express.Router();

import { registerUser, loginUser } from '../controllers/userController.js';

import { followUser,unfollowUser, getAllUsers } from '../controllers/followController.js';

import { protect } from '../middleware/authMiddleware.js';

router.post('/register',registerUser);
router.post('/login',loginUser);

// Follow/unfollow routes

router.put('/follow/:id',protect,followUser)   // PUT /api/users/follow/:id
router.put('/unfollow/:id',protect,unfollowUser);


// Optional: Get all users (to display on frontend)

router.get('/',protect,getAllUsers);

export default router;