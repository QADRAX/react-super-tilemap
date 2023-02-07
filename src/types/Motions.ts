import { EasingType } from './EasingType';
import { Position } from './Position';

export type MotionSettings = {
  /**
   * The speed of the motion in pixels per second.
   */
  speed: number;
  /**
   * The easing function to use for the motion.
   *
   * Easing functions specify the rate of change of a parameter over time
   *
   * @default 'linear'
   *
   * @see https://easings.net/
   */
  easing?: EasingType;
  /**
   * The maximum duration of the motion in seconds.
   * If it is not provided, the motion will run until it reaches the target using the configured speed.
   * If it is provided, the speed will be calculated to reach the target in the given duration.
   */
  maxDuration?: number;
};

export type Position1D = number;
export type Position2D = Position;
export type MotionPosition = Position2D | Position1D;

export interface MotionRequest<T extends MotionPosition> {
  settings: MotionSettings;
  targetPosition: T;
}

export interface CameraMotionRequest extends MotionRequest<Position> {}

export interface ZoomMotionRequest extends MotionRequest<number> {}

export interface Motion<T extends MotionPosition> {
  startAt: number;
  endAt: number;
  easing?: EasingType;
  initialPosition: T;
  targetPosition: T;
}

export interface CameraMotion extends Motion<Position2D> {}

export interface ZoomMotion extends Motion<Position1D> {}
