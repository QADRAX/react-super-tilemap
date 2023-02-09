import { useEffect, useState } from 'react';
import { RecenterCameraMotion } from '../types/Motions';
import { isTilePosition } from '../types/Motions.typeGuards';
import { ContextActions } from '../types/TilemapContext';
import { TilePosition } from '../types/TilePosition';

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
      const type = resizeCameraMotion.target;
      if (type == 'center') {
        actions.addCameraMotion(resizeCameraMotion.settings, 'center');
      } else if (type == 'last-center') {
        actions.addCameraMotion(resizeCameraMotion.settings, lastPositionBeforeResize);
      } else if (isTilePosition(type)) {
        actions.addCameraMotion(resizeCameraMotion.settings, type);
      }
    }
  }, [flag]); // eslint-disable-line react-hooks/exhaustive-deps
}
