import { components } from '../api/schema';

type Room = components['schemas']['Room'];

function roomLocation(room: Room): string {
  return room.room_number + ' / ' + room.building.name;
}

type EquipmentUnion = string | number | string[] | boolean;
type EquipmentDetails = { [key: string]: EquipmentUnion };

function roomEquipmentQuery(details: EquipmentDetails, capacity: number) {
  const detailsQuery: EquipmentDetails = { capacity__gte: capacity };
  for (const [key, value] of Object.entries(details)) {
    if (Array.isArray(value)) {
      detailsQuery[key + '__contains'] = value;
    } else {
      switch (typeof value) {
        case 'string':
          detailsQuery[key + '__ilike'] = value;
          break;
        case 'number':
          detailsQuery[key + '__gte'] = value;
          break;
        case 'boolean':
          detailsQuery[key + '__exact'] = value;
          break;
      }
    }
  }
  return detailsQuery;
}

export type { EquipmentUnion, EquipmentDetails };
export { roomLocation, roomEquipmentQuery };
