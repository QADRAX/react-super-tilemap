import { useCallback, useEffect, useState } from 'react';
import { useStartMotion } from '../../../hooks/useStartMotion';
import { CurrentMotion, MotionRequest, MotionSettings } from '../../../types/Motions';
import { createCurrentMotion } from '../../../utils/createCurrentMotion';
import { getDistance } from '../../../utils/positions';
import { Position } from '../../../types/Position';

export function useMotions(
  elementPosition: Position | undefined,
  setElementPosition: (position: Position | undefined) => void,
  motionSettings: MotionSettings,
  onMotionComplete?: () => void
) {
  const [currentElementMotion, setCurrentElementMotion] = useState<
    CurrentMotion<Position> | undefined
  >(undefined);
  const [elementMotionQueue, setElementMotionQueue] = useState<MotionRequest<Position>[]>([]);

  const addElementMotion = useCallback(
    (position: Position) => {
      const motionRequest: MotionRequest<Position> = {
        settings: motionSettings,
        target: position,
      };
      const nextMotionStack = [...elementMotionQueue, motionRequest];

      setElementMotionQueue(nextMotionStack);
    },
    [elementMotionQueue, setElementMotionQueue, motionSettings]
  );

  const sliceElementMotionQueue = useCallback(() => {
    const nextQueue = elementMotionQueue.slice(1);
    setElementMotionQueue(nextQueue);
  }, [elementMotionQueue, setElementMotionQueue]);

  const endElementMotion = useCallback(() => {
    setCurrentElementMotion(undefined);
    onMotionComplete?.();
  }, [setCurrentElementMotion, onMotionComplete]);

  useEffect(() => {
    if (!currentElementMotion && elementMotionQueue.length > 0 && elementPosition) {
      const nextMotionRequest = elementMotionQueue[0];

      const targetPosition = nextMotionRequest.target;
      const distance = getDistance(elementPosition, targetPosition);

      const nextMotion = createCurrentMotion(
        elementPosition,
        targetPosition,
        nextMotionRequest.settings.speed,
        distance,
        nextMotionRequest.settings.maxDuration,
        nextMotionRequest.settings.minDuration,
        nextMotionRequest.settings.easing
      );

      setCurrentElementMotion(nextMotion);

      sliceElementMotionQueue();
    }
  }, [
    elementPosition,
    currentElementMotion,
    elementMotionQueue,
    setCurrentElementMotion,
    sliceElementMotionQueue,
  ]);

  useStartMotion(
    currentElementMotion,
    (position) => setElementPosition(position!),
    endElementMotion
  );

  return {
    currentElementMotion,
    elementMotionQueue,
    addElementMotion,
  };
}
