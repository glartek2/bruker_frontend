import createClient from 'openapi-fetch';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router';
import { paths } from '../api/schema';

const client = createClient<paths>({ baseUrl: import.meta.env.VITE_API_URL });

function ReservationConfirmation() {
  const { uidb64, token, reservationId } = useParams();

  useEffect(() => {
    async function activateUser() {
      if (uidb64 && token && reservationId) {
        await client.GET(
          '/api/reservation_update_confirmation/{uidb64}/{token}/{reservation_id}/',
          {
            params: { path: { uidb64, token, reservation_id: reservationId } },
          }
        );
      }
    }
    activateUser();
  });

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content text-center'>
        <div className='space-y-8'>
          {uidb64 && token && reservationId ? (
            <>
              <h1 className='text-3xl'>Rezerwacja potwierdzona</h1>
              <NavLink className='btn' to={'/profile'}>
                Profil
              </NavLink>
            </>
          ) : (
            <>
              <h1 className='text-2xl'>
                Niepoprawny link do zmiany rezerwacji
              </h1>
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

export default ReservationConfirmation;
