import { Position } from '../types/Position';
import { createEventBusChannel } from './EventBus';

export type TilemapEventChannel = {
  onMouseDown: (mousePosition: Position) => void;
  onMouseMove: (mousePosition: Position) => void;
  onMouseUp: () => void;
  onWheel: (deltaY: number) => void;
  onClick: (mousePosition: Position) => void;
  onContextMenu: (mousePosition: Position) => void;
  onDoubleClick: (mousePosition: Position) => void;
};

export const tilemapEventChannel = createEventBusChannel<TilemapEventChannel>();
