import {
  AnySlot,
  AcceptedSlot,
  ProposedSlot,
  EmptySlot,
} from '../../model/slots';

import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { ScheduleVariant } from './WeekSchedule';
import { useAppContext } from '../../context/AppContext';
import { ActionType } from '../../context/reducer';
import {
  editAcceptedModalId,
  reserveEmptyModalId,
  viewAcceptedModalId,
  viewProposedModalId,
} from '../modal/modals';

function HourCard({ slot, variant }: HourCardProps) {
  const { dispatch } = useAppContext();

  function editAccepted(slot: AnySlot) {
    return () => {
      dispatch({
        type: ActionType.SET_SLOT,
        payload: { id: viewProposedModalId, value: slot },
      });
      const dialog = document.getElementById(
        editAcceptedModalId
      ) as HTMLDialogElement;
      dialog?.showModal();
    };
  }

  function viewAccepted(slot: AnySlot) {
    return () => {
      dispatch({
        type: ActionType.SET_SLOT,
        payload: { id: viewAcceptedModalId, value: slot },
      });
      const dialog = document.getElementById(
        viewAcceptedModalId
      ) as HTMLDialogElement;
      dialog?.showModal();
    };
  }

  function viewProposed(slot: AnySlot) {
    return () => {
      dispatch({
        type: ActionType.SET_SLOT,
        payload: { id: viewProposedModalId, value: slot },
      });
      const dialog = document.getElementById(
        viewProposedModalId
      ) as HTMLDialogElement;
      dialog?.showModal();
    };
  }

  function reserveEmpty(slot: AnySlot) {
    return () => {
      dispatch({
        type: ActionType.SET_SLOT,
        payload: { id: reserveEmptyModalId, value: slot },
      });
      const dialog = document.getElementById(
        reserveEmptyModalId
      ) as HTMLDialogElement;
      dialog?.showModal();
    };
  }

  function AcceptedViewCard({ slot }: { slot: AcceptedSlot }) {
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
                onClick={editAccepted(slot)}
              >
                <EditIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ProposedViewCard({ slot }: { slot: ProposedSlot }) {
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
                  onClick={viewProposed(slot)}
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

  function EmptyViewCard() {
    return <div className='w-32 h-28'></div>;
  }

  function AcceptedMoveCard({ slot }: { slot: AcceptedSlot }) {
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
            <div className='tooltip tooltip-left' data-tip='więcej'>
              <button
                className='btn btn-square btn-sm btn-outline'
                onClick={viewAccepted(slot)}
              >
                <InfoIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ProposedMoveCard({ slot }: { slot: ProposedSlot }) {
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
                  onClick={viewProposed(slot)}
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

  function EmptyMoveCard({ slot }: { slot: EmptySlot }) {
    return (
      <div className='card border border-base-content/8 shadow-md bg-base-300 w-32 h-28'>
        <div className='card-body p-2'>
          <div className='badge badge-soft badge-ghost badge-sm'>
            {slot.startTime}
          </div>
          <div className='mt-auto flex flex-row justify-between items-center'>
            <p>wolne</p>
            <div className='tooltip tooltip-left' data-tip='rezerwuj'>
              <button
                className='btn btn-square btn-sm btn-outline'
                onClick={reserveEmpty(slot)}
              >
                <InfoIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function getViewCard(slot: AnySlot) {
    switch (slot.type) {
      case 'accepted':
        return <AcceptedViewCard slot={slot} />;
      case 'proposed':
        return <ProposedViewCard slot={slot} />;
      case 'empty':
        return <EmptyViewCard />;
    }
  }

  function getMoveCard(slot: AnySlot) {
    switch (slot.type) {
      case 'accepted':
        return <AcceptedMoveCard slot={slot} />;
      case 'proposed':
        return <ProposedMoveCard slot={slot} />;
      case 'empty':
        return <EmptyMoveCard slot={slot} />;
    }
  }

  function getCard(slot: AnySlot, variant: ScheduleVariant) {
    switch (variant) {
      case ScheduleVariant.VIEW:
        return getViewCard(slot);
      case ScheduleVariant.MOVE:
        return getMoveCard(slot);
    }
  }

  return (
    <tr>
      <td>{getCard(slot, variant)}</td>
    </tr>
  );
}

interface HourCardProps {
  slot: AnySlot;
  variant: ScheduleVariant;
}

export default HourCard;
