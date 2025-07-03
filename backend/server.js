// server.js

import express from 'express';                           // Import express to create the web server
import dotenv from 'dotenv';                             // To load environment variables from .env file
import mongoose from 'mongoose';                         // To connect and interact with MongoDB
import cors from 'cors';                                 // Middleware to allow frontend-backend communication
import http from 'http';                                 // Node’s built-in module to create HTTP server (for socket)
import { Server } from 'socket.io';                      // Import socket.io for real-time chat
import connectDB from './config/db.js';                  // MongoDB connection function

// Routes
import userRoutes from './routes/userRoutes.js';         // Import user auth routes
import profileRoutes from './routes/profileRoutes.js';   // Import profile routes
import postRoutes from './routes/postRoutes.js';         // Import post routes
import chatRoutes from './routes/chatRoutes.js';         // Import chat routes

dotenv.config();                                         // Load variables from .env file

connectDB();                                             // Connect to MongoDB

const app = express();                                   // Create express app
const server = http.createServer(app);                   // Create server using HTTP (needed for socket.io)
const io = new Server(server, {
    cors: {
        origin: '*',                                     // Allow all origins for now (you can restrict later)
    }
});

app.use(cors());                                         // Enable CORS so frontend can connect
app.use(express.json());                                 // Parse incoming JSON in requests

// Use API routes
app.use('/api/users', userRoutes);                       // Handle user registration/login
app.use('/api/profile', profileRoutes);                  // Handle profile data
app.use('/api/posts', postRoutes);                       // Handle post creation/likes/comments
app.use('/api/chat', chatRoutes);                        // Handle chat messages

// ======================
// Socket.io for real-time chat
// ======================
io.on('connection', (socket) => {                        // When a user connects to chat
    console.log('A user connected:', socket.id);         // Show socket ID in terminal

    socket.on('join', (roomId) => {                      // Listen for "join" event to join a chat room
        socket.join(roomId);                             // User joins that room
        console.log(`User joined room: ${roomId}`);
    });

    socket.on('message', (data) => {                     // Listen for messages from clients
        io.to(data.roomId).emit('message', data);        // Send message to everyone in that room
    });

    socket.on('disconnect', () => {                      // When user leaves
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 5000;                   // Port number from .env or default 5000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);    // Show message when server starts
});
