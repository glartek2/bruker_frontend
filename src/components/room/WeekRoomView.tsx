import HourCard from './HourCard';
import { DaySlots } from '../../model/Slot';

function WeekRoomView({ daysSlots }: WeekRoomViewProps) {
  function DaySlotCol({ daySlots }: DaySlotColProps) {
    const { day, rows } = daySlots;
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>{day}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((slot, index) => (
            <HourCard key={index} slot={slot} />
          ))}
        </tbody>
      </table>
    );
  }

  const widths = 'w-80 sm:w-md md:w-xl lg:w-3xl xl:w-full';

  return (
    <div className={'overflow-x-auto ' + widths}>
      <div className={'carousel carousel-center rounded-box ' + widths}>
        {daysSlots.map((daySlots, index) => (
          <div key={index} className='carousel-item'>
            <DaySlotCol daySlots={daySlots} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface WeekRoomViewProps {
  daysSlots: DaySlots[];
}

interface DaySlotColProps {
  daySlots: DaySlots;
}

export default WeekRoomView;
