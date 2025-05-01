interface Slot {
  time: string;
  spans: number;
}

interface TakenSlot extends Slot {
  readonly type: 'taken';
  subject: string;
}

interface EmptySlot extends Slot {
  readonly type: 'empty';
  claimID: string;
}

type AnySlot = TakenSlot | EmptySlot;

interface DaySlots {
  day: string;
  rows: AnySlot[];
}

export type { DaySlots, Slot, TakenSlot, EmptySlot, AnySlot };
