import { RecenterCameraMotion } from './Motions';
import { SpriteDefinition } from './SpriteDefinition';
import { TilePosition } from './TilePosition';

/**
 * Tilemap events.
 * 
 * @public
 */
export type TilemapEvents = {
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
  /**
   * It will be called when a tile is clicked.
   *
   * @param tile tile position
   */
  onTileClick?: (tile: TilePosition) => void;
  /**
   * It will be called when a tile is double clicked.
   *
   * @param tile tile position
   */
  onTileDoubleClick?: (tile: TilePosition) => void;
  /**
   * It will be called when a tile is right clicked.
   *
   * @param tile tile position
   */
  onTileContextMenu?: (tile: TilePosition) => void;
  /**
   * It will be called when a tile is hovered.
   *
   * @param tile tile position
   */
  onTileHover?: (tile: TilePosition) => void;
  /**
   * It will be called when a tile is hovered out.
   *
   * @param tile tile position
   */
  onTileHoverOut?: (tile: TilePosition) => void;
};

/**
 * Tilemap settings.
 * 
 * @public
 */
export type TilemapSettings = {
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
  /**
   * Configuration for camera motions that are being executed after a the zoom level is changed.
   */
  recenterCameraOnZoom?: RecenterCameraMotion;
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
   * canvas's background color.
   *
   * If not provided, the default value will be used.
   * If provided, it must be a valid CSS color.
   *
   * @example
   * backgroundColor: "#000000"
   * backgroundColor: "rgb(0, 0, 0)"
   * backgroundColor: "rgba(0, 0, 0, 0.5)"
   *
   * @default '#cbf0ff'
   */
  backgroundColor?: string;
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
}

/**
 * Tilemap component props.
 * 
 * @public
 */
export interface TilemapProps extends TilemapSettings, TilemapEvents {
  /**
   * Children to render.
   * 
   * Here you can start using the TilemapContext and operate with the tilemap.
   */
  children?: React.ReactNode;
}