import React, { useCallback } from 'react';
import { UNSIZED_CANVAS_ERROR } from '../../constants';
import {
  TilemapActions,
  _setCameraPosition,
  _setCanvasSize,
  _setCurrentZoom,
} from '../../Context/TilemapContext.actions';
import { Position } from '../../types/Position';
import { Size } from '../../types/Size';
import { ContextActions, ContextComputedState, ContextState } from '../../types/TilemapContext';
import { TilePosition } from '../../types/TilePosition';
import { getCameraPositionByTilePosition, getCenteredCameraPosition } from '../../utils/positions';
import { isPosition, isTilePosition } from '../../utils/typeGuards';

/**
 * Returns the tilemap context actions.
 * 
 * @private
 *
 * @param dispatch context dispatch
 * @param computed computed values
 * @param state context state
 * @returns context actions
 */
export function useTilemapActions(
  dispatch: React.Dispatch<TilemapActions>,
  computed: ContextComputedState,
  state: ContextState
): ContextActions {
  const setCameraPosition = useCallback(
    (position?: Position | TilePosition | 'center') => {
      if (!state.canvasSize) {
        throw new Error(UNSIZED_CANVAS_ERROR);
      }
      let result: Position | undefined = undefined;
      if (position == 'center') {
        result = getCenteredCameraPosition(state.canvasSize, computed.mapSize);
      } else if (isTilePosition(position)) { 
        result = getCameraPositionByTilePosition(
          position,
          computed.tileSize,
          state.canvasSize
        );
      } else if (isPosition(position)) {
        result = position;
      } else {
        result = undefined;
      }

      if (result) {
        dispatch(_setCameraPosition(result));
      }
    },
    [dispatch, computed.tileSize, computed.mapSize, state.canvasSize]
  );
  const setZoom = useCallback(
    (zoom: number) => {
      if (zoom < 0) {
        zoom = 0;
      }
      dispatch(_setCurrentZoom(zoom));
    },
    [dispatch]
  );

  const setCanvasSize = useCallback(
    (size?: Size) => {
      dispatch(_setCanvasSize(size));
    },
    [dispatch]
  );


  const actions: ContextActions = {
    setCameraPosition,
    setZoom,
    setCanvasSize,
  };

  return actions;
}
