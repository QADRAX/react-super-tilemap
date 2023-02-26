import { TilePosition } from '../../../types/TilePosition';

export type ManualElementProps = {
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
  /**
   * Unique key to identify the element.
   */
  elementKey: string;
};
