import { useState } from 'react';
import { useStartMotion } from '../../../hooks/useStartMotion';
import { useCameraMotions } from './ThirdPersonCamera.useCameraMotions';
import { useZoomMotions } from './ThirdPersonCamera.useZoomMotions';
import { TilePosition } from '../../../types/TilePosition';
import { CurrentMotion } from '../../../types/Motions';

export function useMotions(
  isCameraDragging: boolean,
  cameraPosition: TilePosition | undefined,
  zoom: number,
  setCameraPosition: (position: TilePosition | undefined) => void,
  setZoom: (zoom: number) => void
) {
  const [currentZoomMotion, setCurrentZoomMotion] = useState<CurrentMotion<number> | undefined>(
    undefined
  );
  const [currentCameraMotion, setCurrentCameraMotion] = useState<
    CurrentMotion<TilePosition> | undefined
  >(undefined);

  const { addZoomMotion, endZoomMotion, zoomMotionQueue } = useZoomMotions({
    isCameraDragging,
    currentZoomMotion,
    setCurrentZoomMotion,
    zoom,
  });

  const { addCameraMotion, endCameraMotion, cameraMotionQueue } = useCameraMotions({
    isCameraDragging,
    currentCameraMotion,
    setCurrentCameraMotion,
    cameraPosition,
  });

  useStartMotion(currentZoomMotion, (zoom) => setZoom(zoom!), endZoomMotion);
  useStartMotion(currentCameraMotion, (camera) => setCameraPosition(camera!), endCameraMotion);

  return {
    addZoomMotion,
    addCameraMotion,
    currentZoomMotion,
    currentCameraMotion,
    zoomMotionQueue,
    cameraMotionQueue,
  };
}
