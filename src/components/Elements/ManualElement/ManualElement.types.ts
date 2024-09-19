import { ReactNode } from 'react';
import { Position } from '../../../types/Position';

export type ManualElementSettings = {
  /**
   * The position of the element in the tilemap.
   */
  tilePosition: Position;
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

export type ManualElementProps = ManualElementSettings & {
  children?: ReactNode;
};
