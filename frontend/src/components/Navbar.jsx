// Navbar.jsx

import React from 'react';                            // Import React
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import { useEffect, useState } from 'react';          // useState + useEffect hooks

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();                      // Navigate to another page

  useEffect(() => {
    const token = localStorage.getItem('token');       // Check if token exists
    setIsLoggedIn(!!token);                            // Set login state true/false
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');                  // Delete the token
    setIsLoggedIn(false);                              // Update login state
    navigate('/login');                                // Redirect to login page
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      background: '#333',
      color: 'white',
      padding: '10px 20px'
    }}>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: '15px' }}>DevConnect</Link>
        <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Home</Link>
        {isLoggedIn && (
          <>
            <Link to="/profile" style={{ color: 'white', marginRight: '15px' }}>Profile</Link>
            <Link to="/create-post" style={{ color: 'white', marginRight: '15px' }}>Post</Link>
            <Link to="/showcase" style={{ color: 'white', marginRight: '15px' }}>Showcase</Link>
            <Link to="/chat" style={{ color: 'white', marginRight: '15px' }}>Chat</Link>
          </>
        )}
      </div>

      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>Login</Link>
            <Link to="/register" style={{ color: 'white' }}>Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={{ background: 'red', color: 'white', border: 'none', padding: '6px 12px' }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar; // Export component
