import { useAppContext } from '../../context/AppContext';
import { AcceptedSlot } from '../../model/slots';
import AcceptedView from '../view/AcceptedView';
import CloseModal from './CloseModal';
import { viewAcceptedModalId } from './modals';

function ViewAcceptedModal() {
  const { state } = useAppContext();
  const acceptedSlot = state.slots[viewAcceptedModalId] as AcceptedSlot;

  return (
    <dialog id={viewAcceptedModalId} className='modal'>
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
      </div>
    </dialog>
  );
}

export default ViewAcceptedModal;
