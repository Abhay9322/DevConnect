// Profile.jsx

import React, { useEffect, useState } from 'react';             // React + hooks
import API from '../api';                                       // Axios config

function Profile() {
  const [user, setUser] = useState(null);                       // Store user profile
  const [posts, setPosts] = useState([]);                       // Store user's posts
  const token = localStorage.getItem('token');                  // Get JWT token

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);                                      // Save user info
        fetchUserPosts(res.data._id);                           // Load their posts
      } catch (err) {
        console.log('Error loading profile:', err.message);
      }
    };

    const fetchUserPosts = async (userId) => {
      try {
        const res = await API.get(`/posts/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);                                     // Save user's posts
      } catch (err) {
        console.log('Error loading posts:', err.message);
      }
    };

    fetchProfile();                                             // Run on page load
  }, [token]);

  if (!user) return <p>Loading profile...</p>;                  // Show loading state

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '30px' }}>
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio || 'N/A'}</p>
      <p><strong>Skills:</strong> {user.skills?.join(', ') || 'N/A'}</p>
      <p><strong>Followers:</strong> {user.followers?.length || 0}</p>
      <p><strong>Following:</strong> {user.following?.length || 0}</p>

      <hr style={{ margin: '20px 0' }} />
      <h3>📝 My Posts</h3>

      {posts.length === 0 ? (
        <p>You haven't posted anything yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '15px' }}>
            <p>{post.text}</p>
            <p style={{ fontSize: '12px', color: 'gray' }}>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;
