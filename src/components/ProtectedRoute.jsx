// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

function ProtectedRoute() {
    const { user } = useAuthenticator((context) => [context.user]);

    // If user is not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If user is logged in, render child routes
    return <Outlet />;
}

export default ProtectedRoute;
