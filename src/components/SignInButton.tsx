import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { NavLink } from 'react-router';
import { useAuth } from '../context/AppContext';

function SignInButton() {
  const { state } = useAuth();
  const isGuest = state?.user === null;

  if (isGuest) {
    return (
      <NavLink className='btn' to={'/login'}>
        <LoginIcon />
        Zaloguj
      </NavLink>
    );
  } else {
    return (
      <button className='btn btn-soft btn-accent'>
        <AccountBoxIcon />
        Profil
      </button>
    );
  }
}

export default SignInButton;
