import { useEffect, useMemo } from 'react';
import { useTilemapContext } from '../../Tilemap/TilemapContext/useTilemapContext';
import { Position } from '../../../types/Position';

export function useInitialCameraPosition(
  initialCameraPosition: Position | 'center' | undefined,
  cameraPosition: Position | undefined,
  setCameraPosition: (position: Position | undefined) => void
) {
  const { computed, state } = useTilemapContext();

  const { canvasSize } = state;

  const { mapDimensions } = computed;

  const initialPosition: Position = useMemo(() => {
    if (initialCameraPosition === 'center' || !initialCameraPosition) {
      return {
        y: Math.floor(mapDimensions.rows / 2),
        x: Math.floor(mapDimensions.cols / 2),
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
