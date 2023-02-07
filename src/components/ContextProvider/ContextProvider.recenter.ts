import { useEffect, useState } from 'react';
import { ResizeCameraMotion } from '../../types/Motions';
import { isTilePosition } from '../../types/Motions.typeGuards';
import { ContextActions, ContextComputedState } from '../../types/TilemapContext';
import { TilePosition } from '../../types/TilePosition';

export function useCameraRecenterOnResize(
  computed: ContextComputedState,
  actions: ContextActions,
  resizeCameraMotion?: ResizeCameraMotion
): void {
  const [lastPositionBeforeResize, setLastPositionBeforeResize] = useState<
    TilePosition | undefined
  >(undefined);

  useEffect(() => {
    if (!computed.isResizing) {
      setLastPositionBeforeResize(computed.cameraCenteredTilePosition);
    }
  }, [computed.isResizing, computed.cameraCenteredTilePosition]);

  useEffect(() => {
    if (!computed.isResizing && lastPositionBeforeResize && resizeCameraMotion) {
      const type = resizeCameraMotion.target;
      if (type == 'center') {
        actions.addCameraMotion(resizeCameraMotion.settings, 'center');
      } else if (type == 'last-center') {
        actions.addCameraMotion(resizeCameraMotion.settings, lastPositionBeforeResize);
      } else if (isTilePosition(type)) {
        actions.addCameraMotion(resizeCameraMotion.settings, type);
      }
    }
  }, [computed.isResizing]); // eslint-disable-line react-hooks/exhaustive-deps
}
