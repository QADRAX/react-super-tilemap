import { useMemo } from 'react';
import { useIsChanging } from '../../hooks/useIsChanging';
import { ContextComputedState, ContextState } from './TilemapContext/TilemapContext.types';
import { TilemapProps } from '../../types/Tilemap';
import {
    floorTilePosition,
    getCameraPositionByTilePosition,
} from '../../utils/positions';
import { getMapDimensions, getMapSize, getTileSize } from '../../utils/sizes';

/**
 * Returns useful computed values from the tilemap state.
 *
 * @private
 * 
 * @param state tilemap state
 * @returns computed values
 */
export function useComputedValues(
    state: ContextState,
    props: TilemapProps
): ContextComputedState {
    const isResizing = useIsChanging(state.canvasSize, 500);
    const isZooming = useIsChanging(state.zoom, 500);

    const tileSize = useMemo(
        () => getTileSize(state.zoom, props.defaultTileSize),
        [state.zoom, props.defaultTileSize]
    );

    const mapDimensions = useMemo(() => getMapDimensions(props.tilmapScheme), [props.tilmapScheme]);

    const mapSize = useMemo(() => getMapSize(mapDimensions, tileSize), [mapDimensions, tileSize]);

    const cameraTilePosition = useMemo(() => {
        if (!state.cameraPosition || !state.canvasSize) {
            return undefined;
        }
        return floorTilePosition(state.cameraPosition);
    }, [state.cameraPosition, tileSize, state.canvasSize]);

    const cameraAbsolutePosition = useMemo(() => {
        if (!state.cameraPosition || !state.canvasSize) {
            return undefined;
        }
        return getCameraPositionByTilePosition(
            state.cameraPosition,
            tileSize,
            state.canvasSize
        );
    }, [state.cameraPosition, tileSize, state.canvasSize]);

    const computed: ContextComputedState = {
        tileSize,
        mapDimensions,
        mapSize,
        cameraTilePosition,
        isResizing,
        isZooming,
        cameraAbsolutePosition,
    };

    return computed;
}
