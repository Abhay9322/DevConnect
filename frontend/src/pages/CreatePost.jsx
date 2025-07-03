// CreatePost.jsx

import React, { useState } from 'react';                    // Import React and useState
import { useNavigate } from 'react-router-dom';            // For redirection
import API from '../api';                                  // Axios base instance

function CreatePost() {
  const [text, setText] = useState('');                    // Track post text
  const [error, setError] = useState('');                  // Track any error

  const navigate = useNavigate();                          // To redirect after posting
  const token = localStorage.getItem('token');             // Get saved token

  const handleSubmit = async (e) => {
    e.preventDefault();                                    // Prevent page reload

    if (!text.trim()) {
      setError('Post content cannot be empty!');
      return;
    }

    try {
      await API.post('/posts', { text }, {
        headers: { Authorization: `Bearer ${token}` }      // Send token for auth
      });
      navigate('/');                                       // Go to home/feed after success
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating post');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '40px' }}>
      <h2>Create a New Post</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}   {/* Show error if exists */}

      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}        // Update text state
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button
          type="submit"
          style={{ padding: '10px', width: '100%' }}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;                                  // Export component
