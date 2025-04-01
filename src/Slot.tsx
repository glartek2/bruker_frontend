interface Booking {
  subject: string;
  teacher: string;
}

type MaybeBooking = Booking | null;

interface Slot {
  time: string;
  cols: MaybeBooking[];
}

export type { MaybeBooking, Slot };
