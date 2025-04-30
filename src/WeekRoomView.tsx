import HourSlot from './HourSlot';
import { Slot } from './Slot';

const days = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];

function WeekRoomView({ slots }: HourViewProps) {
  function HourSlotRow({ slot }: HourSlotRow) {
    const { time, cols } = slot;
    return (
      <tr>
        <th>{time}</th>
        {cols.map(col => (
          <td>
            <HourSlot booking={col} />
          </td>
        ))}
      </tr>
    );
  }

  return (
    <>
      <div className='border border-base-content/5 bg-base-100'>
        <div className='flex justify-center'>
          <div className='join'>
            <button className='join-item btn btn-outline'>« Poprzedni</button>
            <button className='join-item btn btn-outline'>28.04 - 04.05</button>
            <button className='join-item btn btn-outline'>Następny »</button>
          </div>
        </div>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th></th>
              {days.map(day => (
                <th>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map(slot => (
              <HourSlotRow slot={slot} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

interface HourViewProps {
  slots: Slot[];
}

interface HourSlotRow {
  slot: Slot;
}

export default WeekRoomView;
