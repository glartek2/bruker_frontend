import {
  AnySlot,
  AcceptedSlot,
  ProposedSlot,
  EmptySlot,
} from '../../model/Slots';

import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

enum HourCardVariant {
  VIEW, // for schedule viewer
  MOVE, // for move reservation
}

function HourCard({ slot, variant }: HourCardProps) {
  function AcceptedCard({ slot }: { slot: AcceptedSlot }) {
    return (
      <div className='card border border-base-content/5 overflow-y-scroll shadow-md bg-emerald-950 w-32 h-28'>
        <div className='card-body p-2'>
          <div className='flex flex-row justify-between'>
            <div className='badge badge-soft badge-accent badge-sm'>
              {slot.startTime}
            </div>
            <h3 className='font-semibold px-2'>{slot.subject}</h3>
          </div>
          <h3 className='font-medium text-xs'>
            <i>{slot.where}</i>
          </h3>
          <div className='mt-auto flex flex-row justify-between items-center'>
            <p>wg planu</p>
            <div className='tooltip tooltip-left' data-tip='edytuj'>
              <button
                className='btn btn-square btn-sm btn-outline'
                onClick={() => {}}
              >
                <EditIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ProposedCard({ slot }: { slot: ProposedSlot }) {
    return (
      <div className='relative w-32 h-28'>
        <div className='card border border-base-content/5 overflow-y-scroll shadow-md bg-amber-950 w-32 h-28'>
          <div className='card-body p-2'>
            <div className='flex flex-row justify-between'>
              <div className='badge badge-soft badge-warning badge-sm'>
                {slot.startTime}
              </div>
              <h3 className='font-semibold px-2'>{slot.subject}</h3>
            </div>
            <p className='font-medium text-xs'>
              <i>{slot.where}</i>
            </p>
            <div className='mt-auto flex flex-row justify-between items-center'>
              <p>propozycja</p>
              <div className='tooltip tooltip-left' data-tip='więcej'>
                <button
                  className='btn btn-square btn-sm btn-outline'
                  onClick={() => {}}
                >
                  <InfoIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute top-[-11px] left-[-3px]'>
          <div className='inline-grid *:[grid-area:1/1]'>
            <div className='status status-info animate-ping w-2 h-2'></div>
            <div className='status status-info w-2 h-2'></div>
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
      <div className='card border border-base-content/8 shadow-md bg-base-300 w-32 h-28'>
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
  variant: HourCardVariant;
}

export default HourCard;
