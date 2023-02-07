import { useCallback, useEffect } from 'react';
import {
  TilemapActions,
  _setCameraMotionQueue,
  _setCurrentZoomMotion,
  _setZoomMotionQueue,
} from '../../Context/TilemapContext.actions';
import { ContextState } from '../../types/TilemapContext';
import { createMotion } from '../../utils/createMotion';

export function useZoomMotions(
  dispatch: React.Dispatch<TilemapActions>,
  state: ContextState,
  onZoomMotionEnds?: () => void
) {
  const { currentZoomMotion, zoomMotionQueue, zoom: currentZoom, currentCameraMotion } = state;

  useEffect(() => {
    if (
      !currentZoomMotion &&
      zoomMotionQueue.length > 0 &&
      !currentCameraMotion
    ) {
      // add next motion from the queue
      console.log('klklkl', currentZoomMotion)

      const nextMotionRequest = zoomMotionQueue[0];

      const targetZoom = nextMotionRequest.targetPosition;
      const distance = Math.abs(currentZoom - targetZoom);

      const nextMotion = createMotion(nextMotionRequest, currentZoom, distance);
      dispatch(_setCurrentZoomMotion(nextMotion));

      const nextQueue = zoomMotionQueue.slice(1);
      dispatch(_setZoomMotionQueue(nextQueue));
    }
  }, [currentZoom, currentZoomMotion, zoomMotionQueue, dispatch, currentCameraMotion]);

  const endZoomMotion = useCallback(() => {
    dispatch(_setCurrentZoomMotion(undefined));
    if (onZoomMotionEnds) {
      onZoomMotionEnds();
    }
  }, [dispatch, onZoomMotionEnds]);

  return endZoomMotion;
}
