import { CurrentMotion, MotionRequest, MotionSettings } from '../../../../types/Motions';
import { TilePosition } from '../../../../types/TilePosition';

/**
 * The context of the ThirdPersonCamera component.
 *
 * @public
 */
export type CameraContext = {
  cameraPosition?: TilePosition;
  zoom: number;
  addCameraMotion: (settings: MotionSettings, target: TilePosition | 'center') => void;
  addZoomMotion: (settings: MotionSettings, target: number) => void;
  currentCameraMotion?: CurrentMotion<TilePosition>;
  currentZoomMotion?: CurrentMotion<number>;
  zoomMotionQueue: MotionRequest<number>[];
  cameraMotionQueue: MotionRequest<TilePosition | 'center'>[];
};
