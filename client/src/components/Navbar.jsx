import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { t } = useLanguage();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if current page is Owner or POS page
    const isOwnerPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/pos') || location.pathname.startsWith('/super-admin');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            padding: '10px',
            background: '#eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isOwnerPage ? 'stretch' : 'center',
            flexDirection: isOwnerPage ? 'column' : 'row',
            gap: isOwnerPage ? '10px' : '0'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>🏠 동네슈퍼</Link>

                {/* Language Switcher moved here */}
                <LanguageSwitcher />

                {/* Owner Link */}
                {user && (user.role === 'owner' || user.role === 'admin') && (
                    <Link to="/admin/products" style={{ textDecoration: 'none' }}>🔧 {t('owner')}</Link>
                )}

                {/* Admin Link */}
                {user && user.role === 'admin' && (
                    <>
                        <Link to="/super-admin" style={{ textDecoration: 'none' }}>👑 Stats</Link>
                        <Link to="/admin/users" style={{ textDecoration: 'none' }}>👥 Users</Link>
                    </>
                )}
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: isOwnerPage ? 'flex-end' : 'flex-start' }}>
                {user ? (
                    <>
                        <span>👤 {user.name} ({user.role})</span>
                        {!isOwnerPage && (
                            <Link to="/cart" style={{ textDecoration: 'none' }}>🛒 {t('cart')}</Link>
                        )}
                        <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ textDecoration: 'none' }}>로그인</Link>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>회원가입</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
