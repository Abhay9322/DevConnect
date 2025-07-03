import User from '../models/userModel.js';

// Follow another user

export const followUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);      // Logged-in user
        const targetUser = await User.findById(req, params.id);       // User to follow

        if (!targetUser) return res.status(404).json({ message: 'User not found' });

        if (targetUser.followers.includes(currentUser._id)) {
            return res.status(400).json({ message: 'Already Following' });
        }

        // Add current user to target’s followers

        targetUser.followers.push(currentUser._id);
        await targetUser.save();

        // Add target user to current user’s following

        currentUser.following.push(targetUser._id);
        await currentUser.save();

        res.status(200).json({ message: 'User Followed' });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};



// Unfollow a user

export const unfollowUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const targetUser = await User.findById(req.params.id);

        if (!targetUser) return res.status(404).json({ message: 'User not found' });

        if (!targetUser.followers.includes(currentUser._id)) {
            return res.status(400).json({ message: 'Not following this user' });
        }


        // Remove current user from target’s followers

        targetUser.followers = targetUser.followers.filter(
            id => id.toString() !== currentUser._id.toString()
        );

        await targetUser.save();


        // Remove target user from current user’s following

        currentUser.following = currentUser.following.filter(
            id => id.toString() !== targetUser._id.toString()
        );
        await currentUser.save();

        res.status(200).json({ message: 'User unfollowed' })

    } catch (error) {

        res.status(500).json({ message: error.message })
    }
};


// Get all users (to show follow suggestions)

export const getAllUsers = async (req,res) => {
    try {
        const users = await User.find().select('-password');  //Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};