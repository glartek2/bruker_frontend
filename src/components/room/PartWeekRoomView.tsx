import HourSlot from './HourSlot';
import { SlotsCol, SlotsRow } from '../../model/Slot';

const days = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];

function PartWeekRoomView({ slots }: PartWeekRoomViewProps) {
  function HourSlotCol({ slotsCol }: HourSlotColProps) {
    const { day, rows } = slotsCol;
    return (
      <table className='table table-zebra'>
        <thead>
          <tr>{day}</tr>
        </thead>
        <tbody>
          {rows.map(slot => (
            <tr>
              <td>
                <HourSlot booking={slot} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function emptySlotsCol(day: string): SlotsCol {
    return { day: day, rows: [] };
  }

  function toSlotsCols(slotsRows: SlotsRow[]): SlotsCol[] {
    const slotsCols = days.map(emptySlotsCol);
    for (const slotsRow of slotsRows) {
      for (let i = 0; i < days.length; i++) {
        slotsCols[i].rows.push(slotsRow.cols[i]);
      }
    }
    return slotsCols;
  }

  return (
    <>
      <div className='carousel carousel-center rounded-box w-max'>
        {toSlotsCols(slots).map(slotsCol => (
          <div className='carousel-item'>
            <HourSlotCol slotsCol={slotsCol} />
          </div>
        ))}
      </div>
    </>
  );
}

interface PartWeekRoomViewProps {
  slots: SlotsRow[];
}

interface HourSlotColProps {
  slotsCol: SlotsCol;
}

export default PartWeekRoomView;
