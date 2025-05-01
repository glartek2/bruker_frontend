import { NavLink } from 'react-router';

function LogoXL() {
  return (
    <NavLink
      className='mx-6 font-semibold text-xl no-underline hover:underline decoration-2 transition-colors duration-300 decoration-accent/20 hover:decoration-accent'
      to='/'
    >
      bruker
    </NavLink>
  );
}

function LogoMd() {
  return (
    <NavLink
      className='font-semibold text-md no-underline hover:underline decoration-1 decoration-accent'
      to='/'
    >
      bruker
    </NavLink>
  );
}

export { LogoXL, LogoMd };
