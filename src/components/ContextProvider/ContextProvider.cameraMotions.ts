import { useCallback, useEffect } from 'react';
import {
  TilemapActions,
  _setCameraMotionQueue,
  _setCurrentCameraMotion,
} from '../../Context/TilemapContext.actions';
import { ContextState } from '../../types/TilemapContext';
import { createMotion } from '../../utils/createMotion';
import { getDistance } from '../../utils/positions';

export function useCameraMotions(
  dispatch: React.Dispatch<TilemapActions>,
  state: ContextState,
  onCameraMotionEnds?: () => void
) {
  const { currentCameraMotion, cameraMotionQueue, isCameraDragging, cameraPosition, currentZoomMotion } = state;

  useEffect(() => {
    if (
      !isCameraDragging &&
      !currentCameraMotion &&
      cameraMotionQueue.length > 0 &&
      cameraPosition &&
      !currentZoomMotion
    ) {
      // add next motion from the queue

      const nextMotionRequest = cameraMotionQueue[0];

      const targetPosition = nextMotionRequest.targetPosition;
      const distance = getDistance(cameraPosition, targetPosition);

      const nextMotion = createMotion(nextMotionRequest, cameraPosition, distance);
      dispatch(_setCurrentCameraMotion(nextMotion));

      const nextQueue = cameraMotionQueue.slice(1);
      dispatch(_setCameraMotionQueue(nextQueue));
    }
  }, [cameraPosition, currentCameraMotion, cameraMotionQueue, isCameraDragging, dispatch, currentZoomMotion]);

  const endCameraMotion = useCallback(() => {
    dispatch(_setCurrentCameraMotion(undefined));
    if (onCameraMotionEnds) {
      onCameraMotionEnds();
    }
  }, [dispatch, onCameraMotionEnds]);

  return endCameraMotion;
}
