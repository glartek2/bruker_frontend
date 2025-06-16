import { NavLink } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import { AcceptedSlot } from '../../model/Slots';
import AcceptedView from '../view/AcceptedView';
import CloseModal from './CloseModal';

import EditLocationIcon from '@mui/icons-material/EditLocation';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import createClient from 'openapi-fetch';
import { paths } from '../../api/schema';
import { editAcceptedModalId, useInfo } from './modals';
import { useId } from 'react';
import InfoModal from './InfoModal';

const client = createClient<paths>({ baseUrl: import.meta.env.VITE_API_URL });

function EditAcceptedModal() {
  const { state } = useAppContext();
  const acceptedSlot = state.slots[editAcceptedModalId] as AcceptedSlot;
  const infoModalId = useId();
  const [info, emitInfo] = useInfo(infoModalId);

  const handleCancelReservation = async () => {
    if (!acceptedSlot?.reservationId || !state?.user?.token) return;

    const { error } = await client.DELETE('/api/reservation/{id}/', {
      headers: {
        Authorization: 'Token ' + state.user.token,
      },
      params: {
        path: {
          id: acceptedSlot.reservationId,
        },
      },
    });

    if (!error) {
      document
        .getElementById(`reservationCard` + acceptedSlot.reservationId)
        ?.classList.add('bg-rose-900');
      document
        .getElementById(
          `reservationCard` + acceptedSlot.reservationId + `Badge`
        )
        ?.classList.add('badge-error');
      emitInfo({
        type: 'success',
        header: 'Rezerwacja została odwołana',
        message: '',
      });
    } else {
      emitInfo({
        type: 'error',
        header: 'Brak uprawnień',
        message: 'Nie masz uprawnień do odwołania rezerwacji',
      });
    }
  };

  return (
    <>
      <InfoModal id={infoModalId} info={info} />
      <dialog id={editAcceptedModalId} className='modal'>
        <div className='modal-box space-y-4'>
          <div className='flex items-center space-x-4'>
            <h3 className='font-bold text-lg'>Zajęcia</h3>
            {acceptedSlot?.hasProposition ? (
              <span className='badge badge-soft badge-info'>
                <div className='status status-info animate-pulse'></div>
                proponowane zmiany
              </span>
            ) : (
              <span className='badge badge-soft badge-accent'>
                <div className='status status-accent'></div>
                według planu
              </span>
            )}
          </div>
          <AcceptedView acceptedSlot={acceptedSlot} />
          <CloseModal />
          <div className='join flex justify-center'>
            <NavLink
              to={'/reservation/new_room/' + acceptedSlot?.reservationId}
              className='btn join-item'
            >
              <EditLocationIcon /> Zmień salę
            </NavLink>
            <NavLink
              to={'/reservation/new_time/' + acceptedSlot?.reservationId}
              className='btn join-item'
            >
              <EditCalendarIcon /> Przesuń
            </NavLink>
            <button onClick={handleCancelReservation} className='btn join-item'>
              <EventBusyIcon /> Odwołaj
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default EditAcceptedModal;
