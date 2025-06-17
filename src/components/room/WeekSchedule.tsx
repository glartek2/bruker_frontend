import HourCard from './HourCard';
import {
  DayBin,
  dayFromDate,
  dayName,
  defaultBin,
  timeFromDate,
} from '../../model/Time';
import { components } from '../../api/schema';
import { toAcceptedSlot, toProposedSlot } from '../../model/Slots';
import { useMemo } from 'react';
import { roomLocation } from '../../model/reservation';

type Reservation = components['schemas']['Reservation'];

enum ScheduleVariant {
  VIEW, // for schedule viewer
  MOVE, // for move reservation
  NEW,
}

function WeekSchedule({ dateTimes, schedule, variant }: WeekScheduleProps) {
  function DayCol({ dayBin }: DayColProps) {
    const { day, slots } = dayBin;
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>{dayName(day)}</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(slots).map((slot, index) => (
            <HourCard key={index} slot={slot} variant={variant} />
          ))}
        </tbody>
      </table>
    );
  }

  const widths = 'w-80 sm:w-md md:w-xl lg:w-3xl xl:w-full';

  const dayBins = useMemo<DayBin[]>(
    () => scheduleToDayBins(dateTimes, schedule),
    [dateTimes, schedule]
  );

  return (
    <div className={'overflow-x-auto ' + widths}>
      <div className={'carousel carousel-center rounded-box ' + widths}>
        {dayBins.map((dayBin, index) => (
          <div key={index} className='carousel-item'>
            <DayCol dayBin={dayBin} />
          </div>
        ))}
      </div>
    </div>
  );
}

function scheduleToDayBins(
  dateTimes: Date[],
  schedule: Reservation[]
): DayBin[] {
  const bins = dateTimes.map(defaultBin);
  console.log(bins);
  for (const reservation of schedule) {
    const acceptedDateTime = new Date(reservation.date_time);
    const acceptedDay = dayFromDate(acceptedDateTime);
    const acceptedTime = timeFromDate(acceptedDateTime);
    console.log(acceptedTime);

    const hasProposition =
      reservation.proposed_date_time !== undefined &&
      reservation.proposed_date_time !== null;
    const acceptedBin = bins[acceptedDay];
    try {
      const acceptedSlot = toAcceptedSlot(
        acceptedBin.slots[acceptedTime],
        reservation.id,
        roomLocation(reservation.room),
        reservation.reservation_info.description,
        hasProposition
      );
      acceptedBin.slots[acceptedTime] = acceptedSlot;
      console.log(reservation.proposed_date_time);
      if (reservation.proposed_date_time) {
        const proposedDateTime = new Date(reservation.proposed_date_time);
        const proposedDay = dayFromDate(proposedDateTime);
        const proposedTime = timeFromDate(proposedDateTime);

        const proposedBin = bins[proposedDay];
        const byUser = reservation.reservation_info.group.name;
        proposedBin.slots[proposedTime] = toProposedSlot(
          proposedBin.slots[proposedTime],
          reservation.id,
          roomLocation(reservation.proposed_room),
          reservation.reservation_info.description,
          acceptedSlot,
          byUser
        );
      }
    } catch {
      console.warn('bad start time', acceptedTime);
    }
  }
  return bins;
}

interface WeekScheduleProps {
  dateTimes: Date[];
  schedule: Reservation[];
  variant: ScheduleVariant;
}

interface DayColProps {
  dayBin: DayBin;
}

export { ScheduleVariant };
export default WeekSchedule;
