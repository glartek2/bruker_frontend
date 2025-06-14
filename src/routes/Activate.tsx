import createClient from 'openapi-fetch';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router';
import { paths } from '../api/schema';

const client = createClient<paths>({ baseUrl: import.meta.env.VITE_API_URL });

function Activate() {
  const { uidb64, token } = useParams();

  useEffect(() => {
    async function activateUser() {
      if (uidb64 && token) {
        await client.GET('/users/activate/{uidb64}/{token}/', {
          params: { path: { uidb64, token } },
        });
      }
    }
    activateUser();
  });

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content text-center'>
        <div className='space-y-8'>
          {uidb64 && token ? (
            <>
              <h1 className='text-3xl'>Konto zostało aktywowane</h1>
              <NavLink className='btn' to={'/login'}>
                Zaloguj się
              </NavLink>
            </>
          ) : (
            <>
              <h1 className='text-2xl'>Niepoprawny link do aktywacji</h1>
              <NavLink className='btn' to={'/'}>
                Home
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activate;
