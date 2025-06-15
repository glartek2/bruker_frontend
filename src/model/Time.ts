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

function dateFromDate(date: Date | undefined): string {
  if (!date) return '---';
  const d = date.getDate();
  const m = date.getMonth();
  return d + ' ' + monthNames[m];
}

function timeFromDate(date: Date | undefined): string {
  if (!date) return '--:--';
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
  function getStartTime(dateTime: Date, slotId: number) {
    const startTime = new Date(dateTime);
    const minutesOffset = slotId * 105;
    const h = 8 + Math.floor(minutesOffset / 60);
    const m = (0 + minutesOffset) % 60;
    startTime.setHours(h);
    startTime.setMinutes(m);
    return startTime;
  }

  function getEndTime(dateTime: Date, slotId: number) {
    const endTime = new Date(dateTime);
    const minutesOffset = 90 + slotId * 105;
    const h = 8 + Math.floor(minutesOffset / 60);
    const m = (0 + minutesOffset) % 60;
    endTime.setHours(h);
    endTime.setMinutes(m);
    return endTime;
  }

  const day = dayFromDate(dateTime);
  const slots: { [startTime: string]: AnySlot } = {
    '8:00': {
      startTime: getStartTime(dateTime, 0),
      endTime: getEndTime(dateTime, 0),
      type: 'empty',
    } satisfies AnySlot,
    '9:45': {
      startTime: getStartTime(dateTime, 1),
      endTime: getEndTime(dateTime, 1),
      type: 'empty',
    } satisfies AnySlot,
    '11:30': {
      startTime: getStartTime(dateTime, 2),
      endTime: getEndTime(dateTime, 2),
      type: 'empty',
    } satisfies AnySlot,
    '13:15': {
      startTime: getStartTime(dateTime, 3),
      endTime: getEndTime(dateTime, 3),
      type: 'empty',
    } satisfies AnySlot,
    '15:00': {
      startTime: getStartTime(dateTime, 4),
      endTime: getEndTime(dateTime, 4),
      type: 'empty',
    } satisfies AnySlot,
    '16:45': {
      startTime: getStartTime(dateTime, 5),
      endTime: getEndTime(dateTime, 5),
      type: 'empty',
    } satisfies AnySlot,
    '18:30': {
      startTime: getStartTime(dateTime, 6),
      endTime: getEndTime(dateTime, 6),
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
