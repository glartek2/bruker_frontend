interface Slot {
  startTime: string;
  endTime: string;
}

interface AcceptedSlot extends Slot {
  readonly type: 'accepted';
  reservationId: number;
  subject: string;
  where: string;
}

function toAcceptedSlot(
  slot: AnySlot,
  reservationId: number,
  where: string,
  subject: string
): AcceptedSlot {
  return {
    type: 'accepted',
    startTime: slot.startTime,
    endTime: slot.endTime,
    reservationId,
    where,
    subject,
  };
}

interface ProposedSlot extends Slot {
  readonly type: 'proposed';
  reservationId: number;
  where: string;
  subject: string;
  byUser: string;
}

function toProposedSlot(
  slot: AnySlot,
  reservationId: number,
  where: string,
  subject: string,
  byUser: string
): ProposedSlot {
  return {
    type: 'proposed',
    startTime: slot.startTime,
    endTime: slot.endTime,
    reservationId,
    where,
    subject,
    byUser,
  };
}

interface EmptySlot extends Slot {
  readonly type: 'empty';
}

type AnySlot = AcceptedSlot | ProposedSlot | EmptySlot;

export type { Slot, AcceptedSlot, ProposedSlot, EmptySlot, AnySlot };
export { toAcceptedSlot, toProposedSlot };
