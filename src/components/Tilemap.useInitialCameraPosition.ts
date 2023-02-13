import { useEffect } from "react";
import { DEFAULT_CAMERA_POSITION } from "../constants";
import { Position } from "../types/Position";
import { Size } from "../types/Size";
import { TilemapSettings } from "../types/Tilemap";
import { ContextActions } from "../types/TilemapContext";

/**
 * Sets the initial camera position when the canvas size will be defined.
 * 
 * @param initialCameraPosition initial camera position
 * @param canvasSize canvas size
 * @param cameraPosition camera position
 * @param actions 
 */
export function useInitialCameraPosition(
    initialCameraPosition: TilemapSettings['initialCameraPosition'],
    canvasSize: Size | undefined,
    cameraPosition: Position | undefined,
    setCameraPosition: ContextActions['setCameraPosition'],
): void {
    useEffect(() => {
        if (canvasSize && !cameraPosition) {
            setCameraPosition(initialCameraPosition ?? DEFAULT_CAMERA_POSITION);
        }
    }, [setCameraPosition, canvasSize, cameraPosition, initialCameraPosition]);
}