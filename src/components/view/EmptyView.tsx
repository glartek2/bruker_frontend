import { EmptySlot } from '../../model/Slots';
import { dateFromDate, timeFromDate } from '../../model/Time';

function EmptyView({ emptySlot }: EmptyViewProps) {
  return (
    <div className='grid grid-cols-[1fr_4fr]'>
      <p>
        <i>kiedy: </i>
      </p>
      <p className='text-left'>
        <span className='badge badge-soft'>
          {dateFromDate(emptySlot?.startTime)}{' '}
          {timeFromDate(emptySlot?.startTime)} -{' '}
          {timeFromDate(emptySlot?.endTime)}
        </span>
      </p>
    </div>
  );
}

interface EmptyViewProps {
  emptySlot: EmptySlot;
}

export default EmptyView;
