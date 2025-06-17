import { NavLink } from 'react-router';

function LogoXL() {
  return (
    <NavLink
      className="mx-6 font-semibold text-xl no-underline hover:underline decoration-2 transition-colors duration-300 decoration-accent/20 hover:decoration-accent flex items-center gap-2"
      to="/"
    >
      <img src="/logo.png" alt="Bruker logo" className="h-8 w-auto" />
      Bruker
    </NavLink>
  );
}

function LogoMd() {
  return (
    <NavLink
      className="font-semibold text-md no-underline hover:underline decoration-1 decoration-accent flex items-center gap-2"
      to="/"
    >
      <img src="/logo.png" alt="Bruker logo" className="h-5 w-auto" />
      Bruker
    </NavLink>
  );
}

function LogoNoMargin() {
  return (
    <NavLink
      className="font-semibold text-xl no-underline hover:underline decoration-2 transition-colors duration-300 decoration-accent/20 hover:decoration-accent flex items-center"
      to="/"
    >
      <img src="/logo.png" alt="Bruker logo" className="h-8 w-auto" />
      Bruker
    </NavLink>
  );
}

export { LogoXL, LogoMd, LogoNoMargin };
