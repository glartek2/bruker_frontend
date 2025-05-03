import { NavLink } from 'react-router';

function Home() {
  return (
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
  );
}

export default Home;
