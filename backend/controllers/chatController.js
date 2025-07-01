import Message from '../models/messageModel.js';

// Save new message to DB

export const sendMessage = async (req,res) => {
    try {
        const { receiver, text } = req.body;

        const message = new Message({
            sender: req.user.id,
            receiver,
            text
        });

        await message.save();
        res.status(201).json(message);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get messages between two users

export const getMessages = async (req,res) => {
    try {
        const { userId } = req.params;   // ID of other user in the conversation

        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: userId },
                { sender: userId, receiver: req.user.id }
            ]
        }).sort({ timestamp: 1})   // oldest first

        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};