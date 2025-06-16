import CloseModal from './CloseModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import {infoModalId} from "./modals.ts";

interface InfoModalProps {
    text: string;
    isSuccess: boolean;
}

function InfoModal({text, isSuccess}: InfoModalProps) {
    return (
        <dialog id={infoModalId} className='modal'>
            <div className='modal-box space-y-4'>
                <div className='flex items-center space-x-4'>
                    {isSuccess ? (
                        <CheckCircleIcon className='text-success text-4xl'/>
                    ) : (
                        <ErrorIcon className='text-error text-4xl'/>
                    )}
                    <h3 className='font-bold text-lg'>
                        {isSuccess ? 'Sukces' : 'Błąd'}
                    </h3>
                </div>

                <div className='py-4'>
                    <p className='text-base'>{text}</p>
                </div>

                <CloseModal/>

                <div className='modal-action'>
                    <form method="dialog">
                        <button className={`btn ${isSuccess ? 'btn-success' : 'btn-error'}`}>
                            OK
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default InfoModal;
