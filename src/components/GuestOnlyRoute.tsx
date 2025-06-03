import { Navigate } from 'react-router';
import { useAuth } from '../context/AppContext';
import { JSX } from 'react';

const GuestOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { state } = useAuth();
  return !state.user ? children : <Navigate to='/profile' replace />;
};

export default GuestOnlyRoute;
