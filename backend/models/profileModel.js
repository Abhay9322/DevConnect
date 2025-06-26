import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    githubUsername: {
        type: String
    },
    social: {
        website: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        github: { type: String }
    }
} , { 
    timestamps: true
});

export default mongoose.model('Profile',profileSchema);