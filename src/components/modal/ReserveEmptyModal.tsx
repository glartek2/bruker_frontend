import { useEffect, useId, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { EmptySlot } from '../../model/slots';
import CloseModal from './CloseModal';
import { reserveEmptyModalId, useInfo } from './modals';
import { EquipmentDetails } from '../../model/reservation';
import createClient from 'openapi-fetch';
import { components, paths } from '../../api/schema';
import RoomCard from '../room/RoomCard';
import ItemList from '../ItemList';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EmptyView from '../view/EmptyView';
import InfoModal from './InfoModal';

type Room = components['schemas']['Room'];

const client = createClient<paths>({ baseUrl: import.meta.env.VITE_API_URL });

function ReserveEmptyModal({ detailsQuery }: ReserveEmptyModalProps) {
  const { state } = useAppContext();
  const emptySlot = state.slots[reserveEmptyModalId] as EmptySlot;
  const [rooms, setRooms] = useState<Room[]>([]);
  const infoModalId = useId();
  const [info, emitInfo] = useInfo(infoModalId);

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
        setRooms(data);
      }
    }
    fetchAvailableRooms();
  }, [emptySlot, detailsQuery]);

  function roomActionProducer(roomId: number) {
    function roomReserve() {
      emitInfo({
        type: 'success',
        header: 'Zarezerowano salę',
        message: 'roomID: ' + roomId,
      });
    }

    return (
      <div className='tooltip tooltip-left' data-tip='wybierz'>
        <button className='btn btn-square btn-ghost' onClick={roomReserve}>
          <ArrowRightIcon />
        </button>
      </div>
    );
  }

  return (
    <>
      <InfoModal id={infoModalId} info={info} />
      <dialog id={reserveEmptyModalId} className='modal'>
        <div className='modal-box space-y-4'>
          <h3 className='font-bold text-lg'>Wyszukiwarka sal</h3>
          <EmptyView emptySlot={emptySlot} />
          <div className='max-h-80 overflow-scroll'>
            <ItemList
              header={rooms.length + ' dostępne sale'}
              rows={rooms}
              mapper={row => (
                <RoomCard room={row} actionProducer={roomActionProducer} />
              )}
            />
          </div>
          <CloseModal />
        </div>
      </dialog>
    </>
  );
}

interface ReserveEmptyModalProps {
  detailsQuery: EquipmentDetails;
}

export default ReserveEmptyModal;
