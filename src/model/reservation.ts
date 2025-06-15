import { components } from '../api/schema';

type Reservation = components['schemas']['Reservation'];

function reservationLocation(reservation: Reservation): string {
  const room = reservation.room;
  return room.room_number + ' / ' + room.building.name;
}

export { reservationLocation };
