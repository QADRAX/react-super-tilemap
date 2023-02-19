import { useEffect, useMemo } from 'react';
import { useTilemapContext } from '../../Tilemap/TilemapContext/useTilemapContext';
import { TilePosition } from '../../../types/TilePosition';

export function useInitialCameraPosition(
  initialCameraPosition: TilePosition | 'center' | undefined,
  cameraPosition: TilePosition | undefined,
  setCameraPosition: (position: TilePosition | undefined) => void
) {
  const { computed, state } = useTilemapContext();

  const { canvasSize } = state;

  const { mapDimensions } = computed;

  const initialPosition: TilePosition = useMemo(() => {
    if (initialCameraPosition === 'center' || !initialCameraPosition) {
      return {
        col: Math.floor(mapDimensions.cols / 2),
        row: Math.floor(mapDimensions.rows / 2),
      };
    }
    return initialCameraPosition;
  }, [initialCameraPosition, mapDimensions]);

  useEffect(() => {
    if (canvasSize && !cameraPosition) {
      setCameraPosition(initialPosition);
    }
  }, [setCameraPosition, canvasSize, cameraPosition, initialPosition]);
}
