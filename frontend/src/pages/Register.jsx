import React,{ useState } from "react";
import { useNavigate } from 'react-router-dom';
import API from "../api";


function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
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
            const res = await API.post('/users/register',form);
            localStorage.setItem('token',res.data.token);
            navigate('/');

        } catch (error) {
            setError(error.res?.data?.message || 'Registration Failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
            <h2>Register</h2>

            {error && <P style={{ color: 'red'}}>{error}</P>}

            <form onSubmit={handleSubmit}>
                <input
                 type="text"
                 name="name"
                 placeholder="Name"
                 value={form.name}
                 onChange={handleChange}
                 required
                 style={{width: '100%', padding: '8px', marginBottom: '10px' }} />

                 <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

                  <input
                   type="password"
                   name="password"
                   placeholder="Password"
                   value={form.password}
                   onChange={handleChange}
                   required
                   style={{width: '100%', padding: '8px', marginBottom: '10px'}} />

                   <button
                    type="submit"
                    style={{ padding: '10px', width: '100%'}} >
                        Register
                    </button>
            </form>
        </div>
    );


}

export default Register;