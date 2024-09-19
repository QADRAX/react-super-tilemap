/**
 * Returns an element from a 3D array at the given row, col, and layer.
 * @param array3D - The 3D array to retrieve the element from.
 * @param row - The row index (first dimension).
 * @param col - The column index (second dimension).
 * @param layer - The layer index (third dimension).
 * @returns The element at the given coordinates or undefined if out of bounds.
 */
export function getElementFrom3DArray<T>(
  array3D: T[][][],
  row: number,
  col: number,
  layer: number
): T | undefined {
  if (array3D[row] && array3D[row][col] && array3D[row][col][layer] !== undefined) {
    return array3D[row][col][layer];
  }
  return undefined;
}