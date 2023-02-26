import { useCallback, useEffect, useState } from 'react';
import { CurrentMotion, MotionRequest, MotionSettings } from '../../../types/Motions';
import { createCurrentMotion } from '../../../utils/createCurrentMotion';

export function useZoomMotions(props: {
  isCameraDragging: boolean;
  currentZoomMotion: CurrentMotion<number> | undefined;
  setCurrentZoomMotion: (motion: CurrentMotion<number> | undefined) => void;
  zoom: number;
}) {
  const [zoomMotionQueue, setZoomMotionQueue] = useState<MotionRequest<number>[]>([]);

  const { zoom, setCurrentZoomMotion, currentZoomMotion } = props;

  const addZoomMotion = useCallback(
    (settings: MotionSettings, targetZoom: number) => {
      const motionRequest: MotionRequest<number> = {
        settings,
        target: targetZoom,
      };
      const nextMotionQueue = [...zoomMotionQueue, motionRequest];
      setZoomMotionQueue(nextMotionQueue);
    },
    [zoomMotionQueue, setZoomMotionQueue]
  );

  const sliceZoomMotionQueue = useCallback(() => {
    const nextMotionQueue = zoomMotionQueue.slice(1);
    setZoomMotionQueue(nextMotionQueue);
  }, [zoomMotionQueue, setZoomMotionQueue]);

  const endZoomMotion = useCallback(() => {
    setCurrentZoomMotion(undefined);
  }, [setCurrentZoomMotion]);

  useEffect(() => {
    if (!currentZoomMotion && zoomMotionQueue.length > 0) {
      // add next motion from the queue

      const nextMotionRequest = zoomMotionQueue[0];

      const targetZoom = nextMotionRequest.target;
      const distance = Math.abs(zoom - targetZoom);

      const nextMotion = createCurrentMotion(
        zoom,
        targetZoom,
        nextMotionRequest.settings.speed,
        distance,
        nextMotionRequest.settings.maxDuration,
        nextMotionRequest.settings.minDuration,
        nextMotionRequest.settings.easing
      );
      setCurrentZoomMotion(nextMotion);
      sliceZoomMotionQueue();
    }
  }, [currentZoomMotion, setCurrentZoomMotion, zoomMotionQueue, zoom, sliceZoomMotionQueue]);

  return {
    endZoomMotion,
    addZoomMotion,
    zoomMotionQueue,
  };
}
