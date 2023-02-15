import { Position } from "../../../../types/Position";

export type DragAndZoomHandlers = {
    handleMouseDown: (position: Position) => void;
    handleMouseMove: (position: Position) => void;
    handleMouseUp: () => void;
    handleWheel: (delta: number) => void;
    handleClick: (position: Position) => void;
    handleDoubleClick: (position: Position) => void;
    handleContextMenu: (position: Position) => void;
};

export type CameraEventListenerProps = {
    handlers: Partial<DragAndZoomHandlers>;
};