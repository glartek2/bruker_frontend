import { AcceptedSlot } from '../../model/slots';

function AcceptedView({ acceptedSlot }: AcceptedViewProps) {
  return (
    <div className='grid grid-cols-[1fr_4fr]'>
      <p>
        <i>kiedy: </i>
      </p>
      <p className='text-left'>
        <span className='badge badge-soft'>
          {acceptedSlot?.date} {acceptedSlot?.startTime} -{' '}
          {acceptedSlot?.endTime}
        </span>
      </p>
      <p>
        <i>gdzie: </i>
      </p>
      <p className='text-left'>
        <span className='badge badge-soft'>{acceptedSlot?.where}</span>
      </p>
    </div>
  );
}

interface AcceptedViewProps {
  acceptedSlot: AcceptedSlot;
}

export default AcceptedView;
