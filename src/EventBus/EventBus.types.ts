export type EventKey = string | symbol;
export type EventHandler<T = any> = (payload: T) => void;
export type EventMap = Record<EventKey, EventHandler>;

export interface EventBusChannel<T extends EventMap> {
  on<Key extends keyof T>(key: Key, handler: T[Key]): () => void;
  off<Key extends keyof T>(key: Key, handler: T[Key]): void;
  emit<Key extends keyof T>(key: Key, ...payload: Parameters<T[Key]>): void;
}