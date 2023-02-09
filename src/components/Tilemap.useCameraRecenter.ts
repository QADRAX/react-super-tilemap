import { useEffect, useState } from 'react';
import { RecenterCameraMotion } from '../types/Motions';
import { ContextActions } from '../types/TilemapContext';
import { TilePosition } from '../types/TilePosition';
import { isTilePosition } from '../utils/typeGuards';

/**
 * Calls to recenter the camera when the flag is set to false.
 * 
 * @private
 * 
 * @param flag flag to trigger the recenter
 * @param tilePosition tile position to recenter on
 * @param actions tilemap actions
 * @param resizeCameraMotion camera motion to use when recentering
 */
export function useCameraRecenter(
  flag: boolean,
  tilePosition: TilePosition | undefined,
  actions: ContextActions,
  resizeCameraMotion?: RecenterCameraMotion
): void {
  const [lastPositionBeforeResize, setLastPositionBeforeResize] = useState<
    TilePosition | undefined
  >(undefined);

  useEffect(() => {
    if (!flag) {
      setLastPositionBeforeResize(tilePosition);
    }
  }, [flag, tilePosition]);

  useEffect(() => {
    if (!flag && lastPositionBeforeResize && resizeCameraMotion) {
      const target = resizeCameraMotion.target;
      if (target == 'center' || isTilePosition(target)) {
        actions.addCameraMotion(resizeCameraMotion.settings, target);
      } else if (target == 'last-center') {
        actions.addCameraMotion(resizeCameraMotion.settings, lastPositionBeforeResize);
      }
    }
  }, [flag]); // eslint-disable-line react-hooks/exhaustive-deps
}
