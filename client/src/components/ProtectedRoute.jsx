import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    // Not logged in -> Login
    if (!user) return <Navigate to="/login" />;

    // Role check (if specified)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        alert("⛔ Access Denied: You don't have permission to view this page.");
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
