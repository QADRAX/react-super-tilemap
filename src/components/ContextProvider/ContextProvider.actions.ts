import React, { useCallback } from 'react';
import { UNSIZED_CANVAS_ERROR } from '../../constants';
import {
  TilemapActions,
  _setCameraMotionQueue,
  _setCameraPosition,
  _setCurrentZoom,
  _setZoomMotionQueue,
} from '../../Context/TilemapContext.actions';
import { CameraMotionRequest, MotionSettings, ZoomMotionRequest } from '../../types/Motions';
import { Position } from '../../types/Position';
import { ContextActions, ContextComputedState, ContextState } from '../../types/TilemapContext';
import { TilePosition } from '../../types/TilePosition';
import { getCameraPositionByTilePosition, getCenteredCameraPosition } from '../../utils/positions';

/**
 * Returns the tilemap context actions.
 *
 * @param dispatch
 * @returns
 */
export function useTilemapContextActions(
  dispatch: React.Dispatch<TilemapActions>,
  computed: ContextComputedState,
  state: ContextState
): ContextActions {
  const setCameraPosition = useCallback(
    (position?: Position) => dispatch(_setCameraPosition(position)),
    [dispatch]
  );
  const setCurrentZoom = useCallback(
    (zoom: number) => {
      if (zoom < 0) {
        zoom = 0;
      }
      dispatch(_setCurrentZoom(zoom));
    },
    [dispatch]
  );

  const centerCameraOnTilePosition = useCallback(
    (tilePosition: TilePosition) => {
      if (!state.canvasSize) {
        throw new Error(UNSIZED_CANVAS_ERROR);
      }
      const cameraPosition = getCameraPositionByTilePosition(
        tilePosition,
        computed.tileSize,
        state.canvasSize
      );
      setCameraPosition(cameraPosition);
    },
    [setCameraPosition, state.canvasSize, computed.tileSize]
  );

  const centerCamera = useCallback(() => {
    if (!state.canvasSize) {
      throw new Error(UNSIZED_CANVAS_ERROR);
    }
    const centeredCameraPosition = getCenteredCameraPosition(state.canvasSize, computed.mapSize);
    setCameraPosition(centeredCameraPosition);
  }, [state.canvasSize, computed.mapSize, setCameraPosition]);

  const addCameraMotion = useCallback(
    (settings: MotionSettings, position: Position) => {
      const motionRequest: CameraMotionRequest = {
        settings,
        targetPosition: position,
      };
      const nextMotionStack = [...state.cameraMotionQueue, motionRequest];
      dispatch(_setCameraMotionQueue(nextMotionStack));
    },
    [state.cameraMotionQueue, dispatch]
  );

  const addCameraMotionCenteredOnTilePosition = useCallback(
    (settings: MotionSettings, tilePosition: TilePosition) => {
      if (!state.canvasSize) {
        throw new Error(UNSIZED_CANVAS_ERROR);
      }
      const position = getCameraPositionByTilePosition(
        tilePosition,
        computed.tileSize,
        state.canvasSize
      );
      addCameraMotion(settings, position);
    },
    [addCameraMotion, computed.tileSize, state.canvasSize]
  );

  const addCameraMotionCentered = useCallback(
    (settings: MotionSettings) => {
      if (!state.canvasSize) {
        throw new Error(UNSIZED_CANVAS_ERROR);
      }
      const position = getCenteredCameraPosition(state.canvasSize, computed.mapSize);
      addCameraMotion(settings, position);
    },
    [addCameraMotion, computed.mapSize, state.canvasSize]
  );

  const addZoomMotion = useCallback(
    (settings: MotionSettings, targetZoom: number) => {
      const motionRequest: ZoomMotionRequest = {
        settings,
        targetPosition: targetZoom,
      };
      const nextMotionQueue = [...state.zoomMotionQueue, motionRequest];
      dispatch(_setZoomMotionQueue(nextMotionQueue));
    },
    [state.zoomMotionQueue, dispatch]
  );

  const actions: ContextActions = {
    setCameraPosition,
    setCurrentZoom,
    centerCameraOnTilePosition,
    centerCamera,
    addCameraMotion,
    addCameraMotionCenteredOnTilePosition,
    addCameraMotionCentered,
    addZoomMotion,
  };

  return actions;
}
