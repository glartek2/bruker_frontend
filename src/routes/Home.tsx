import { NavLink } from 'react-router';
import RouteContainer from '../components/RouteContainer';
import SearchIcon from '@mui/icons-material/Search';

function Home() {
  return (
    <RouteContainer>
      <div className='hero bg-base-200 min-h-screen'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Rezerwuj sale szybko i wygodnie</h1>
            <p className='py-6'>Nowoczesna aplikacja do zarządzania salami -<br/> dla wykładowców i administracji</p>
            <NavLink className='btn btn-ghost' to='/search'>
              <SearchIcon />
              Szukaj sal
            </NavLink>
          </div>
        </div>
      </div>
    </RouteContainer>
  );
}

export default Home;
