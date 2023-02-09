import { useCallback, useEffect } from 'react';
import {
  TilemapActions,
  _setCameraMotionQueue,
  _setCurrentCameraMotion,
} from '../Context/TilemapContext.actions';
import { Position } from '../types/Position';
import { ContextComputedState, ContextState } from '../types/TilemapContext';
import { createMotion } from '../utils/createMotion';
import { getCameraPositionByTilePosition, getCenteredCameraPosition, getDistance } from '../utils/positions';

/**
 * Dispatch current camera motion from the camera motion queue.
 * 
 * @private
 * 
 * @param dispatch context dispatch
 * @param state context state
 * @param computed computed values
 * @param onCameraMotionEnds callback to advise the consumer that a camera motion ends
 * @returns internal callback to be called when the camera motion ends
 */
export function useCameraMotions(
  dispatch: React.Dispatch<TilemapActions>,
  state: ContextState,
  computed: ContextComputedState,
  onCameraMotionEnds?: () => void
) {
  const {
    currentCameraMotion,
    cameraMotionQueue,
    isCameraDragging,
    cameraPosition,
    currentZoomMotion,
    canvasSize,
  } = state;

  const {
    tileSize,
    mapSize,
  } = computed;

  useEffect(() => {
    if (
      !isCameraDragging &&
      !currentCameraMotion &&
      cameraMotionQueue.length > 0 &&
      cameraPosition &&
      !currentZoomMotion &&
      canvasSize
    ) {
      // add next motion from the queue

      const nextMotionRequest = cameraMotionQueue[0];

      const targetTilePosition = nextMotionRequest.target;
      let targetPosition: Position;
      if (targetTilePosition == 'center') {
        targetPosition = getCenteredCameraPosition(
          canvasSize,
          mapSize,
        )
      } else {
        targetPosition = getCameraPositionByTilePosition(
          targetTilePosition,
          tileSize,
          canvasSize
        );
      }
      const distance = getDistance(cameraPosition, targetPosition);

      const nextMotion = createMotion(
        cameraPosition,
        targetPosition,
        nextMotionRequest.settings.speed,
        distance,
        nextMotionRequest.settings.maxDuration,
        nextMotionRequest.settings.easing
      );
      dispatch(_setCurrentCameraMotion(nextMotion));

      const nextQueue = cameraMotionQueue.slice(1);
      dispatch(_setCameraMotionQueue(nextQueue));
    }
  }, [
    cameraPosition,
    currentCameraMotion,
    cameraMotionQueue,
    isCameraDragging,
    dispatch,
    currentZoomMotion,
    canvasSize,
    tileSize,
    mapSize,
  ]);

  const endCameraMotion = useCallback(() => {
    dispatch(_setCurrentCameraMotion(undefined));
    if (onCameraMotionEnds) {
      onCameraMotionEnds();
    }
  }, [dispatch, onCameraMotionEnds]);

  return endCameraMotion;
}
