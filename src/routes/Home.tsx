import { NavLink } from 'react-router';
import RouteContainer from '../components/RouteContainer';

function Home() {
  return (
    <RouteContainer>
      <div className='hero bg-base-200 min-h-screen'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>TODO</h1>
            <p className='py-6'>TODO TODO TODO TODO</p>
            <NavLink className='btn' to='/'>
              place searchbar
            </NavLink>
          </div>
        </div>
      </div>
    </RouteContainer>
  );
}

export default Home;
