import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';


export const ProtectedRoute = (children, role) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

  return children;
};
export default ProtectedRoute;
