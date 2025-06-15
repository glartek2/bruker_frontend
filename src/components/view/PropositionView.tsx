import { AcceptedSlot, ProposedSlot } from '../../model/Slots';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { dateFromDate, timeFromDate } from '../../model/Time';

function PropositionView({ acceptedSlot, proposedSlot }: PropositionViewProps) {
  return (
    <div className='grid grid-cols-[1fr_4fr_1fr_4fr]'>
      <p>
        <i>kiedy: </i>
      </p>
      <p className='text-right'>
        <span className='badge badge-soft badge-accent'>
          {dateFromDate(acceptedSlot?.startTime)}{' '}
          {timeFromDate(acceptedSlot?.startTime)} -{' '}
          {timeFromDate(acceptedSlot?.endTime)}
        </span>
      </p>
      <p className='text-center'>
        <ArrowRightIcon />
      </p>
      <p className='text-left'>
        <span className='badge badge-soft badge-warning'>
          {dateFromDate(proposedSlot?.startTime)}{' '}
          {timeFromDate(proposedSlot?.startTime)} -{' '}
          {timeFromDate(proposedSlot?.endTime)}
        </span>
      </p>
      <p>
        <i>gdzie: </i>
      </p>
      <p className='text-right'>
        <span className='badge badge-soft badge-accent'>
          {acceptedSlot?.where}
        </span>
      </p>
      <p className='text-center'>
        <ArrowRightIcon />
      </p>
      <p className='text-left'>
        <span className='badge badge-soft badge-warning'>
          {proposedSlot?.where}
        </span>
      </p>
    </div>
  );
}

interface PropositionViewProps {
  acceptedSlot: AcceptedSlot;
  proposedSlot: ProposedSlot;
}

export default PropositionView;
