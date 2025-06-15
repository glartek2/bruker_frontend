import { NavLink } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import { AcceptedSlot } from '../../model/slots';
import AcceptedView from '../view/AcceptedView';
import CloseModal from './CloseModal';
import { editAcceptedModalId } from './modals';

import EditLocationIcon from '@mui/icons-material/EditLocation';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';

function EditAcceptedModal() {
  const { state } = useAppContext();
  const acceptedSlot = state.slots[editAcceptedModalId] as AcceptedSlot;

  return (
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
          <NavLink
            to={'/reservation/cancel/' + acceptedSlot?.reservationId}
            className='btn join-item'
          >
            <EventBusyIcon /> Odwołaj
          </NavLink>
        </div>
      </div>
    </dialog>
  );
}

export default EditAcceptedModal;
