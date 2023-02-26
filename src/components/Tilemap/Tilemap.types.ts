import { SpriteDefinition } from '../../types/SpriteDefinition';
import { TilePosition } from '../../types/TilePosition';

/**
 * Tilemap events.
 *
 * @public
 */
export type TilemapEvents = {
  /**
   * It will be called when an error occurs while loading sprites.
   *
   * @param error - Error that occurred while loading sprites.
   */
  onSpritesLoadError?: (error: Error) => void;
  /**
   * It will be called when a tilemap is clicked, even if is not a tile where the click happened.
   *
   * @param tile tile position
   */
  onTilemapClick?: (tile: TilePosition) => void;
  /**
   * It will be called when a tilemap is double clicked, even if is not a tile where the click happened.
   *
   * @param tile tile position
   */
  onTilemapDoubleClick?: (tile: TilePosition) => void;
  /**
   * It will be called when a tilemap is right clicked, even if is not a tile where the click happened.
   *
   * @param tile tile position
   *
   */
  onTilemapContextMenu?: (tile: TilePosition) => void;
  /**
   * It will be called when defined tilemap's tile are clicked.
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
   * Tile default tile size in px.
   *
   * If not provided, the default value will be used.
   * If provided, it must be greater than 0.
   *
   * @default 16
   */
  defaultTileSize?: number;
  /**
   * Scheme of Columns/rows/layers of sprite keys that will be rendered on the tile map.
   */
  tilmapScheme?: string[][][];
  /**
   * Definition of the sprites that tilemap will render.
   */
  spriteDefinition?: SpriteDefinition[];
  /**
   * Tilemap's background color.
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
};

/**
 * Tilemap component props.
 *
 * @public
 */
export type TilemapProps = TilemapSettings & TilemapEvents;
