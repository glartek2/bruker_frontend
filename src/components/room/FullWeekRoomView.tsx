import HourSlot from './HourSlot';
import { SlotsRow } from '../../model/Slot';

const days = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];

function FullWeekRoomView({ slots }: FullWeekRoomViewProps) {
  function HourSlotRow({ slotsRow }: HourSlotRowProps) {
    const { time, cols } = slotsRow;
    return (
      <tr>
        <th>{time}</th>
        {cols.map(slot => (
          <td>
            <HourSlot booking={slot} />
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
            <button className='join-item btn'>« Poprzedni</button>
            <button className='join-item btn'>28.04 - 04.05</button>
            <button className='join-item btn'>Następny »</button>
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
            {slots.map(slotsRow => (
              <HourSlotRow slotsRow={slotsRow} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

interface FullWeekRoomViewProps {
  slots: SlotsRow[];
}

interface HourSlotRowProps {
  slotsRow: SlotsRow;
}

export default FullWeekRoomView;
