import {useEffect, useId, useState} from 'react';
import {useAppContext} from '../../context/AppContext';
import {EmptySlot} from '../../model/Slots';
import CloseModal from './CloseModal';
import {bulkReserveModalId, useInfo} from './modals';
import createClient from 'openapi-fetch';
import {components, paths} from '../../api/schema';
import InfoModal from './InfoModal';

type ReservationInfo = components['schemas']['ReservationInfo'];
type ClassGroup = components['schemas']['ClassGroup'];

const client = createClient<paths>({baseUrl: import.meta.env.VITE_API_URL});

interface ReserveBulkModalProps {
    roomId: string;
}

function ReserveBulkModal({roomId}: ReserveBulkModalProps) {
    const {state} = useAppContext();
    const emptySlot = state.slots[bulkReserveModalId] as EmptySlot;
    const [variant, setVariant] = useState<'existing' | 'new'>('existing');
    const [reservationInfos, setReservationInfos] = useState<ReservationInfo[]>([]);
    const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);
    const [selectedReservationInfo, setSelectedReservationInfo] = useState<number | null>(null);
    const [selectedClassGroup, setSelectedClassGroup] = useState<number | null>(null);

    // Form fields for new reservation info
    const [description, setDescription] = useState<string>('');
    const [contactEmail, setContactEmail] = useState<string>('');

    // Date management
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [generatedDates, setGeneratedDates] = useState<string[]>([]);

    const infoModalId = useId();
    const [info, emitInfo] = useInfo(infoModalId);

    useEffect(() => {
        // Initialize with the empty slot's time if available
        if (emptySlot) {
            const offsetDate = new Date(emptySlot.startTime.getTime() - (emptySlot.startTime.getTimezoneOffset() * 60000));
            const slotDate = offsetDate.toISOString().slice(0, 16);
            setStartDate(slotDate);
        }
    }, [emptySlot]);

    useEffect(() => {
        async function fetchReservationInfos() {
            const {data, error} = await client.GET('/api/reservation-info/', {
                headers: {
                    Authorization: 'Token ' + state?.user?.token,
                },
            });
            if (!error) {
                setReservationInfos(data || []);
            }
        }

        if (variant === 'existing') {
            fetchReservationInfos();
        }

        async function fetchGroups() {
            const {data, error} = await client.GET('/api/class_groups/', {
                headers: {
                    Authorization: 'Token ' + state?.user?.token,
                },
            });
            if (!error) {
                setClassGroups(data || []);
            }
        }

        if (variant === 'existing') {
            fetchGroups();
        }
    }, [variant, state?.user?.token]);

    // Generate weekly dates when start or end date changes
    useEffect(() => {
        if (startDate && endDate) {
            const dates: string[] = [];
            const start = new Date(startDate);
            const end = new Date(endDate);

            const currentDate = new Date(start);
            while (currentDate <= end) {
                const offsetDate = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000));
                dates.push(offsetDate.toISOString());
                currentDate.setDate(currentDate.getDate() + 7);
            }

            setGeneratedDates(dates);
        } else {
            setGeneratedDates([]);
        }
    }, [startDate, endDate]);

    const handleSubmit = async () => {
        const payload = variant === 'existing'
            ? {
                room_id: parseInt(roomId),
                reservation_info_id: selectedReservationInfo,
                date_times: generatedDates,
            }
            : {
                room_id: parseInt(roomId),
                reservation_info_data: {
                    user_id: 0,
                    group_id: selectedClassGroup, // This should be handled differently based on your backend requirements
                    description: description,
                    contact_email: contactEmail,
                },
                date_times: generatedDates,
            };

        const {error} = await client.POST('/api/reservation/bulk_create/', {
            headers: {
                Authorization: 'Token ' + state?.user?.token,
            },
            body: payload,
        });

        if (!error) {
            emitInfo({
                type: 'success',
                header: 'Zarezerowano salę',
                message: '',
            });
        } else {
            emitInfo({
                type: 'error',
                header: 'Nie można zarezerować sali',
                message: '',
            });
        }
    };

    return (
        <>
            <InfoModal id={infoModalId} info={info}/>
            <dialog id={bulkReserveModalId} className='modal'>
                <div className='modal-box max-w-2xl space-y-4'>
                    <h3 className='font-bold text-lg'>Rezerwacja wielu terminów</h3>

                    {/* Variant selector */}
                    <div className='tabs tabs-boxed'>
                        <a
                            className={`tab ${variant === 'existing' ? 'tab-active' : ''}`}
                            onClick={() => setVariant('existing')}
                        >
                            Istniejąca grupa
                        </a>
                        <a
                            className={`tab ${variant === 'new' ? 'tab-active' : ''}`}
                            onClick={() => setVariant('new')}
                        >
                            Nowa grupa
                        </a>
                    </div>

                    {/* Form content based on variant */}
                    {variant === 'existing' ? (
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Wybierz zajęcia</span>
                            </label>
                            <select
                                className='select select-bordered w-full'
                                value={selectedReservationInfo || ''}
                                onChange={(e) => setSelectedReservationInfo(parseInt(e.target.value))}
                            >
                                <option value=''>Wybierz zajęcia...</option>
                                {reservationInfos.map((info) => (
                                    <option key={info.id} value={info.id}>
                                        {info.group?.name || ''} - {info.description || ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Wybierz grupę zajęciową</span>
                                </label>
                                <select
                                    className='select select-bordered w-full'
                                    value={selectedClassGroup || ''}
                                    onChange={(e) => setSelectedClassGroup(parseInt(e.target.value))}
                                >
                                    <option value=''>Wybierz grupę...</option>
                                    {classGroups.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name || ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Opis</span>
                                </label>
                                <textarea
                                    className='textarea textarea-bordered w-full'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Email kontaktowy</span>
                                </label>
                                <input
                                    type='email'
                                    className='input input-bordered w-full'
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Date range selection */}
                    <div className='divider'>Zakres terminów</div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Data początkowa</span>
                            </label>
                            <input
                                type='datetime-local'
                                className='input input-bordered w-full'
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                disabled={true}
                            />
                        </div>

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Data końcowa</span>
                            </label>
                            <input
                                type='datetime-local'
                                className='input input-bordered w-full'
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={startDate}
                            />
                        </div>
                    </div>

                    {/* Generated dates preview */}
                    <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            <h4 className='font-medium'>Wygenerowane terminy (co tydzień)</h4>
                            <span className='badge badge-primary'>
                {generatedDates.length} {generatedDates.length === 1 ? 'termin' : 'terminów'}
              </span>
                        </div>

                        <div className='max-h-48 overflow-y-auto border border-base-300 rounded-lg p-3'>
                            {generatedDates.length === 0 ? (
                                <p className='text-sm text-base-content/60 text-center py-4'>
                                    Wybierz daty początkową i końcową, aby wygenerować terminy
                                </p>
                            ) : (
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                    {generatedDates.map((dateTime, index) => (
                                        <div key={index} className='flex items-center p-2 bg-base-200 rounded text-sm'>
                      <span className='font-mono'>
                        {new Date(dateTime).toLocaleDateString('pl-PL', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                      </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className='modal-action'>
                        <button
                            className='btn btn-primary'
                            onClick={handleSubmit}
                            disabled={
                                generatedDates.length === 0 ||
                                (variant === 'existing' && !selectedReservationInfo) ||
                                (variant === 'new' && (!description))
                            }
                        >
                            Zarezerwuj {generatedDates.length > 0 && `(${generatedDates.length} terminów)`}
                        </button>
                        <CloseModal/>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default ReserveBulkModal;