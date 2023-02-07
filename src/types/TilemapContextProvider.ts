import { MotionSettings, ResizeCameraMotion } from './Motions';
import { SpriteDefinition } from './SpriteDefinition';

export type TilemapContextProviderEvents = {
  /**
   * This event is triggered when an error occurs loading sprites.
   *
   * @param error - Error that occurred while loading sprites.
   */
  onSpritesLoadError?: (error: Error) => void;
  /**
   * This event is triggered when a camera motion ends.
   */
  onCameraMotionEnd?: () => void;
  /**
   * This event is triggered when a zoom motion ends.
   */
  onZoomMotionEnd?: () => void;
};

export interface TilemapContextProviderProps extends TilemapContextProviderEvents {
  /**
   * Tilemap's default tile size in px.
   *
   * If not provided, the default value will be used.
   * If provided, it must be greater than 0.
   *
   * @default 16
   */
  defaultTileSizePx?: number;
  /**
   * Columns/rows/layers matrix of tile keys.
   */
  schema: string[][][];
  /**
   * List of sprites to load.
   */
  sprites: SpriteDefinition[];
  /**
   * Children to render.
   */
  children: React.ReactNode;
  /**
   * Configuration for camera motions that are being executed when the canvas is resized.
   */
  recenterCameraOnResize?: ResizeCameraMotion;

  recenterCameraOnZoom?: MotionSettings;
}
