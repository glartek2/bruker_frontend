import { NavLink } from 'react-router';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { components } from '../../api/schema';

type Room = components['schemas']['Room'];

function RoomCard({ room }: { room: Room }) {
  const building = room.building;
  return (
    <>
      <div className='list-col-grow'>
        <div>
          {building.name} - {room.room_number}
        </div>
        <div className='text-xs uppercase font-semibold opacity-60'>
          {room.capacity} siedzeń
        </div>
      </div>
      {/* <p className='list-col-grow text-xs'>{building.description}</p> */}
      <NavLink className='btn btn-square btn-ghost' to={'/room/' + room.id}>
        <ArrowRightIcon />
      </NavLink>
    </>
  );
}

export default RoomCard;
