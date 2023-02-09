import { RecenterCameraMotion } from './Motions';
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
  defaultTileSize?: number;
  /**
   * Columns/rows/layers matrix of sprite keys.
   */
  tilmapSchema: string[][][];
  /**
   * List of sprites to load.
   */
  spriteDefinition: SpriteDefinition[];
  /**
   * Configuration for camera motions that are being executed when the canvas is resized.
   */
  recenterCameraOnResize?: RecenterCameraMotion;

  recenterCameraOnZoom?: RecenterCameraMotion;
  /**
   * Children to render.
   */
  children?: React.ReactNode;
}
