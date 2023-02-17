import React, { useCallback } from 'react';
import { UNSIZED_CANVAS_ERROR } from '../../constants';
import {
  TilemapActions,
  _setCameraPosition,
  _setCanvasSize,
  _setCurrentZoom,
  _setElementMap,
} from './TilemapContext/TilemapContext.actions';
import { Size } from '../../types/Size';
import { ContextActions, ContextState } from './TilemapContext/TilemapContext.types';
import { TilemapElement } from '../../types/TilemapElement';
import { TilePosition } from '../../types/TilePosition';
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
  state: ContextState
): ContextActions {
  const setCameraPosition = useCallback(
    (position?: TilePosition) => {
      if (!state.canvasSize) {
        throw new Error(UNSIZED_CANVAS_ERROR);
      }
        dispatch(_setCameraPosition(position));
    },
    [dispatch, state.canvasSize]
  );
  const setZoom = useCallback(
    (zoom: number) => {
      if (zoom < 0) {
        zoom = Math.abs(zoom);
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

  const setTilemapElement = useCallback(
    (elementKey: string, element?: TilemapElement) => {
      const nextMap = Object.assign({}, state.elementMap);
      if(element) {
        nextMap.set(elementKey, element);
      } else {
        nextMap.delete(elementKey);
      }
      dispatch(_setElementMap(nextMap));
    },
    []
  );

  const actions: ContextActions = {
    setCameraPosition,
    setZoom,
    setCanvasSize,
    setTilemapElement,
  };

  return actions;
}
