import { useEffect } from "react";
import { DEFAULT_CAMERA_POSITION } from "../../../constants";
import { useTilemapContext } from "../../../hooks/useTilemapContext";
import { TilePosition } from "../../../types/TilePosition";

export function useInitialCameraPosition(
    initialCameraPosition?: TilePosition | 'center',
) {
    const { state, actions } = useTilemapContext();

    const {
        cameraPosition,
        canvasSize,
    } = state;

    const {
        setCameraPosition,
    } = actions;

    useEffect(() => {
        if (canvasSize && !cameraPosition) {
            setCameraPosition(initialCameraPosition ?? DEFAULT_CAMERA_POSITION);
        }
    }, [setCameraPosition, canvasSize, cameraPosition, initialCameraPosition]);
}