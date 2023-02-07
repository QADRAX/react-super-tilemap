import { MotionSettings } from './Motions';
import { SpriteDefinition } from './SpriteDefinition';

export type TilemapContextProviderEvents = {
  /**
   * This event is triggered when any error occurs loading sprites definition.
   *
   * @param error
   * @returns
   */
  onSpritesLoadError?: (error: Error) => void;
  /**
   * This event is triggered when the camera ends moving by a camera motion.
   */
  onCameraMotionEnd?: () => void;
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

  recenterCameraOnResize?: MotionSettings;

  recenterCameraOnZoom?: MotionSettings;
}
