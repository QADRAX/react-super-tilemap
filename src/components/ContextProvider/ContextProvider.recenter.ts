import { useEffect, useState } from 'react';
import { MotionSettings } from '../../types/Motions';
import { ContextActions, ContextComputedState } from '../../types/TilemapContext';
import { TilePosition } from '../../types/TilePosition';

export function useCameraRecenterOnResize(
  computed: ContextComputedState,
  actions: ContextActions,
  motionSettings?: MotionSettings
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
    if (!computed.isResizing && lastPositionBeforeResize && motionSettings) {
      actions.addCameraMotionCentered(motionSettings);
    }
  }, [computed.isResizing]); // eslint-disable-line react-hooks/exhaustive-deps
}
