import CloseModal from './CloseModal';
import { badCredentialsModalId } from './modals';

function BadCredentialsModal() {
  return (
    <dialog id={badCredentialsModalId} className='modal'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>Email lub hasło są niepoprawne</h3>
        <CloseModal />
      </div>
    </dialog>
  );
}

export default BadCredentialsModal;
