import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const AdminProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // Agar user nahi hai toh login pe bhejo
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar user admin nahi hai toh 404 dikhao
  if (user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg text-gray-600 mt-2">Page Not Found</p>
      </div>
    );
  }

  // Agar user admin hai toh children render karo
  return children;
};

export default AdminProtectedRoute;
