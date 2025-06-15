import HourCard from './HourCard';
import {
  DayBin,
  dayFromDate,
  dayName,
  defaultBin,
  timeFromDate,
} from '../../model/time';
import { components } from '../../api/schema';
import { toAcceptedSlot, toProposedSlot } from '../../model/slots';
import { useMemo } from 'react';
import { reservationLocation } from '../../model/reservation';

type Reservation = components['schemas']['Reservation'];

enum ScheduleVariant {
  VIEW, // for schedule viewer
  MOVE, // for move reservation
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
  for (const reservation of schedule) {
    const acceptedDateTime = new Date(reservation.date_time);
    const acceptedDay = dayFromDate(acceptedDateTime);
    const acceptedTime = timeFromDate(acceptedDateTime);
    console.log(acceptedTime);

    const acceptedBin = bins[acceptedDay];
    try {
      acceptedBin.slots[acceptedTime] = toAcceptedSlot(
        acceptedBin.slots[acceptedTime],
        reservation.id,
        reservationLocation(reservation),
        reservation.reservation_info.description
      );
    } catch {
      console.warn('bad accepted start time', acceptedTime);
    }

    console.log(reservation.proposed_date_time);
    if (reservation.proposed_date_time) {
      const proposedDateTime = new Date(reservation.proposed_date_time);
      const proposedDay = dayFromDate(proposedDateTime);
      const proposedTime = timeFromDate(proposedDateTime);

      const proposedBin = bins[proposedDay];
      try {
        proposedBin.slots[proposedTime] = toProposedSlot(
          proposedBin.slots[proposedTime],
          reservation.id,
          reservationLocation(reservation),
          reservation.reservation_info.description,
          'unknown'
        );
      } catch {
        console.warn('bad proposed start time', proposedTime);
      }
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
