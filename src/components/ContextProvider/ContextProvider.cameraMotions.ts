import { useCallback, useEffect } from 'react';
import {
  TilemapActions,
  _setCameraMotionQueue,
  _setCurrentCameraMotion,
} from '../../Context/TilemapContext.actions';
import { CameraMotion } from '../../types/Motions';
import { ContextState } from '../../types/TilemapContext';
import { getDistance } from '../../utils';

export function useCameraMotions(
  dispatch: React.Dispatch<TilemapActions>,
  state: ContextState,
  onCameraMotionEnds?: () => void
) {
  const { currentCameraMotion, cameraMotionQueue, isCameraDragging, cameraPosition } = state;

  useEffect(() => {
    if (
      !isCameraDragging &&
      !currentCameraMotion &&
      cameraMotionQueue.length > 0 &&
      cameraPosition
    ) {
      // add next motion from the queue

      const nextMotionRequest = cameraMotionQueue[0];
      const maxDuration = nextMotionRequest.settings.maxDuration;
      const initialPosition = cameraPosition;
      const targetPosition = nextMotionRequest.targetPosition;
      const distance = getDistance(initialPosition, targetPosition);

      const speed =
        nextMotionRequest.settings.speed > 0 ? Math.abs(nextMotionRequest.settings.speed) : 1;
      const duration = (distance / speed) * 1000;

      let finalDuration = duration;
      if (maxDuration) {
        const maxDurationLongMs = maxDuration * 1000 * 1000;
        if (duration > maxDurationLongMs) {
          finalDuration = maxDurationLongMs;
        }
      }

      const startAt = window.performance.now();
      const endAt = startAt + finalDuration / 1000;

      const nextMotion: CameraMotion = {
        startAt,
        endAt,
        easing: nextMotionRequest.settings.easing,
        initialPosition,
        targetPosition,
      };
      dispatch(_setCurrentCameraMotion(nextMotion));

      const nextQueue = cameraMotionQueue.slice(1);
      dispatch(_setCameraMotionQueue(nextQueue));
    }
  }, [cameraPosition, currentCameraMotion, cameraMotionQueue, isCameraDragging, dispatch]);

  const onCameraMotionEnd = useCallback(() => {
    dispatch(_setCurrentCameraMotion(undefined));
    if (onCameraMotionEnds) {
      onCameraMotionEnds();
    }
  }, [dispatch, onCameraMotionEnds]);

  return onCameraMotionEnd;
}
