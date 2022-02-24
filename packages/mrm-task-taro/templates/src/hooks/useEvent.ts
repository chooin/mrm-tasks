import { Events } from '@tarojs/taro';
import { useLoad, useUnload } from '@/hooks';

interface EventResult {
  /**
   * 事件触发与事件监听器功能（页面创建时创建，页面销毁时销毁）
   */
  emit: (...params: any[]) => void;
}

type EventCallback = (...args: any[]) => void;

const events = new Events();

/**
 * 事件订阅
 * @param {string} eventType 事件名称
 * @param fn
 * @public
 */
export function useEvent(eventType: string, fn?: EventCallback): EventResult {
  useLoad(() => {
    if (typeof fn === 'function') {
      events.on(eventType, fn);
    }
  });

  useUnload(() => {
    if (typeof fn === 'function') {
      events.off(eventType, fn);
    }
  });

  return {
    emit: (...params: any[]) => events.trigger(eventType, ...params),
  };
}
