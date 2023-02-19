import { useEffect } from 'react';
import { CurrentMotion, CurrentMotionPosition } from '../types/Motions';
import { startMotion } from '../utils/startMotion';

export function useStartMotion<T extends CurrentMotionPosition>(
  motion: CurrentMotion<T> | undefined,
  setPosition: (value: T | undefined) => void,
  onMotionEnd: () => void
) {
  useEffect(() => {
    let cancelAnimation: (() => void) | undefined;

    if (motion) {
      cancelAnimation = startMotion(motion, setPosition, onMotionEnd);
    }

    return () => {
      cancelAnimation?.();
    };
  }, [motion]); // eslint-disable-line react-hooks/exhaustive-deps
}
