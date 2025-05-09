import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {NavLink} from 'react-router';

function SignInButton() {
    const isIn = false;
    if (!isIn) {
        return (
            <NavLink className='btn' to={'/login'}>
                <LoginIcon/>
                Zaloguj
            </NavLink>
        );
    } else {
        return (
            <button className='btn btn-soft btn-accent'>
                <AccountBoxIcon/>
                Profil
            </button>
        );
    }
}

export default SignInButton;
