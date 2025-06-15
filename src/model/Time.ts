import { AnySlot } from './slots';

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
const monthNames = [
  'Sty',
  'Lut',
  'Mar',
  'Kwi',
  'Maj',
  'Cze',
  'Lip',
  'Sie',
  'Wrz',
  'Paź',
  'Lis',
  'Gru',
];

function dayName(day: Day): string {
  return dayNames[day];
}

function dayFromDate(date: Date): Day {
  switch (date.getDay()) {
    case 1:
      return Day.MONDAY;
    case 2:
      return Day.TUESDAY;
    case 3:
      return Day.WEDNESDAY;
    case 4:
      return Day.THURSDAY;
    case 5:
      return Day.FRIDAY;
    case 6:
      return Day.SATURDAY;
    case 0:
      return Day.SUNDAY;
    default:
      return Day.MONDAY;
  }
}

function dateFromDate(date: Date): string {
  const d = date.getDate();
  const m = date.getMonth();
  return d + ' ' + monthNames[m];
}

function timeFromDate(date: Date): string {
  const h = date.getHours();
  const m = date.getMinutes();
  return h.toString() + ':' + m.toString().padStart(2, '0');
}

function dateTimesOfWeek(week: number): Date[] {
  return [-1, 0, 1, 2, 3, 4, 5].map(day => {
    const date = new Date(2025, 0);
    date.setDate(week * 7 + day);
    return date;
  });
}

interface DayBin {
  day: Day;
  slots: { [startTime: string]: AnySlot };
}

function defaultBin(dateTime: Date): DayBin {
  const date = dateFromDate(dateTime);
  const day = dayFromDate(dateTime);
  const slots: { [startTime: string]: AnySlot } = {
    '8:00': {
      date,
      startTime: '8:00',
      endTime: '9:30',
      type: 'empty',
    } satisfies AnySlot,
    '9:45': {
      date,
      startTime: '9:45',
      endTime: '11:15',
      type: 'empty',
    } satisfies AnySlot,
    '11:30': {
      date,
      startTime: '11:30',
      endTime: '13:00',
      type: 'empty',
    } satisfies AnySlot,
    '13:15': {
      date,
      startTime: '13:15',
      endTime: '14:45',
      type: 'empty',
    } satisfies AnySlot,
    '15:00': {
      date,
      startTime: '15:00',
      endTime: '16:30',
      type: 'empty',
    } satisfies AnySlot,
    '16:45': {
      date,
      startTime: '16:45',
      endTime: '18:15',
      type: 'empty',
    } satisfies AnySlot,
    '18:30': {
      date,
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
export {
  defaultBin,
  dayName,
  dayFromDate,
  dateFromDate,
  timeFromDate,
  dateTimesOfWeek,
  days,
};
