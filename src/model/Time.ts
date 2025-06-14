import { AnySlot } from './Slots';

enum Day {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

const dayNames = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];

function dayName(day: Day): string {
  return dayNames[day];
}

function dayFromDate(dateTime: string): Day {
  const date = new Date(dateTime);
  return date.getDay() - 1;
}

function timeFromDate(dateTime: string): string {
  const date = new Date(dateTime);
  const h = date.getHours();
  const m = date.getMinutes();
  return h.toString() + ':' + m.toString().padStart(2, '0');
}

interface DayBin {
  day: Day;
  slots: { [startTime: string]: AnySlot };
}

function defaultBin(day: Day): DayBin {
  const slots: { [startTime: string]: AnySlot } = {
    '8:00': {
      startTime: '8:00',
      endTime: '9:30',
      type: 'empty',
    } satisfies AnySlot,
    '9:45': {
      startTime: '9:45',
      endTime: '11:15',
      type: 'empty',
    } satisfies AnySlot,
    '11:30': {
      startTime: '11:30',
      endTime: '13:00',
      type: 'empty',
    } satisfies AnySlot,
    '13:15': {
      startTime: '13:15',
      endTime: '14:45',
      type: 'empty',
    } satisfies AnySlot,
    '15:00': {
      startTime: '15:00',
      endTime: '16:30',
      type: 'empty',
    } satisfies AnySlot,
    '16:45': {
      startTime: '16:45',
      endTime: '18:15',
      type: 'empty',
    } satisfies AnySlot,
    '18:30': {
      startTime: '18:30',
      endTime: '20:00',
      type: 'empty',
    } satisfies AnySlot,
  };
  return {
    day,
    slots,
  };
}

const days = [
  Day.MONDAY,
  Day.TUESDAY,
  Day.WEDNESDAY,
  Day.THURSDAY,
  Day.FRIDAY,
  Day.SATURDAY,
  Day.SUNDAY,
];

export type { Day, DayBin };
export { defaultBin, dayName, dayFromDate, timeFromDate, days };
