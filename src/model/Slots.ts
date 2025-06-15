interface Slot {
  startTime: Date;
  endTime: Date;
}

interface AcceptedSlot extends Slot {
  readonly type: 'accepted';
  reservationId: number;
  subject: string;
  where: string;
  hasProposition: boolean;
}

function toAcceptedSlot(
  slot: AnySlot,
  reservationId: number,
  where: string,
  subject: string,
  hasProposition: boolean
): AcceptedSlot {
  return {
    type: 'accepted',
    startTime: slot.startTime,
    endTime: slot.endTime,
    reservationId,
    where,
    subject,
    hasProposition,
  };
}

interface ProposedSlot extends Slot {
  readonly type: 'proposed';
  reservationId: number;
  where: string;
  subject: string;
  accepted: AcceptedSlot;
  byUser: string;
}

function toProposedSlot(
  slot: AnySlot,
  reservationId: number,
  where: string,
  subject: string,
  accepted: AcceptedSlot,
  byUser: string
): ProposedSlot {
  return {
    type: 'proposed',
    startTime: slot.startTime,
    endTime: slot.endTime,
    reservationId,
    where,
    subject,
    accepted,
    byUser,
  };
}

interface EmptySlot extends Slot {
  readonly type: 'empty';
}

type AnySlot = AcceptedSlot | ProposedSlot | EmptySlot;

export type { Slot, AcceptedSlot, ProposedSlot, EmptySlot, AnySlot };
export { toAcceptedSlot, toProposedSlot };
