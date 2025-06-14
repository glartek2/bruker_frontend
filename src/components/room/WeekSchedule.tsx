import HourCard from './HourCard';
import {
  DayBin,
  dayFromDate,
  dayName,
  defaultBin,
  timeFromDate,
} from '../../model/Time';
import { components } from '../../api/schema';
import { days } from '../../model/Time';
import { toAcceptedSlot, toProposedSlot } from '../../model/Slots';
import { useMemo } from 'react';

type Reservation = components['schemas']['Reservation'];

function WeekSchedule({ schedule }: WeekScheduleProps) {
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
            <HourCard key={index} slot={slot} />
          ))}
        </tbody>
      </table>
    );
  }

  const widths = 'w-80 sm:w-md md:w-xl lg:w-3xl xl:w-full';

  const dayBins = useMemo<DayBin[]>(
    () => scheduleToDayBins(schedule),
    [schedule]
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

function reservationLocation(reservation: Reservation): string {
  const room = reservation.room;
  return room.room_number + ' / ' + room.building.name;
}

function scheduleToDayBins(schedule: Reservation[]): DayBin[] {
  const bins = days.map(defaultBin);
  for (const reservation of schedule) {
    const acceptedDay = dayFromDate(reservation.date_time);
    const acceptedTime = timeFromDate(reservation.date_time);
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
      const proposedDay = dayFromDate(reservation.proposed_date_time);
      const proposedTime = timeFromDate(reservation.proposed_date_time);

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
  schedule: Reservation[];
}

interface DayColProps {
  dayBin: DayBin;
}

export default WeekSchedule;
