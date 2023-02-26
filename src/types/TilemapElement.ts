import { TilePosition } from './TilePosition';

/**
 * A map of tilemap elements.
 */
export type TilemapElementMap = Record<string, TilemapElement>;

/**
 * A tilemap element.
 */
export type TilemapElement = {
  /**
   * The position of the element in the tilemap.
   */
  tilePosition: TilePosition;
  /**
   * The key of the sprite to use for the element.
   */
  spriteKey: string;
  /**
   * In witch layer order the element should be rendered.
   */
  layer: number;
};
