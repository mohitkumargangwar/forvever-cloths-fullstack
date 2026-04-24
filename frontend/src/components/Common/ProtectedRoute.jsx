import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { logout } from '../../redux/slice/authSlice';


const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          dispatch(logout());
        }
      } catch (e) {
        dispatch(logout());
      }
    }
  }, [token, dispatch]);

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Check again in render (for fast redirect)
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      dispatch(logout());
      return <Navigate to="/login" replace />;
    }
  } catch (e) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;
