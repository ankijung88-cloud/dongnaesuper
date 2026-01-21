import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { t } = useLanguage();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ padding: '10px', background: '#eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <Link to="/" style={{ marginRight: '10px', textDecoration: 'none', fontWeight: 'bold' }}>🏠 {t('home')}</Link>

                {/* Owner Link */}
                {user && (user.role === 'owner' || user.role === 'admin') && (
                    <Link to="/admin/products" style={{ textDecoration: 'none', marginRight: '10px' }}>🔧 {t('owner')}</Link>
                )}

                {/* Admin Link */}
                {user && user.role === 'admin' && (
                    <Link to="/super-admin" style={{ textDecoration: 'none' }}>👑 Admin</Link>
                )}
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {user ? (
                    <>
                        <span>👤 {user.name} ({user.role})</span>
                        <Link to="/cart" style={{ textDecoration: 'none' }}>🛒 {t('cart')}</Link>
                        <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>Sign Up</Link>
                    </>
                )}
                <LanguageSwitcher />
            </div>
        </nav>
    );
};

export default Navbar;
