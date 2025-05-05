import { NavLink } from 'react-router';
import RouteContainer from '../components/RouteContainer';

function NotFound() {
  return (
    <RouteContainer>
      <div className='hero bg-base-200 min-h-screen'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Not found</h1>
            <p className='py-6'>We couldn't find what you searched for</p>
            <NavLink className='btn' to='/'>
              Back to home
            </NavLink>
          </div>
        </div>
      </div>
    </RouteContainer>
  );
}

export default NotFound;
