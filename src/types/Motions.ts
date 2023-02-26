import { EasingType } from './EasingType';
import { TilePosition } from './TilePosition';

// MOTION SETTINGS

/**
 * Motion settings.
 *
 * @public
 */
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
   * If it is provided, the speed will be calculated to reach the target in the given max duration.
   */
  maxDuration?: number;
  /**
   * The minimum duration of the motion in seconds.
   *
   * @default 0
   */
  minDuration?: number;
};

// MOTION REQUESTS

export type MotionRequestTarget = TilePosition | 'center' | number;

/**
 * A motion request.
 *
 * @public
 */
export interface MotionRequest<T extends MotionRequestTarget> {
  /**
   * Settings of the motion.
   *
   * @example { speed: 100, easing: 'linear' }
   */
  settings: MotionSettings;
  /**
   * The target position after the motion.
   */
  target: T;
}

// MOTION QUEUE

export type CurrentMotionPosition = number | TilePosition;

/**
 * A motion that is being executed.
 *
 * @public
 */
export type CurrentMotion<T extends CurrentMotionPosition> = {
  /**
   * The time at which the motion started in long milliseconds.
   */
  startAt: number;
  /**
   * The time at which the motion will end in long milliseconds.
   */
  endAt: number;
  /**
   * The easing function to use for the motion.
   *
   * Easing functions specify the rate of change of a parameter over time
   *
   * @default 'linear'
   */
  easing?: EasingType;
  /**
   * The initial position of the camera before the motion.
   */
  initialPosition: T;
  /**
   * The target position of the camera after the motion.
   */
  targetPosition: T;
}

// RECENTER MOTION

/**
 * Types of camera motion targets.
 *
 * @public
 */
export type RecenterCameraMotionTarget = 'center' | TilePosition;

/**
 * Configuration for camera motions that are being executed after a canvas resize or zoom change.
 *
 * @public
 */
export type RecenterCameraMotion = {
  /**
   * Settings of the motion.
   */
  settings: MotionSettings;
  /**
   * The target position of the camera after any canvas resize.
   * If it is 'center', the camera will be centered on the tilemap.
   * If it is a position, the camera will be centered on the given x,y position.
   * If it is a tile position, the camera will be centered on the given tile position.
   */
  target: RecenterCameraMotionTarget;
}
