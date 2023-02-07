import React, { useCallback } from 'react';
import { UNSIZED_CANVAS_ERROR } from '../../constants';
import {
  TilemapActions,
  _setCameraMotionQueue,
  _setCameraPosition,
  _setCurrentZoom,
} from '../../Context/TilemapContext.actions';
import { CameraMotionRequest, MotionSettings } from '../../types/Motions';
import { Position } from '../../types/Position';
import { ContextActions, ContextComputedState, ContextState } from '../../types/TilemapContext';
import { TilePosition } from '../../types/TilePosition';
import { getCameraPositionByTilePosition, getCenteredCameraPosition } from '../../utils';

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
    (motionRequest: CameraMotionRequest) => {
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
      const motionRequest: CameraMotionRequest = {
        settings,
        targetPosition: getCameraPositionByTilePosition(
          tilePosition,
          computed.tileSize,
          state.canvasSize
        ),
      };
      addCameraMotion(motionRequest);
    },
    [addCameraMotion, computed.tileSize, state.canvasSize]
  );

  const addCameraMotionCentered = useCallback(
    (settings: MotionSettings) => {
      if (!state.canvasSize) {
        throw new Error(UNSIZED_CANVAS_ERROR);
      }
      const motionRequest: CameraMotionRequest = {
        settings,
        targetPosition: getCenteredCameraPosition(state.canvasSize, computed.mapSize),
      };
      addCameraMotion(motionRequest);
    },
    [addCameraMotion, computed.mapSize, state.canvasSize]
  );

  const actions: ContextActions = {
    setCameraPosition,
    setCurrentZoom,
    centerCameraOnTilePosition,
    centerCamera,
    addCameraMotion,
    addCameraMotionCenteredOnTilePosition,
    addCameraMotionCentered,
  };

  return actions;
}
