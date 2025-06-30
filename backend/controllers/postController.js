import Post from '../models/postModel.js';

//  Create a post

export const createPost = async (req,res) => {
    try {
        const post = new Post({
            user: req.user.id,
            text: req.body.text
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all posts (latest first)

export const getPosts = async (req,res) => {
    try {
        const posts = await Post.find()
         .populate('user','name avatar')
         .sort({ createdAt: -1 });
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Like or unlike a post

export const toggleLike = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const userId = req.user.id;
        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Comment on a post

export const addComment = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        

        const comment = {
            user: req.user.id,
            text: req.body.text
        };

        post.comments.push(comment);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Share a post

export const sharePost = async (req,res) => {
    try {
        const originalPost = await Post.findById(req.params.id);
        if (!originalPost) return res.status(404).json({ message: 'Post not found'});

        const shared = new Post({
            user: req.user.id,
            text: originalPost.text,
            sharedForm: originalPost._id
        });

        await shared.save();
        res.status(201).json(shared);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
