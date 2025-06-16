import { useEffect, useId, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { EmptySlot } from '../../model/slots';
import CloseModal from './CloseModal';
import { reserveEmptyModalId, useInfo } from './modals';
import { EquipmentDetails, roomEquipmentQuery } from '../../model/reservation';
import createClient from 'openapi-fetch';
import { components, paths } from '../../api/schema';
import RoomCard from '../room/RoomCard';
import ItemList from '../ItemList';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EmptyView from '../view/EmptyView';
import InfoModal from './InfoModal';

type Reservation = components['schemas']['Reservation'];
type Room = components['schemas']['Room'];

const client = createClient<paths>({ baseUrl: import.meta.env.VITE_API_URL });

function ReserveEmptyModal({
  reservation,
  notifyChange,
}: ReserveEmptyModalProps) {
  const { state } = useAppContext();
  const emptySlot = state.slots[reserveEmptyModalId] as EmptySlot;
  const [rooms, setRooms] = useState<Room[]>([]);
  const infoModalId = useId();
  const [info, emitInfo] = useInfo(infoModalId);

  useEffect(() => {
    async function fetchAvailableRooms() {
      if (emptySlot) {
        const room = reservation?.room;
        const details = (room?.equipment?.details ?? {}) as EquipmentDetails;
        const query = roomEquipmentQuery(details, room?.capacity);
        const { data, error } = await client.GET('/api/rooms/available/', {
          params: {
            query: {
              start: emptySlot.startTime.toISOString(),
              end: emptySlot.endTime.toISOString(),
              ...query,
            },
          },
        });
        if (!error) {
          setRooms(data);
        }
      }
    }
    fetchAvailableRooms();
  }, [emptySlot, reservation]);

  function roomActionProducer(roomId: number) {
    async function roomReserve() {
      const { error } = await client.PUT('/api/reservation/{id}/', {
        params: {
          path: { id: reservation?.id },
        },
        headers: {
          Authorization: 'Token ' + state?.user?.token,
        },
        body: {
          room_id: reservation?.room.id,
          proposed_room_id: roomId,
          reservation_info_id: reservation?.reservation_info.id,
          // reservation_info_data: {
          //   user_id: reservation?.reservation_info.user.id ?? 0,
          //   group_id: reservation?.reservation_info.group.id ?? 0,
          //   description: reservation?.reservation_info.description ?? '',
          // },
          date_time: reservation?.date_time,
          proposed_date_time: emptySlot?.startTime.toISOString(),
        },
      });
      if (!error) {
        emitInfo({
          type: 'success',
          header: 'Zarezerowano salę',
          message: '',
        });
        notifyChange();
      } else {
        emitInfo({
          type: 'error',
          header: 'Nie można zarezerować sali',
          message: '',
        });
      }
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
  reservation: Reservation;
  notifyChange: () => unknown;
}

export default ReserveEmptyModal;
