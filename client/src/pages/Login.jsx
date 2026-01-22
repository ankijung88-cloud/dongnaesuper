import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            alert(`환영합니다, ${user.name}님!`);
            if (user.role === 'admin') navigate('/super-admin');
            else if (user.role === 'owner') navigate('/admin/products');
            else navigate('/');
        } catch (err) {
            console.error('Login Error:', err);
            const msg = err.response?.data?.msg || err.message;
            alert(`로그인 실패: ${msg}`);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>{t('loginTitle')}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="email" placeholder={t('emailPlaceholder')} value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '10px' }} />
                <input type="password" placeholder={t('passwordPlaceholder')} value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', background: '#2196F3', color: 'white', border: 'none' }}>{t('loginTitle')}</button>
            </form>
            <p style={{ marginTop: '10px' }}>
                {t('noAccount')} <Link to="/signup">{t('signup')}</Link>
            </p>
        </div>
    );
};

export default Login;
