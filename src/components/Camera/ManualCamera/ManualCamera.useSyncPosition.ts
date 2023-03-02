import { useEffect } from 'react';
import { useTilemapContext } from '../../Tilemap/TilemapContext/useTilemapContext';
import { ManualCameraSettings } from './ManualCamera.types';

export function useSyncPosition(
  position: ManualCameraSettings['position'],
  zoom: ManualCameraSettings['zoom']
) {
  const { state, actions } = useTilemapContext();

  const { canvasSize } = state;

  const { setCameraPosition, setZoom } = actions;

  useEffect(() => {
    if (canvasSize) {
      setZoom(zoom ?? 0);
      setCameraPosition(position);
    }
  }, [zoom, position, canvasSize]); // eslint-disable-line react-hooks/exhaustive-deps
}
