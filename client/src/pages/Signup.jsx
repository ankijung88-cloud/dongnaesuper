import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const { register } = useAuth();
    const { t } = useLanguage();
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
        <div className="auth-container">
            <div className="glass-card auth-card">
                <h2 style={{ textAlign: 'center', fontSize: '2rem', color: 'var(--primary-dark)', margin: 0 }}>
                    {t('signupTitle')}
                </h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input name="name" type="text" placeholder={t('namePlaceholder')} onChange={handleChange} required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input name="email" type="email" placeholder={t('emailPlaceholder')} onChange={handleChange} required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input name="password" type="password" placeholder={t('passwordPlaceholder')} onChange={handleChange} required />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: '600', color: 'var(--text-muted)' }}>{t('roleLabel')}</label>
                        <select name="role" value={formData.role} onChange={handleChange} style={{
                            padding: '12px',
                            borderRadius: '12px',
                            border: '1px solid rgba(0,0,0,0.1)',
                            background: 'white'
                        }}>
                            <option value="user">{t('roleUser')}</option>
                            <option value="owner">{t('roleOwner')}</option>
                            <option value="admin">{t('roleAdmin')}</option>
                        </select>
                    </div>

                    <button type="submit" style={{ marginTop: '10px' }}>{t('signupTitle')}</button>
                </form>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {t('hasAccount')} <Link to="/login" style={{ fontWeight: '600' }}>{t('login')}</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
