import { useAppContext } from '../../context/AppContext';
import { ProposedSlot } from '../../model/slots';
import PropositionView from '../view/PropositionView';
import CloseModal from './CloseModal';
import { viewProposedModalId } from './modals';

function ViewProposedModal() {
  const { state } = useAppContext();
  const proposedSlot = state.slots[viewProposedModalId] as ProposedSlot;
  const acceptedSlot = proposedSlot?.accepted;

  return (
    <dialog id={viewProposedModalId} className='modal'>
      <div className='modal-box space-y-4'>
        <div className='flex items-center space-x-4'>
          <h3 className='font-bold text-lg'>Propozycja zmiany</h3>
          <span className='badge badge-soft badge-info'>
            <div className='status status-info animate-pulse'></div>
            {proposedSlot?.byUser}
          </span>
        </div>
        <PropositionView
          proposedSlot={proposedSlot}
          acceptedSlot={acceptedSlot}
        />
        <CloseModal />
      </div>
    </dialog>
  );
}

export default ViewProposedModal;
