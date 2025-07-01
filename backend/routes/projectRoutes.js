import express from 'express';
const router = express.Router();

import { 
    createProject,
    getProjects,
    getProjectById
 } from '../controllers/projectController';

 import { protect } from '../middleware/authMiddleware.js';

 router.post('/',protect,createProject);        // Create project (POST /api/projects)
 router.get('/',getProjects);                    // Get all or filtered projects (GET /api/projects?user=ID)
 router.get('/:id',getProjectById);             // Get single project by ID (GET /api/projects/:id)


 export default router;