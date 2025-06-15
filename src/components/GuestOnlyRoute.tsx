import { Navigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { JSX } from 'react';

const GuestOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { state } = useAppContext();
  return !state.user ? children : <Navigate to='/profile' replace />;
};

export default GuestOnlyRoute;
