// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { isLoggedIn, getRole } from '../utils/auth';

// allowedRoles: array of roles that can access the route e.g. ['admin']
const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(getRole())) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;