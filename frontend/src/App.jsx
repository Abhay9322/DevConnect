// App.jsx

import React from 'react';                             // Import React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import routing tools
import Navbar from './components/Navbar';              // Import Navbar
import Register from './pages/Register';               // Import Register page
import Login from './pages/Login';                     // Import Login page
import Home from './pages/Home';                       // Import Home (feed)
import Profile from './pages/Profile';                 // Import Profile page
import CreatePost from './pages/CreatePost';           // Import Create Post
import Showcase from './pages/Showcase';               // Import project showcase
import Chat from './pages/Chat';                       // Import chat page

function App() {
  return (
    <Router>                                           {/* Start routing */}
      <Navbar />                                       {/* Show navbar on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />          {/* Home page route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/login" element={<Login />} />       {/* Login route */}
        <Route path="/profile" element={<Profile />} />   {/* Profile route */}
        <Route path="/create-post" element={<CreatePost />} /> {/* Create post route */}
        <Route path="/showcase" element={<Showcase />} />     {/* Project showcase route */}
        <Route path="/chat" element={<Chat />} />             {/* Chat route */}
      </Routes>
    </Router>
  );
}

export default App;                                   // Export the component
