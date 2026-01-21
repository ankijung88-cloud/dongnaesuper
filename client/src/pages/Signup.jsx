import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await register(formData.name, formData.email, formData.password, formData.role);
            alert(`Welcome, ${user.name}!`);
            if (user.role === 'admin') navigate('/super-admin');
            else if (user.role === 'owner') navigate('/admin/products');
            else navigate('/');
        } catch (err) {
            alert(err.response?.data?.msg || 'Signup Failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input name="name" type="text" placeholder="Name" onChange={handleChange} required style={{ padding: '10px' }} />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={{ padding: '10px' }} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={{ padding: '10px' }} />

                <label>Role:</label>
                <select name="role" value={formData.role} onChange={handleChange} style={{ padding: '10px' }}>
                    <option value="user">User (Customer)</option>
                    <option value="owner">Store Owner</option>
                    <option value="admin">Super Admin</option>
                </select>

                <button type="submit" style={{ padding: '10px', background: '#4CAF50', color: 'white', border: 'none' }}>Sign Up</button>
            </form>
            <p style={{ marginTop: '10px' }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
