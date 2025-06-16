import {NavLink} from 'react-router';
import {useAppContext} from '../../context/AppContext';
import {AcceptedSlot} from '../../model/Slots';
import AcceptedView from '../view/AcceptedView';
import CloseModal from './CloseModal';
import {editAcceptedModalId, infoModalId, showModal} from './modals';
import {useState} from 'react';

import EditLocationIcon from '@mui/icons-material/EditLocation';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import createClient from "openapi-fetch";
import {paths} from "../../api/schema";
import InfoModal from "./InfoModal.tsx";

const client = createClient<paths>({baseUrl: import.meta.env.VITE_API_URL});

function EditAcceptedModal() {
    const {state} = useAppContext();
    const acceptedSlot = state.slots[editAcceptedModalId] as AcceptedSlot;
    const [infoModalText, setInfoModalText] = useState('');
    const [infoModalSuccess, setInfoModalSuccess] = useState(false);

    const handleCancelReservation = async () => {
        if (!acceptedSlot?.reservationId || !state?.user?.token) return;

        const {error} = await client.DELETE('/api/reservation/{id}/', {
            headers: {
                Authorization: 'Token ' + state.user.token,
            },
            params: {
                path: {
                    id: acceptedSlot.reservationId
                }
            }
        });

        if (!error) {
            setInfoModalText('Rezerwacja została pomyślnie odwołana.');
            setInfoModalSuccess(true);

            document.getElementById(`reservationCard` + acceptedSlot.reservationId)?.classList.add('bg-rose-900');
            document.getElementById(`reservationCard` + acceptedSlot.reservationId + `Badge`)?.classList.add('badge-error');

            showModal(infoModalId);
        } else {
            setInfoModalText('Nie masz uprawnień do odwołania rezerwacji.');
            setInfoModalSuccess(false);

            showModal(infoModalId);
        }
    };

    return (
        <>
            <InfoModal
                text={infoModalText}
                isSuccess={infoModalSuccess}
            />
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
                    <AcceptedView acceptedSlot={acceptedSlot}/>
                    <CloseModal/>
                    <div className='join flex justify-center'>
                        <NavLink
                            to={'/reservation/new_room/' + acceptedSlot?.reservationId}
                            className='btn join-item'
                        >
                            <EditLocationIcon/> Zmień salę
                        </NavLink>
                        <NavLink
                            to={'/reservation/new_time/' + acceptedSlot?.reservationId}
                            className='btn join-item'
                        >
                            <EditCalendarIcon/> Przesuń
                        </NavLink>
                        <button
                            onClick={handleCancelReservation}
                            className='btn join-item'
                        >
                            <EventBusyIcon/> Odwołaj
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default EditAcceptedModal;