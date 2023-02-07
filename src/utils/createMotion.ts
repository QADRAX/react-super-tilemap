import { CurrentMotion, MotionPosition, MotionRequest } from "../types/Motions";

export function createMotion<T extends MotionPosition>(
    request: MotionRequest<T>,
    position: T,
    distance: number,
): CurrentMotion<T> {
    const maxDuration = request.settings.maxDuration;
    const initialPosition = position;
    const targetPosition = request.targetPosition;

    const speed =
      request.settings.speed > 0 ? Math.abs(request.settings.speed) : 1;
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

    const result: CurrentMotion<T> = {
      startAt,
      endAt,
      easing: request.settings.easing,
      initialPosition,
      targetPosition,
    };

    return result;
}