import { useRef } from 'react';
import { useDidShow } from '@tarojs/taro';
import { useLoad } from '@/hooks';

export function useShow(fn: () => void): void {
  const isLoaded = useRef<boolean>(false);

  useLoad(() => {
    fn();
    isLoaded.current = true;
  });

  useDidShow(() => {
    if (isLoaded.current) {
      fn();
    }
  });
}
