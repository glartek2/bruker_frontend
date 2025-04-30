import { MaybeBooking } from '../../model/Slot';

function HourSlot({ booking }: { booking: MaybeBooking }) {
  const hasBooking = booking !== null;
  const bodyBackgroundColor = hasBooking ? 'bg-indigo-300' : 'bg-base-300';
  const bodyClassName = 'card w-32 h-28 shadow-sm ' + bodyBackgroundColor;
  return (
    <div className={bodyClassName}>
      <div className='card-body'>
        {hasBooking ? (
          <>
            <h3 className='card-title'>{booking?.subject}</h3>
            <p>Teacher: {booking?.teacher}</p>
          </>
        ) : (
          <>
            <h3 className='card-title'>Wolne</h3>
            <div className='card-actions justify-center'>
              <button className='btn'>Rezerwuj</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HourSlot;
