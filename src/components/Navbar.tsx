import { NavLink } from 'react-router';

function Navbar() {
  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='navbar-start'>
        <div className='space-x-2'>
          <NavLink className='btn btn-ghost text-xl' to='/'>
            bruker
          </NavLink>
          <NavLink className='btn btn-ghost' to='/'>
            Home
          </NavLink>
          <NavLink className='btn btn-ghost' to='/room'>
            Room
          </NavLink>
        </div>
      </div>

      <div className='navbar-end'>
        <a className='btn'>Button</a>
      </div>
    </div>
  );
}

export default Navbar;
