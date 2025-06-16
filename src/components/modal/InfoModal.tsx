import CloseModal from './CloseModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface Info {
  type: 'success' | 'info' | 'warning' | 'error';
  header: string;
  message: string;
}

interface InfoModalProps {
  id: string;
  info?: Info;
}

function InfoModal({ id, info }: InfoModalProps) {
  function getIcon() {
    switch (info?.type) {
      case 'success':
        return <CheckCircleIcon className='text-success text-4xl' />;
      case 'info':
        return <InfoIcon className='text-info text-4xl' />;
      case 'warning':
        return <WarningIcon className='text-warning text-4xl' />;
      case 'error':
        return <ErrorIcon className='text-error text-4xl' />;
      default:
        return <RemoveCircleIcon className='text-4xl' />;
    }
  }

  return (
    <dialog id={id} className='modal'>
      <div className='modal-box space-y-4'>
        <CloseModal />

        <div className='flex items-center space-x-4'>
          {getIcon()}
          <h3 className='font-bold text-lg'>
            {info?.header ?? 'Brak komunikatu'}
          </h3>
        </div>

        <div className='flex flex-row justify-between'>
          <div className='py-4'>
            <p className='text-base'>{info?.message ?? ''}</p>
          </div>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn'>OK</button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export type { Info };
export default InfoModal;
