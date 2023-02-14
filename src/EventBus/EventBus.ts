export type EventKey = string | symbol
export type EventHandler<T = any> = (payload: T) => void
export type EventMap = Record<EventKey, EventHandler>
export type Bus<E> = Record<keyof E, E[keyof E][]>

export interface EventBusChannel<T extends EventMap> {
  on<Key extends keyof T>(key: Key, handler: T[Key]): () => void
  off<Key extends keyof T>(key: Key, handler: T[Key]): void
  emit<Key extends keyof T>(key: Key, ...payload: Parameters<T[Key]>): void
}

export interface EventBusConfig {
  onError: (...params: any[]) => void
}

export function createEventBusChannel<E extends EventMap>(
  config?: EventBusConfig
): EventBusChannel<E> {
  const bus: Partial<Bus<E>> = {}

  const on: EventBusChannel<E>['on'] = (key, handler) => {
    if (bus[key] === undefined) {
      bus[key] = []
    }
    bus[key]?.push(handler)

    return () => {
      off(key, handler)
    }
  }

  const off: EventBusChannel<E>['off'] = (key, handler) => {
    const index = bus[key]?.indexOf(handler) ?? -1
    bus[key]?.splice(index >>> 0, 1)
  }

  const emit: EventBusChannel<E>['emit'] = (key, payload) => {
    bus[key]?.forEach((fn) => {
      try {
        fn(payload)
      } catch (e) {
        config?.onError(e)
      }
    })
  }

  return { on, off, emit }
}