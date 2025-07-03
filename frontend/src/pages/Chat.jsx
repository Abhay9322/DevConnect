// Chat.jsx

import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import API from '../api';

const socket = io('http://localhost:5000'); // Connect to backend server

function Chat() {
  const [users, setUsers] = useState([]);             // All users to chat with
  const [selectedUser, setSelectedUser] = useState(null); // Current chat partner
  const [messages, setMessages] = useState([]);       // Message list
  const [text, setText] = useState('');               // New message text
  const token = localStorage.getItem('token');        // JWT token
  const currentUser = useRef(null);                   // Logged-in user ID

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await API.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    };

    const getMyself = async () => {
      const res = await API.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      currentUser.current = res.data._id;
    };

    fetchUsers();
    getMyself();
  }, [token]);

  // Join room when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      const roomId = getRoomId(currentUser.current, selectedUser._id);
      socket.emit('join', roomId);
      loadMessages();
    }
  }, [selectedUser]);

  // Receive new message
  useEffect(() => {
    socket.on('message', (data) => {
      if (
        data.sender === selectedUser?._id ||
        data.receiver === selectedUser?._id
      ) {
        setMessages((prev) => [...prev, data]);
      }
    });
  }, [selectedUser]);

  const loadMessages = async () => {
    const res = await API.get(`/chat/${selectedUser._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMessages(res.data);
  };

  const getRoomId = (a, b) => {
    return [a, b].sort().join('_'); // Always same order
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    const msg = {
      sender: currentUser.current,
      receiver: selectedUser._id,
      text,
      roomId: getRoomId(currentUser.current, selectedUser._id)
    };

    socket.emit('message', msg); // Send real-time
    setMessages((prev) => [...prev, msg]); // Show instantly

    await API.post('/chat', { text, receiver: msg.receiver }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setText('');
  };

  return (
    <div style={{ display: 'flex', height: '90vh' }}>
      {/* Sidebar: All users */}
      <div style={{ width: '25%', borderRight: '1px solid gray', padding: '10px' }}>
        <h3>Users</h3>
        {users.map((u) => (
          <div
            key={u._id}
            onClick={() => setSelectedUser(u)}
            style={{ padding: '8px', cursor: 'pointer', background: selectedUser?._id === u._id ? '#eee' : 'transparent' }}
          >
            {u.name}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div style={{ width: '75%', padding: '10px', display: 'flex', flexDirection: 'column' }}>
        {selectedUser ? (
          <>
            <h3>Chat with {selectedUser.name}</h3>
            <div style={{ flexGrow: 1, border: '1px solid #ccc', padding: '10px', overflowY: 'scroll' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ textAlign: msg.sender === currentUser.current ? 'right' : 'left', marginBottom: '8px' }}>
                  <span style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: '10px', display: 'inline-block' }}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px' }}>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                style={{ width: '80%', padding: '8px' }}
              />
              <button onClick={handleSend} style={{ padding: '8px 12px', marginLeft: '10px' }}>
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a user to start chatting.</p>
        )}
      </div>
    </div>
  );
}

export default Chat;
