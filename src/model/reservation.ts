import { components } from '../api/schema';

type Room = components['schemas']['Room'];

function roomLocation(room: Room): string {
  return room.room_number + ' / ' + room.building.name;
}

export { roomLocation };
