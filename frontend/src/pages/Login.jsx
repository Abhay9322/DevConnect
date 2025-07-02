import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/users/login',form);
            localStorage.setItem('token',res.data.token);
            navigate('/');

        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
            <h2>Login</h2>

            {error && <P style={{ color: 'red' }}>{error}</P>}

            <form onSubmit={handleSubmit}>
                <input
                 type="email"
                 name="email"
                 placeholder="Email"
                 value={form.email}
                 onChange={handleChange}
                 required
                 style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                  />
                  <input
                   type="password"
                   name="password"
                   placeholder="Password"
                   value={form.password}
                   onChange={handleChange}
                   required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />

                    <button
                        type="submit"
                        style={{padding: '10px', width: '100%'}}
                    >
                        Login
                    </button>
            </form>

        </div>
    );
}


export default Login;