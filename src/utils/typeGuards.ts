import { Position } from '../types/Position';
import { TilePosition } from '../types/TilePosition';

export function isPosition(value: unknown): value is Position {
  return (
    typeof value === 'object' &&
    value !== null &&
    'x' in value &&
    'y' in value &&
    typeof (value as Position).x === 'number' &&
    typeof (value as Position).y === 'number'
  );
}

export function isTilePosition(value: unknown): value is TilePosition {
  return (
    typeof value === 'object' &&
    value !== null &&
    'col' in value &&
    'row' in value &&
    typeof (value as TilePosition).col === 'number' &&
    typeof (value as TilePosition).row === 'number'
  );
}
