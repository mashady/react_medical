import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect based on actual role
    if (user.role === 'doctor') return <Navigate to="/dashboard/doctor" />;
    if (user.role === 'patient') return <Navigate to="/dashboard/patient" />;
    if (user.role === 'admin') return <Navigate to="/dashboard/admin" />;
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
