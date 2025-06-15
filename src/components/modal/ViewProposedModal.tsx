import { useAppContext } from '../../context/AppContext';
import { ProposedSlot } from '../../model/slots';
import { viewProposedModalId } from './modals';

function ViewProposedModal() {
  const { state } = useAppContext();
  const slot = state.slots[viewProposedModalId] as ProposedSlot;

  return (
    <dialog id={viewProposedModalId} className='modal'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>Propozycja zmiany</h3>
        <p className='py-4'>od: {slot.byUser}</p>
        <p className='py-4'>
          {slot.date} {slot.startTime} - {slot.endTime}
        </p>
        <p className='py-4'>w: {slot.where}</p>
        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn'>OK</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ViewProposedModal;
