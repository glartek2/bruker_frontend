import { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router';
import HomeIcon from '../icons/HomeIcon';
import RoomIcon from '../icons/RoomIcon';
import SearchIcon from '../icons/SearchIcon';

function Dock() {
  const location = useLocation();
  const navigate = useNavigate();

  function DockButton({
    title,
    to,
    children,
  }: PropsWithChildren<DockButtonProps>) {
    const isActive = location.pathname === to;
    return (
      <button
        className={isActive ? 'dock-active' : ''}
        onClick={() => {
          navigate(to);
        }}
      >
        {children}
        <span className='dock-label'>{title}</span>
      </button>
    );
  }

  return (
    <div className='dock visible sm:invisible'>
      <DockButton title='Home' to='/'>
        <HomeIcon />
      </DockButton>

      <DockButton title='Room' to='/room'>
        <RoomIcon />
      </DockButton>

      <DockButton title='Search' to='/search'>
        <SearchIcon />
      </DockButton>
    </div>
  );
}

interface DockButtonProps {
  title: string;
  to: string;
}

export default Dock;
