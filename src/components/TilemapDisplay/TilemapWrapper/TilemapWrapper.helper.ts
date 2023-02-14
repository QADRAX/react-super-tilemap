import { Position } from "../../../types/Position";
import { ControlEvent } from "./TilemapWrapper.types";

export function getDataFromEvent(event: ControlEvent): {
    mousePosition: Position;
    deltaY?: number;
} {
    const bounds = event.currentTarget.getBoundingClientRect();

    const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
    const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;

    const x = clientX - bounds.left;
    const y = clientY - bounds.top;

    const position: Position = { x, y };

    if ('deltaY' in event) {
        return { mousePosition: position, deltaY: event.deltaY };
    }

    return { mousePosition: position };
}