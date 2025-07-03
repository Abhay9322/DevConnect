// Showcase.jsx

import React, { useEffect, useState } from 'react';     // React + hooks
import API from '../api';                               // Axios instance

function Showcase() {
  const [projects, setProjects] = useState([]);         // All fetched projects
  const token = localStorage.getItem('token');          // Get JWT token

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(res.data);                          // Store projects in state
      } catch (err) {
        console.log('Error fetching projects:', err.message);
      }
    };

    fetchProjects();                                     // Load once on mount
  }, [token]);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', paddingTop: '30px' }}>
      <h2>🚀 Developer Project Showcase</h2>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((proj) => (
          <div key={proj._id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '8px'
          }}>
            <h3>{proj.title}</h3>
            <p><strong>By:</strong> {proj.user?.name || 'Unknown'}</p>
            <p><strong>Description:</strong> {proj.description}</p>
            <p><strong>Tech Stack:</strong> {proj.techStack?.join(', ') || 'N/A'}</p>
            <p>
              {proj.githubLink && (
                <a href={proj.githubLink} target="_blank" rel="noreferrer" style={{ marginRight: '15px' }}>
                  🔗 GitHub
                </a>
              )}
              {proj.liveDemo && (
                <a href={proj.liveDemo} target="_blank" rel="noreferrer">
                  🌐 Live Demo
                </a>
              )}
            </p>
            <p style={{ fontSize: '12px', color: 'gray' }}>
              Created at: {new Date(proj.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Showcase;
