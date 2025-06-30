import Profile from '../models/profileModel.js';
import User from '../models/userModel.js';



// // Create or update profile
export const createOrUpdateProfile = async (req,res) => {
    const { bio, skills, githubUsername, social } = req.body;

    try {
        const profileFields = {
            user: req.user.id,
            bio,
            skills,
            githubUsername,
            social
        };

        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            profile = await Profile.findByIdAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.status(200).json(profile);
        }

        profile = new Profile(profileFields);
        await profile.save();
        res.status(201).json(profile);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// Get current user's profile

export const getMyProfile = async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate('user',['name','email']);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
