import {
  AnySlot,
  AcceptedSlot,
  ProposedSlot,
  EmptySlot,
} from '../../model/Slots';

import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function HourCard({ slot }: HourCardProps) {
  function AcceptedCard({ slot }: { slot: AcceptedSlot }) {
    return (
      <div className='card border border-base-content/5 overflow-y-scroll shadow-md bg-emerald-950 w-32 h-32'>
        <div className='card-body p-2'>
          <div className='flex flex-row justify-between'>
            <div className='badge badge-soft badge-accent badge-sm'>
              {slot.startTime}
            </div>
            <h3 className='font-semibold px-2'>{slot.subject}</h3>
          </div>
          <h3 className='font-medium'>
            <i>{slot.where}</i>
          </h3>
          <button
            className='btn btn-outline btn-square mt-auto'
            onClick={() => {}}
          >
            <EditIcon />
          </button>
        </div>
      </div>
    );
  }

  function ProposedCard({ slot }: { slot: ProposedSlot }) {
    return (
      <div className='card border border-base-content/5 overflow-y-scroll shadow-md bg-amber-950 w-32 h-32'>
        <div className='card-body p-2'>
          <div className='flex flex-row justify-between'>
            <div className='badge badge-soft badge-warning badge-sm'>
              {slot.startTime}
            </div>
            <h3 className='font-semibold px-2'>{slot.subject}</h3>
          </div>
          <p className='font-medium'>
            <i>{slot.where}</i>
          </p>
          <p>propozycja</p>
          <div className='join mt-auto'>
            <button
              className='btn btn-square btn-sm btn-outline join-item'
              onClick={() => {}}
            >
              <ThumbUpIcon />
            </button>
            <button
              className='btn btn-square btn-sm btn-outline join-item'
              onClick={() => {}}
            >
              <ThumbDownIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function EmptyCard({ slot }: { slot: EmptySlot }) {
    function reserve() {
      const dialog = document.getElementById(
        'reserve_modal'
      ) as HTMLDialogElement;
      dialog?.showModal();
    }

    return (
      <div className='card border border-base-content/8 shadow-md bg-base-300 w-32 h-32'>
        <div className='card-body p-2'>
          <div className='badge badge-soft badge-ghost badge-sm'>
            {slot.startTime}
          </div>
          <div className='card-actions justify-center'></div>
        </div>
      </div>
    );
  }

  switch (slot.type) {
    case 'accepted':
      return (
        <tr>
          <td>
            <AcceptedCard slot={slot} />
          </td>
        </tr>
      );
    case 'proposed':
      return (
        <tr>
          <td>
            <ProposedCard slot={slot} />
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
