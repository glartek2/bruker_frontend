import { NavLink } from 'react-router';
import SignInButton from './SignInButton';
import { LogoXL } from '../icons/Logo';
import SearchIcon from '@mui/icons-material/Search';

function NavBar() {
  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='navbar-start space-x-2'>
        <LogoXL />
        <div tabIndex={0} className='max-md:hidden space-x-2'>
          <NavLink className='btn btn-ghost' to='/search'>
            Szukaj
          </NavLink>
        </div>
      </div>

      <div className='navbar-end space-x-2'>
        <div tabIndex={0} className='max-md:hidden'>
          <NavLink className='btn btn-ghost' to='/search'>
            <SearchIcon />
            Szukaj
          </NavLink>
        </div>
        <SignInButton />
      </div>
    </div>
  );
}

export default NavBar;
