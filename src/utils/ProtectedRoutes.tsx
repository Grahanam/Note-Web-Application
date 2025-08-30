import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  return token&&user?<Outlet/>: <Navigate to="/login"/>;

};

export default ProtectedRoute;