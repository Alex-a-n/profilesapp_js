import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';  // link: jump to a page, navlink: highlight the current page, outlet: render child routes
import { useTranslation } from 'react-i18next';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Chatbot from './Chatbot';

function DashboardLayout() {
    const { t, i18n } = useTranslation();
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <header className="top-navbar">
                <div className="navbar-left">
                    <Link to="/" className="nav-logo">CozyRead</Link>
                    <nav className="nav-links">
                        <NavLink to="/" end>
                            {t('nav.home') || 'Home'}
                        </NavLink>
                        {/* 无条件显示这些导航：未登录时点击会被ProtectedRoute拦截 */}
                        <NavLink to="/my-books">
                            {t('nav.myBooks') || 'My Books'}
                        </NavLink>
                        <NavLink to="/events">
                            {t('nav.events') || 'Events'}
                        </NavLink>
                        <NavLink to="/map">Map</NavLink>
                    </nav>
                </div>
                <div className="navbar-right">

                    <div className="nav-search">
                        <input
                            type="text"
                            placeholder={t('nav.searchPlaceholder') || 'Search...'}
                        />
                    </div>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {/* Display username */}
                            <span>{user.username || user.attributes?.email}</span>
                            <button onClick={signOut} className="logout-button">
                                {'Logout'}
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="login-link">
                            {t('nav.loginRegister') || 'Login/Register'}
                        </Link>
                    )}

                    <select
                        className="lang-switch"
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        value={i18n.language}
                    >
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                        <option value="ms">Malay</option>
                    </select>
                </div>
            </header>

            <main className="main-container">
                <Outlet />
            </main>


            <Chatbot />
        </div>
    );
}

export default DashboardLayout;
