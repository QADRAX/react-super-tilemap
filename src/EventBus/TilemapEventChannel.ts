import { Position } from "../types/Position";
import { eventbus } from "./EventBus"

export type TilemapControlsEvents = {
    onMouseDown: (mousePosition: Position) => void;
    onMouseMove: (mousePosition: Position) => void;
    onMouseUp: () => void;
    onWheel: (deltaY: number) => void;
    onClick: (mousePosition: Position) => void;
    onContextMenu: (mousePosition: Position) => void;
    onDoubleClick: (mousePosition: Position) => void;
};

export const tilemapEventChannel = eventbus<TilemapControlsEvents>()