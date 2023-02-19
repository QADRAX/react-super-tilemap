import { useCallback, useEffect, useState } from 'react';
import { useTilemapContext } from '../../Tilemap/TilemapContext/useTilemapContext';
import { CameraMotionRequest, CurrentCameraMotion, MotionSettings } from '../../../types/Motions';
import { TilePosition } from '../../../types/TilePosition';
import { createCurrentMotion } from '../../../utils/createCurrentMotion';
import { getDistance } from '../../../utils/positions';

export function useCameraMotions(props: {
  isCameraDragging: boolean;
  currentCameraMotion: CurrentCameraMotion | undefined;
  setCurrentCameraMotion: (motion: CurrentCameraMotion | undefined) => void;
  cameraPosition: TilePosition | undefined;
}) {
  const { computed } = useTilemapContext();

  const { isCameraDragging, cameraPosition, setCurrentCameraMotion, currentCameraMotion } = props;

  const { mapDimensions } = computed;

  const [cameraMotionQueue, setCameraMotionQueue] = useState<CameraMotionRequest[]>([]);

  const addCameraMotion = useCallback(
    (settings: MotionSettings, position: TilePosition | 'center') => {
      const motionRequest: CameraMotionRequest = {
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
          col: Math.floor(mapDimensions.cols / 2),
          row: Math.floor(mapDimensions.rows / 2),
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
