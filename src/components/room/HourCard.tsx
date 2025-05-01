import { AnySlot, TakenSlot, EmptySlot } from '../../model/Slot';

function HourCard({ slot }: HourCardProps) {
  function TakenCard({ slot }: { slot: TakenSlot }) {
    return (
      <div className='card border border-base-content/5 shadow-md bg-base-200 w-32 h-28'>
        <div className='card-body'>
          <div className='badge badge-soft badge-primary badge-sm'>
            {slot.time}
          </div>
          <h3 className='font-semibold'>{slot.subject}</h3>
        </div>
      </div>
    );
  }

  function EmptyCard({ slot }: { slot: EmptySlot }) {
    return (
      <div className='card border border-base-content/8 shadow-md bg-base-300 w-32 h-28'>
        <div className='card-body'>
          <div className='badge badge-soft badge-primary badge-sm'>
            {slot.time}
          </div>
          <div className='card-actions justify-center'>
            <button className='btn'>Rezerwuj</button>
          </div>
        </div>
      </div>
    );
  }

  switch (slot.type) {
    case 'taken':
      return (
        <tr>
          <td>
            <TakenCard slot={slot} />
          </td>
        </tr>
      );
    case 'empty':
      return (
        <tr>
          <td>
            <EmptyCard slot={slot} />
          </td>
        </tr>
      );
  }
}

interface HourCardProps {
  slot: AnySlot;
}

export default HourCard;
