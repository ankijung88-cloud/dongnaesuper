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
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>{t('signupTitle')}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input name="name" type="text" placeholder={t('namePlaceholder')} onChange={handleChange} required style={{ padding: '10px' }} />
                <input name="email" type="email" placeholder={t('emailPlaceholder')} onChange={handleChange} required style={{ padding: '10px' }} />
                <input name="password" type="password" placeholder={t('passwordPlaceholder')} onChange={handleChange} required style={{ padding: '10px' }} />

                <label>{t('roleLabel')}</label>
                <select name="role" value={formData.role} onChange={handleChange} style={{ padding: '10px' }}>
                    <option value="user">{t('roleUser')}</option>
                    <option value="owner">{t('roleOwner')}</option>
                    <option value="admin">{t('roleAdmin')}</option>
                </select>

                <button type="submit" style={{ padding: '10px', background: '#4CAF50', color: 'white', border: 'none' }}>{t('signupTitle')}</button>
            </form>
            <p style={{ marginTop: '10px' }}>
                {t('hasAccount')} <Link to="/login">{t('login')}</Link>
            </p>
        </div>
    );
};

export default Signup;
