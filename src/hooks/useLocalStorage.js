import { useEffect, useState } from 'react';

// Generic, reusable custom hook: reads/writes any JSON-serializable value
// to localStorage under `key`, keeping component state and storage in sync.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage unavailable (private browsing, quota exceeded) — ignore
    }
  }, [key, value]);

  return [value, setValue];
}
