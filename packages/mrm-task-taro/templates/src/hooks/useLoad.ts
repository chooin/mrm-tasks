import { useEffect } from 'react';

export function useLoad(fn: () => void) {
  useEffect(fn, []);
}
