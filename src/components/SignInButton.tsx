import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { NavLink } from 'react-router';
import { useAppContext } from '../context/AppContext';

function SignInButton() {
  const { state } = useAppContext();
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
      <NavLink className='btn btn-soft btn-accent' to={'/profile'}>
        <AccountBoxIcon />
        Profil
      </NavLink>
    );
  }
}

export default SignInButton;
