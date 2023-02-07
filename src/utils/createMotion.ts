import { EasingType } from "../types/EasingType";
import { CurrentMotion, CurrentMotionPosition } from "../types/Motions";

export function createMotion<T extends CurrentMotionPosition>(
    initialPosition: T,
    targetPosition: T,
    speed: number,
    distance: number,
    maxDuration: number | undefined,
    easing: EasingType | undefined,
): CurrentMotion<T> {
    const finalSpeed = speed > 0 ? Math.abs(speed) : 1;
    const duration = (distance / finalSpeed) * 1000;

    let finalDuration = duration;
    if (maxDuration) {
      const maxDurationLongMs = maxDuration * 1000 * 1000;
      if (duration > maxDurationLongMs) {
        finalDuration = maxDurationLongMs;
      }
    }

    const startAt = window.performance.now();

    const endAt = startAt + finalDuration / 1000;

    const result: CurrentMotion<T> = {
      startAt,
      endAt,
      easing,
      initialPosition,
      targetPosition,
    };

    return result;
}