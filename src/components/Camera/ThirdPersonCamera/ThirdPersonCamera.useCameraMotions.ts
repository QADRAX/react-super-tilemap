import { useCallback, useEffect, useState } from 'react';
import { useTilemapContext } from '../../Tilemap/TilemapContext/useTilemapContext';
import { CurrentMotion, MotionRequest, MotionSettings } from '../../../types/Motions';
import { createCurrentMotion } from '../../../utils/createCurrentMotion';
import { getDistance } from '../../../utils/positions';
import { Position } from '../../../types/Position';

export function useCameraMotions(props: {
  isCameraDragging: boolean;
  currentCameraMotion: CurrentMotion<Position> | undefined;
  setCurrentCameraMotion: (motion: CurrentMotion<Position> | undefined) => void;
  cameraPosition: Position | undefined;
}) {
  const { computed } = useTilemapContext();

  const { isCameraDragging, cameraPosition, setCurrentCameraMotion, currentCameraMotion } = props;

  const { mapDimensions } = computed;

  const [cameraMotionQueue, setCameraMotionQueue] = useState<
    MotionRequest<Position | 'center'>[]
  >([]);

  const addCameraMotion = useCallback(
    (settings: MotionSettings, position: Position | 'center') => {
      const motionRequest: MotionRequest<Position | 'center'> = {
        settings,
        target: position,
      };
      const nextMotionStack = [...cameraMotionQueue, motionRequest];
      setCameraMotionQueue(nextMotionStack);
    },
    [cameraMotionQueue, setCameraMotionQueue]
  );

  const sliceCameraMotionQueue = useCallback(() => {
    const nextQueue = cameraMotionQueue.slice(1);
    setCameraMotionQueue(nextQueue);
  }, [cameraMotionQueue, setCameraMotionQueue]);

  const endCameraMotion = useCallback(() => {
    setCurrentCameraMotion(undefined);
  }, [setCurrentCameraMotion]);

  useEffect(() => {
    if (
      !isCameraDragging &&
      !currentCameraMotion &&
      cameraMotionQueue.length > 0 &&
      cameraPosition
    ) {
      // add next motion from the queue

      const nextMotionRequest = cameraMotionQueue[0];

      let targetTilePosition = nextMotionRequest.target;
      if (targetTilePosition == 'center') {
        targetTilePosition = {
          y: Math.floor(mapDimensions.cols / 2),
          x: Math.floor(mapDimensions.rows / 2),
        };
      }
      const distance = getDistance(cameraPosition, targetTilePosition);

      const nextMotion = createCurrentMotion(
        cameraPosition,
        targetTilePosition,
        nextMotionRequest.settings.speed,
        distance,
        nextMotionRequest.settings.maxDuration,
        nextMotionRequest.settings.minDuration,
        nextMotionRequest.settings.easing
      );

      setCurrentCameraMotion(nextMotion);

      sliceCameraMotionQueue();
    }
  }, [
    cameraPosition,
    currentCameraMotion,
    cameraMotionQueue,
    isCameraDragging,
    setCurrentCameraMotion,
    sliceCameraMotionQueue,
    mapDimensions,
  ]);

  return {
    addCameraMotion,
    endCameraMotion,
    cameraMotionQueue,
  };
}
