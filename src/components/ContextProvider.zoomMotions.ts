import { useCallback, useEffect } from 'react';
import {
  TilemapActions,
  _setCameraMotionQueue,
  _setCurrentZoomMotion,
  _setZoomMotionQueue,
} from '../Context/TilemapContext.actions';
import { ContextState } from '../types/TilemapContext';
import { createMotion } from '../utils/createMotion';

export function useZoomMotions(
  dispatch: React.Dispatch<TilemapActions>,
  state: ContextState,
  onZoomMotionEnds?: () => void
) {
  const { currentZoomMotion, zoomMotionQueue, zoom, currentCameraMotion } = state;

  useEffect(() => {
    if (
      !currentZoomMotion &&
      zoomMotionQueue.length > 0 &&
      !currentCameraMotion
    ) {
      // add next motion from the queue

      const nextMotionRequest = zoomMotionQueue[0];

      const targetZoom = nextMotionRequest.target;
      const distance = Math.abs(zoom - targetZoom);

      const nextMotion = createMotion(
        zoom,
        targetZoom,
        nextMotionRequest.settings.speed,
        distance,
        nextMotionRequest.settings.maxDuration,
        nextMotionRequest.settings.easing
      );
      dispatch(_setCurrentZoomMotion(nextMotion));

      const nextQueue = zoomMotionQueue.slice(1);
      dispatch(_setZoomMotionQueue(nextQueue));
    }
  }, [
    currentZoomMotion, 
    zoomMotionQueue, 
    dispatch,
    zoom,
    currentCameraMotion,
  ]);

  const endZoomMotion = useCallback(() => {
    dispatch(_setCurrentZoomMotion(undefined));
    if (onZoomMotionEnds) {
      onZoomMotionEnds();
    }
  }, [dispatch, onZoomMotionEnds]);

  return endZoomMotion;
}
