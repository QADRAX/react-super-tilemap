import { CurrentMotion, MotionRequest, MotionSettings } from '../../../../types/Motions';
import { Position } from '../../../../types/Position';

/**
 * The context of the ThirdPersonCamera component.
 *
 * @public
 */
export type CameraContext = {
  cameraPosition?: Position;
  zoom: number;
  addCameraMotion: (settings: MotionSettings, target: Position | 'center') => void;
  addZoomMotion: (settings: MotionSettings, target: number) => void;
  currentCameraMotion?: CurrentMotion<Position>;
  currentZoomMotion?: CurrentMotion<number>;
  zoomMotionQueue: MotionRequest<number>[];
  cameraMotionQueue: MotionRequest<Position | 'center'>[];
};
