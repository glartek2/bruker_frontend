import { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { EmptySlot } from '../../model/Slots';
import CloseModal from './CloseModal';
import { reserveEmptyModalId } from './modals';
import { EquipmentDetails } from '../../model/reservation';
import createClient from 'openapi-fetch';
import { paths } from '../../api/schema';

const client = createClient<paths>({ baseUrl: import.meta.env.VITE_API_URL });

function ReserveEmptyModal({ detailsQuery }: ReserveEmptyModalProps) {
  const { state } = useAppContext();
  const emptySlot = state.slots[reserveEmptyModalId] as EmptySlot;

  useEffect(() => {
    async function fetchAvailableRooms() {
      const { data, error } = await client.GET('/api/rooms/available/', {
        params: {
          query: {
            start: emptySlot.startTime.toISOString(),
            end: emptySlot.endTime.toISOString(),
            ...detailsQuery,
          },
        },
      });
      if (!error) {
        console.log(data);
      }
    }
    fetchAvailableRooms();
  }, [emptySlot, detailsQuery]);

  return (
    <dialog id={reserveEmptyModalId} className='modal'>
      <div className='modal-box space-y-4'>
        <h3 className='font-bold text-lg'>Wybierz salę</h3>
        {/* <AcceptedView acceptedSlot={emptySlot} /> */}
        <CloseModal />
      </div>
    </dialog>
  );
}

interface ReserveEmptyModalProps {
  detailsQuery: EquipmentDetails;
}

export default ReserveEmptyModal;
