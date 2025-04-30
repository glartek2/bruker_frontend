interface Booking {
  subject: string;
  teacher: string;
}

type MaybeBooking = Booking | null;

interface SlotsRow {
  time: string;
  cols: MaybeBooking[];
}

interface SlotsCol {
  day: string;
  rows: MaybeBooking[];
}

export type { MaybeBooking, SlotsRow, SlotsCol };
