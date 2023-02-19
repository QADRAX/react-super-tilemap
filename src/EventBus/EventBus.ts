import { EventBusChannel, EventMap } from './EventBus.types';

export interface EventBusConfig {
  onError: (...params: any[]) => void;
}

export type Bus<E> = Record<keyof E, E[keyof E][]>;

export function createEventBusChannel<E extends EventMap>(
  config?: EventBusConfig
): EventBusChannel<E> {
  const bus: Partial<Bus<E>> = {};

  const on: EventBusChannel<E>['on'] = (key, handler) => {
    if (bus[key] === undefined) {
      bus[key] = [];
    }
    bus[key]?.push(handler);

    return () => {
      off(key, handler);
    };
  };

  const off: EventBusChannel<E>['off'] = (key, handler) => {
    const index = bus[key]?.indexOf(handler) ?? -1;
    bus[key]?.splice(index >>> 0, 1);
  };

  const emit: EventBusChannel<E>['emit'] = (key, payload) => {
    bus[key]?.forEach((fn) => {
      try {
        fn(payload);
      } catch (e) {
        config?.onError(e);
      }
    });
  };

  return { on, off, emit };
}
