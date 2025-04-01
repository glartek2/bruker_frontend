import { MaybeBooking } from './Slot';

function HourSlot({ booking }: { booking: MaybeBooking }) {
  if (booking === null)
    return (
      <div className='card card-border bg-base-300 w-32 h-32'>
        <div className='card-body'>
          <h3 className='card-title'>Wolne</h3>
          <div className='card-actions justify-center'>
            <button className='btn btn-primary'>Rezerwuj</button>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className='card card-border bg-info w-32 h-32'>
        <div className='card-body'>
          <h3 className='card-title'>{booking?.subject}</h3>
          <p>Teacher: {booking?.teacher}</p>
        </div>
      </div>
    );
}

export default HourSlot;
