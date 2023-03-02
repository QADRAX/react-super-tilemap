import React, { FunctionComponent } from 'react';
import { CameraEventListener } from '../CameraEventListener/CameraEventListener';
import { ManualCameraSettings } from './ManualCamera.types';
import { useHandlers } from './ManualCamera.useHandlers';
import { useSyncPosition } from './ManualCamera.useSyncPosition';

/**
 * This component is used to manually control the camera position and zoom of the tilemap.
 *
 * Use clickable prop to enable or disable click controls.
 *
 * @public
 *
 * @param props ManualCameraProps
 */
export const ManualCamera: FunctionComponent<ManualCameraSettings> = (props) => {
  useSyncPosition(props.position, props.zoom);

  const clickable = props.clickable ?? true;

  const handlers = useHandlers();

  return (
    <>
      {clickable && <CameraEventListener handlers={handlers} />}
      {props.children}
    </>
  );
};
