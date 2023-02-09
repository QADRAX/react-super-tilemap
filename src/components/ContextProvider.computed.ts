import { useMemo } from 'react';
import { useIsChanging } from '../hooks/useIsChanging';
import { ContextComputedState, ContextState } from '../types/TilemapContext';
import { TilemapProps } from '../types/TilemapContextProvider';
import {
    getCenteredTilePositionByCameraPosition,
} from '../utils/positions';
import { getMapDimensions, getMapSize, getTileSize } from '../utils/sizes';

/**
 * Returns useful computed values from the tilemap state.
 *
 * @param state
 * @returns
 */
export function useComputedTilemapState(
    state: ContextState,
    props: TilemapProps
): ContextComputedState {
    const isResizing = useIsChanging(state.canvasSize, 500);
    const isZooming = useIsChanging(state.zoom, 500);

    const tileSize = useMemo(
        () => getTileSize(state.zoom, props.defaultTileSize),
        [state.zoom, props.defaultTileSize]
    );

    const mapDimensions = useMemo(() => getMapDimensions(props.tilmapSchema), [props.tilmapSchema]);

    const mapSize = useMemo(() => getMapSize(mapDimensions, tileSize), [mapDimensions, tileSize]);

    const cameraCenteredTilePosition = useMemo(() => {
        if (!state.cameraPosition || !state.canvasSize) {
            return undefined;
        }
        return getCenteredTilePositionByCameraPosition(
            state.cameraPosition,
            tileSize,
            state.canvasSize
        );
    }, [state.cameraPosition, tileSize, state.canvasSize]);

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
        isZoomInMotion: isCurrentZoomInMotion,
        isResizing,
        isZooming,
    };

    return computed;
}
