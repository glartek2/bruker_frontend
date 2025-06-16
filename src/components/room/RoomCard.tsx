import { components } from '../../api/schema';
import { roomLocation } from '../../model/reservation';
import { ReactElement } from 'react';

type Room = components['schemas']['Room'];

function RoomCard({ room, actionProducer }: RoomCardProps) {
  return (
    <>
      <div className='list-col-grow'>
        <div>{roomLocation(room)}</div>
        <div className='text-xs uppercase font-semibold opacity-60'>
          {room.capacity} siedzeń
        </div>
      </div>
      {actionProducer(room.id)}
    </>
  );
}

interface RoomCardProps {
  room: Room;
  actionProducer: (id: number) => ReactElement;
}

export default RoomCard;
