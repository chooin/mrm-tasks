import { useEffect } from 'react';

export function useUnload(fn: () => void): void {
  useEffect(() => {
    return () => {
      fn();
    };
  }, []);
}
