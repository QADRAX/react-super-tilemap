import { RecenterCameraMotion } from './Motions';
import { TilePosition } from './TilePosition';

export type ThirdPersonCameraSettings = {
  /**
   * Flag to indicate if the tilemap zoom control is enabled.
   *
   * @default true
   */
  zoomeable?: boolean;
  /**
   * Flag to indicate if the tilemap drag controls to move the camera are enabled.
   *
   * @default true
   */
  draggable?: boolean;
  /**
   * Initial camera position when the tilemap is mounted.
   *
   * If not provided, the default value will be used.
   *
   * @default 'center'
   */
  initialCameraPosition?: TilePosition | 'center';
  /**
   * Initial zoom level when the tilemap is mounted.
   *
   * If not provided, the default value will be used.
   *
   * @default 0
   */
  initialZoom?: number;
  /**
   * Tilemap's drag speed sensitivity.
   *
   * If not provided, the default value will be used.
   * If provided, it must be greater than 0.
   *
   * @default 1
   */
  dragSensitivity?: number;
  /**
   * Zoom increment per wheel scroll.
   *
   * If not provided, the default value will be used.
   *
   * @default 1
   */
  zoomIncrement?: number;
  /**
   * Configuration for camera motions that are being executed when the canvas is resized.
   */
  recenterCameraOnResize?: RecenterCameraMotion;
  /**
   * Configuration for camera motions that are being executed after a the zoom level is changed.
   */
  recenterCameraOnZoom?: RecenterCameraMotion;
};

export type ThirdPersonCameraEvents = {
  /**
   * This event is triggered when a camera motion ends.
   */
  onCameraMotionEnd?: () => void;
  /**
   * This event is triggered when a zoom motion ends.
   */
  onZoomMotionEnd?: () => void;
};

export type ThirdPersonCameraProps = ThirdPersonCameraSettings & ThirdPersonCameraEvents;
