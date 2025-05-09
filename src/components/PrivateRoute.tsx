import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AppContext';
import {JSX} from "react";

const PrivateRoute = ({children}: { children: JSX.Element }) => {
    const {state} = useAuth();
    return state.user ? children : <Navigate to="/login" replace/>;
};

export default PrivateRoute;