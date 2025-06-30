import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    techStack: {
        type: [String]
    },
    githubLink: {
        type: String
    },
    liveDemo: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model('Project',projectSchema);