import { NavLink } from 'react-router';
import SearchBar from './SearchBar';
import SignIn from './SignIn';
import { LogoXL } from '../icons/Logo';

function NavBar() {
  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='navbar-start space-x-2'>
        <LogoXL />
        <div tabIndex={0} className='max-md:hidden space-x-2'>
          <NavLink className='btn btn-ghost' to='/'>
            Home
          </NavLink>
          <NavLink className='btn btn-ghost' to='/room'>
            Room
          </NavLink>
        </div>
      </div>

      <div className='navbar-end'>
        <div tabIndex={0} className='max-md:hidden'>
          <SearchBar />
        </div>
        <SignIn />
      </div>
    </div>
  );
}

export default NavBar;
