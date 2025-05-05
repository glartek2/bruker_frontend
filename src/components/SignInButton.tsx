import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function SignInButton() {
  const isIn = false;
  if (!isIn) {
    return (
      <button className='btn'>
        <LoginIcon />
        Zaloguj
      </button>
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
