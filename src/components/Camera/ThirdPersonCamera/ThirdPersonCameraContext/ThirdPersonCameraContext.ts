import { createContext } from 'react';
import { CameraContext } from './ThirdPersonCameraContext.types';

const initialContext: CameraContext = {
    zoom: 0,
    addCameraMotion: () => {},
    addZoomMotion: () => {},
    zoomMotionQueue: [],
    cameraMotionQueue: [],
};

/**
 * Third person camera context.
 *
 * This context is accessible only for the ThirdPersonCamera components.
 */
export const ThirdPersonCameraContext = createContext<CameraContext>(initialContext);