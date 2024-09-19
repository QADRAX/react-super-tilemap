import React, { FunctionComponent, useState } from 'react';
import { CameraEventListener } from '../CameraEventListener/CameraEventListener';
import { ManualCamera } from '../ManualCamera/ManualCamera';
import { ThirdPersonCameraContext } from './ThirdPersonCameraContext/ThirdPersonCameraContext';
import { useCameraRecenter } from './ThirdPersonCamera.useCameraRecenter';
import { useHandlers } from './ThirdPersonCamera.useHandlers';
import { useInitialCameraPosition } from './ThirdPersonCamera.useInitialCameraPosition';
import { useMotions } from './ThirdPersonCamera.useMotions';
import { ThirdPersonCameraProps } from './ThirdPersonCamera.types';
import { Position } from '../../../types/Position';

/**
 * Use this component to operate with a third person camera in the tilemap.
 *
 * Here you can forget about control the camera position and zoom because this component will do it for you enabling drag and zoom controls by default.
 *
 * This component will provide a context to all its children. There you can use the `useThirdPersonCamera` hook to get this context and use it to control the camera using the `addCameraMotion` and `addZoomMotion` functions.
 *
 * @param props component props
 */
export const ThirdPersonCamera: FunctionComponent<ThirdPersonCameraProps> = (props) => {
  const initialZoom = props.initialZoom != undefined ? Math.abs(props.initialZoom) : 0;
  const [cameraPosition, setCameraPosition] = useState<Position | undefined>(undefined);
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [isCameraDragging, setIsDragging] = useState<boolean>(false);

  const {
    addZoomMotion,
    addCameraMotion,
    currentZoomMotion,
    currentCameraMotion,
    zoomMotionQueue,
    cameraMotionQueue,
  } = useMotions(isCameraDragging, cameraPosition, zoom, setCameraPosition, setZoom);

  const isCameraInMotion = !!currentCameraMotion;
  const isZoomInMotion = !!currentZoomMotion;

  const handlers = useHandlers({
    draggable: props.draggable,
    zoomeable: props.zoomeable,
    dragSensitivity: props.dragSensitivity,
    zoomIncrement: props.zoomIncrement,
    isCameraDragging,
    setIsDragging,
    isCameraInMotion,
    isZoomInMotion,
    cameraPosition,
    zoom,
    setCameraPosition,
    setZoom,
  });

  useInitialCameraPosition(props.initialCameraPosition, cameraPosition, setCameraPosition);

  useCameraRecenter(addCameraMotion, props.recenterCameraOnResize, props.recenterCameraOnZoom);

  return (
    <ThirdPersonCameraContext.Provider
      value={{
        cameraPosition,
        zoom,
        addZoomMotion,
        addCameraMotion,
        currentCameraMotion,
        currentZoomMotion,
        zoomMotionQueue,
        cameraMotionQueue,
      }}
    >
      <CameraEventListener handlers={handlers} />
      <ManualCamera position={cameraPosition} zoom={zoom} clickable={false}>
        {props.children}
      </ManualCamera>
    </ThirdPersonCameraContext.Provider>
  );
};
