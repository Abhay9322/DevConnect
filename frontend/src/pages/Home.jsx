// Home.jsx

import React, { useEffect, useState } from 'react';            // Import hooks
import API from '../api';                                     // Axios instance
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);                     // To store fetched posts
  const [commentText, setCommentText] = useState('');         // New comment text

  const token = localStorage.getItem('token');                // Get JWT token

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/posts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);                                   // Store in state
      } catch (err) {
        console.log('Error fetching posts:', err.message);
      }
    };

    fetchPosts();                                             // Run function on page load
  }, [token]);

  const handleLike = async (postId) => {
    try {
      const res = await API.put(`/posts/like/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? res.data : post))
      );
    } catch (err) {
      console.log('Error liking post:', err.message);
    }
  };

  const handleComment = async (postId) => {
    try {
      const res = await API.post(`/posts/comment/${postId}`, { text: commentText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? res.data : post))
      );
      setCommentText('');
    } catch (err) {
      console.log('Error commenting:', err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '20px' }}>
      <h2>DevConnect Feed</h2>

      {posts.map((post) => (
        <div key={post._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '20px' }}>
          <h4>{post.user?.name || 'Anonymous'}</h4>
          <p>{post.text}</p>

          <button onClick={() => handleLike(post._id)}>
            ❤️ {post.likes.length} Like{post.likes.length !== 1 ? 's' : ''}
          </button>

          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Add a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ width: '80%', padding: '5px' }}
            />
            <button onClick={() => handleComment(post._id)} style={{ padding: '6px' }}>
              Comment
            </button>
          </div>

          <div style={{ marginTop: '10px' }}>
            <strong>Comments:</strong>
            {post.comments.map((c, index) => (
              <div key={index} style={{ borderTop: '1px solid #eee', marginTop: '5px', paddingTop: '5px' }}>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
