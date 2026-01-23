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
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/" className="navbar-brand">
                    <span>🏠</span> {t('title')}
                </Link>

                <LanguageSwitcher />

                {/* Owner Link */}
                {user && (user.role === 'owner' || user.role === 'admin') && (
                    <Link to="/admin/products" className="nav-link">
                        🔧 {t('owner')}
                    </Link>
                )}

                {/* Admin Link */}
                {user && user.role === 'admin' && (
                    <>
                        <Link to="/super-admin" className="nav-link">👑 Stats</Link>
                        <Link to="/admin/users" className="nav-link">👥 Users</Link>
                    </>
                )}
            </div>

            <div className="auth-buttons">
                {user ? (
                    <>
                        <span style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                            👤 {user.name}
                        </span>
                        {!isOwnerPage && (
                            <>
                                <Link to="/orders" className="nav-link">📦 {t('orderHistory')}</Link>
                                <Link to="/cart" className="nav-link">🛒 {t('cart')}</Link>
                            </>
                        )}
                        <button onClick={handleLogout} className="btn-sm" style={{ background: 'var(--text-muted)' }}>
                            {t('logout')}
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">{t('login')}</Link>
                        <Link to="/signup" className="nav-link">
                            {t('signup')}
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
