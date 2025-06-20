import { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';

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
      <DockButton title='Rezerwuj' to='/room'>
        <CalendarMonthIcon />
      </DockButton>
      <DockButton title='Profil' to='/profile'>
        <HomeFilledIcon />
      </DockButton>
      <DockButton title='Szukaj' to='/search'>
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
