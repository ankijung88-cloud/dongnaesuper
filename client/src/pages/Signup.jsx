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
            alert(`환영합니다, ${user.name}님!`);
            if (user.role === 'admin') navigate('/super-admin');
            else if (user.role === 'owner') navigate('/admin/products');
            else navigate('/');
        } catch (err) {
            alert(err.response?.data?.msg || '회원가입 실패');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input name="name" type="text" placeholder="이름" onChange={handleChange} required style={{ padding: '10px' }} />
                <input name="email" type="email" placeholder="이메일" onChange={handleChange} required style={{ padding: '10px' }} />
                <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} required style={{ padding: '10px' }} />

                <label>역할 (Role):</label>
                <select name="role" value={formData.role} onChange={handleChange} style={{ padding: '10px' }}>
                    <option value="user">일반 사용자 (고객)</option>
                    <option value="owner">점주 (Store Owner)</option>
                    <option value="admin">슈퍼 관리자 (Super Admin)</option>
                </select>

                <button type="submit" style={{ padding: '10px', background: '#4CAF50', color: 'white', border: 'none' }}>회원가입</button>
            </form>
            <p style={{ marginTop: '10px' }}>
                이미 계정이 있으신가요? <Link to="/login">로그인</Link>
            </p>
        </div>
    );
};

export default Signup;
