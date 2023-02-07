import { useEffect, useMemo, useState } from "react";
import { ContextComputedState, ContextState } from "../../types/TilemapContext";
import { getCenteredTilePositionByCameraPosition, getMapDimensions, getMapSize, getTileSize } from "../../utils";

/**
 * Returns useful computed values from the tilemap state.
 * 
 * @param state 
 * @returns 
 */
export function useComputedTilemapState(state: ContextState): ContextComputedState {
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        let timeoutId: number | undefined;
        if (state.canvasSize) {
            setIsResizing(true);
            timeoutId = window.setTimeout(() => {
                setIsResizing(false);
            }, 500);
        }
        return () => {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        }
    }, [state.canvasSize]);

    const tileSize = useMemo(
        () => getTileSize(state.currentZoom, state.defaultTileSizePx),
        [state.currentZoom, state.defaultTileSizePx]
    );

    const mapDimensions = useMemo(
        () => getMapDimensions(state.spriteSchema),
        [state.spriteSchema]
    );

    const mapSize = useMemo(
        () => getMapSize(mapDimensions, tileSize),
        [mapDimensions, tileSize]
    );

    const cameraCenteredTilePosition = useMemo(
        () => {
            if (!state.cameraPosition || !state.canvasSize) {
                return undefined;
            }
            return getCenteredTilePositionByCameraPosition(
                state.cameraPosition,
                tileSize,
                state.canvasSize
            )
        },
        [state.cameraPosition, tileSize, state.canvasSize]
    );

    const isCameraInMotion = useMemo(
        () => state.currentCameraMotion !== undefined,
        [state.currentCameraMotion]
    );

    const isCurrentZoomInMotion = useMemo(
        () => state.currentZoomMotion !== undefined,
        [state.currentZoomMotion]
    );

    const computed: ContextComputedState = {
        tileSize,
        mapDimensions,
        mapSize,
        cameraCenteredTilePosition,
        isCameraInMotion,
        isCurrentZoomInMotion,
        isResizing,
    };

    return computed;
}