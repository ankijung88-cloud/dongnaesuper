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
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
        }}>
            <div className="glass-card" style={{
                maxWidth: '420px',
                width: '100%',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
            }}>
                <h2 style={{ textAlign: 'center', fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>
                    {t('loginTitle')}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input
                            type="email"
                            placeholder={t('emailPlaceholder')}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input
                            type="password"
                            placeholder={t('passwordPlaceholder')}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={{ marginTop: '10px' }}>
                        {t('loginTitle')}
                    </button>
                </form>

                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {t('noAccount')} <Link to="/signup" style={{ fontWeight: '600' }}>{t('signup')}</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
