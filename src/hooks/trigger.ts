import { useState } from 'react';

type Trigger = number;

function useTrigger(): [number, () => void] {
  const [serial, setSerial] = useState(1);

  function invalidate() {
    setSerial(serial + 1);
  }

  return [serial, invalidate];
}

export type { Trigger };
export { useTrigger };
