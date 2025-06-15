import { useAppContext } from '../../context/AppContext';
import { AcceptedSlot } from '../../model/Slots';
import AcceptedView from '../view/AcceptedView';
import CloseModal from './CloseModal';
import { reserveEmptyModalId } from './modals';

function ReserveEmptyModal() {
  const { state } = useAppContext();
  const acceptedSlot = state.slots[reserveEmptyModalId] as AcceptedSlot;

  return (
    <dialog id={reserveEmptyModalId} className='modal'>
      <div className='modal-box space-y-4'>
        <h3 className='font-bold text-lg'>
          Planowe {acceptedSlot?.hasProposition ? '(proponowane zmiany)' : ''}
        </h3>
        <AcceptedView acceptedSlot={acceptedSlot} />
        <CloseModal />
      </div>
    </dialog>
  );
}

export default ReserveEmptyModal;
