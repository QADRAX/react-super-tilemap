import { Position } from '../types/Position';

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
