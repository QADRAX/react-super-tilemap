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
  tilmapSchema?: string[][][];
  /**
   * List of sprites to load.
   */
  spriteDefinition?: SpriteDefinition[];
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