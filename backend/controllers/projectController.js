import Project from '../models/projectModel.js';

// Create new project

export const createProject = async (req,res) => {
    try {
        const { title, description, techStack, githubLink, liveDemo } = req.body;

        const project = new Project({
            user: req.user.id,
            title,
            description,
            techStack,
            githubLink,
            liveDemo
        });

        await project.save();
        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all projects (optionally filter by user)

export const getProjects = async (req,res) => {
    try {
        const userId = req.query.user;

        const filter = userId ? { user: userId } : {};

        const projects = await Project.find(filter).populate('user','name avatar');
        res.status(200).json(projects);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get single project by ID

export const getProjectById = async (req,res) => {
    try {
        const project = await Project.findById(req.params.id).populate('user','name avatar');
        if (!project) return res.status(404).json({ message: 'Project not found' });

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};