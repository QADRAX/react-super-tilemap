import { useState } from 'react';
import { useStartMotion } from '../../../hooks/useStartMotion';
import { useCameraMotions } from './ThirdPersonCamera.useCameraMotions';
import { useZoomMotions } from './ThirdPersonCamera.useZoomMotions';
import { CurrentMotion } from '../../../types/Motions';
import { Position } from '../../../types/Position';

export function useMotions(
  isCameraDragging: boolean,
  cameraPosition: Position | undefined,
  zoom: number,
  setCameraPosition: (position: Position | undefined) => void,
  setZoom: (zoom: number) => void
) {
  const [currentZoomMotion, setCurrentZoomMotion] = useState<CurrentMotion<number> | undefined>(
    undefined
  );
  const [currentCameraMotion, setCurrentCameraMotion] = useState<
    CurrentMotion<Position> | undefined
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
