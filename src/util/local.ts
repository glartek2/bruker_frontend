import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function usePersistent<T>(
  storageKey: string,
  initialState: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(storageKey);
      console.log(item);
      return item !== null ? (JSON.parse(item) as T) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(storedValue));
    } catch {
      /* empty */
    }
  }, [storageKey, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export { usePersistent };
