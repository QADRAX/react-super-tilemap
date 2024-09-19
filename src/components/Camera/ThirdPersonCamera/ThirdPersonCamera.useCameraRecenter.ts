import { useEffect, useState } from 'react';
import { useTilemapContext } from '../../Tilemap/TilemapContext/useTilemapContext';
import { ThirdPersonCameraProps } from './ThirdPersonCamera.types';
import { isPosition } from '../../../utils/typeGuards';
import { CameraContext } from './ThirdPersonCameraContext/ThirdPersonCameraContext.types';
import { Position } from '../../../types/Position';

export function useCameraRecenter(
  addCameraMotion: CameraContext['addCameraMotion'],
  recenterCameraMotion?: ThirdPersonCameraProps['recenterCameraOnResize'],
  zoomCameraMotion?: ThirdPersonCameraProps['recenterCameraOnZoom']
): void {
  useCameraRecenterBeforeResize(addCameraMotion, recenterCameraMotion);
  useCameraRecenterBeforeZoom(addCameraMotion, zoomCameraMotion);
}

export function useCameraRecenterBeforeResize(
  addCameraMotion: CameraContext['addCameraMotion'],
  resizeCameraMotion?: ThirdPersonCameraProps['recenterCameraOnResize']
): void {
  const { computed } = useTilemapContext();

  useCameraRecenterBeforeFlag(
    computed.isResizing,
    computed.cameraTilePosition,
    addCameraMotion,
    resizeCameraMotion
  );
}

export function useCameraRecenterBeforeZoom(
  addCameraMotion: CameraContext['addCameraMotion'],
  zoomCameraMotion?: ThirdPersonCameraProps['recenterCameraOnZoom']
): void {
  const { computed } = useTilemapContext();

  useCameraRecenterBeforeFlag(
    computed.isZooming,
    computed.cameraTilePosition,
    addCameraMotion,
    zoomCameraMotion
  );
}

export function useCameraRecenterBeforeFlag(
  flag: boolean,
  currentCameraTilePosition: Position | undefined,
  addCameraMotion: CameraContext['addCameraMotion'],
  resizeCameraMotion?: ThirdPersonCameraProps['recenterCameraOnResize']
): void {
  const [lastPositionBeforeFlagChange, setLastPositionBeforeFlagChange] = useState<
    Position | undefined
  >(undefined);

  useEffect(() => {
    if (!flag) {
      setLastPositionBeforeFlagChange(currentCameraTilePosition);
    }
  }, [flag, currentCameraTilePosition]);

  useEffect(() => {
    if (!flag && lastPositionBeforeFlagChange && resizeCameraMotion) {
      const target = resizeCameraMotion.target;
      if (target == 'center' || isPosition(target)) {
        addCameraMotion(resizeCameraMotion.settings, target);
      } else if (target == 'last-center') {
        addCameraMotion(resizeCameraMotion.settings, lastPositionBeforeFlagChange);
      }
    }
  }, [flag]); // eslint-disable-line react-hooks/exhaustive-deps
}
