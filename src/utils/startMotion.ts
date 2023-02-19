import { EasingType } from '../types/EasingType';
import { CurrentMotion, CurrentMotionPosition } from '../types/Motions';
import { TilePosition } from '../types/TilePosition';
import { getEasingFunction } from './easings';
import { isTilePosition } from './typeGuards';

/**
 * Starts a motion from an initial position to a target position with the given motion settings.
 *
 * The motion is updated each frame and the onPositionChange callback is called with the new position.
 * When the motion ends, the onMotionEnd callback is called.
 *
 * The returned function can be called to stop the motion.
 *
 * @param initialPosition initial position of the motion
 * @param targetPosition target position of the motion
 * @param motionSettings motion settings
 * @param onPositionChange callback to be called when the position changes each frame
 * @param onMotionEnd callback to be called when the motion ends
 * @returns a function to stop the motion
 */
export function startMotion<T extends CurrentMotionPosition>(
  CurrentMotion: CurrentMotion<T>,
  onPositionChange: (position: T) => void,
  onMotionEnd: () => void
): () => void {
  let animationFrameId: number | undefined;

  const motionLoop = (timestamp: number) => {
    const { startAt, endAt, initialPosition, targetPosition, easing } = CurrentMotion;
    const duration = timestamp - startAt;
    const progress = duration / (endAt - startAt);
    if (progress < 1) {
      const nextPosition = getNextPosition(progress, easing, initialPosition, targetPosition);
      onPositionChange(nextPosition);
    } else {
      onPositionChange(targetPosition);
      onMotionEnd();
    }
    animationFrameId = window.requestAnimationFrame(motionLoop);
  };

  animationFrameId = window.requestAnimationFrame(motionLoop);

  return () => {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
  };
}

function getNextPosition1D(
  progress: number,
  easingType: EasingType | undefined,
  initialPosition: number,
  targetPoisition: number
): number {
  const easing = getEasingFunction(easingType);
  const easingProgress = easing(progress);
  let result = initialPosition + (targetPoisition - initialPosition) * easingProgress;
  if (isNaN(result)) {
    result = initialPosition;
  }
  return result;
}

function getNextPosition2D(
  progress: number,
  easingType: EasingType | undefined,
  initialPosition: TilePosition,
  targetPoisition: TilePosition
): TilePosition {
  const col = getNextPosition1D(progress, easingType, initialPosition.col, targetPoisition.col);
  const row = getNextPosition1D(progress, easingType, initialPosition.row, targetPoisition.row);
  return { col, row };
}

function getNextPosition<T extends CurrentMotionPosition>(
  progress: number,
  easingType: EasingType | undefined,
  initialPosition: T,
  targetPoisition: T
): T {
  if (typeof initialPosition === 'number' && typeof targetPoisition === 'number') {
    return getNextPosition1D(progress, easingType, initialPosition, targetPoisition) as T;
  } else if (isTilePosition(initialPosition) && isTilePosition(targetPoisition)) {
    return getNextPosition2D(progress, easingType, initialPosition, targetPoisition) as T;
  } else {
    throw new Error('Initial and target positions must be of the same type');
  }
}
