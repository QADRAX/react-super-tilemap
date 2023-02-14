import { createContext } from 'react';
import { CameraMotionRequest, CurrentCameraMotion, CurrentZoomMotion, MotionSettings, ZoomMotionRequest } from '../../../../types/Motions';
import { TilePosition } from '../../../../types/TilePosition';

export type CameraContext = {
    addCameraMotion: (settings: MotionSettings, target: TilePosition | 'center') => void;
    addZoomMotion: (settings: MotionSettings, target: number) => void;
    currentCameraMotion?: CurrentCameraMotion;
    currentZoomMotion?: CurrentZoomMotion;
    zoomMotionQueue: ZoomMotionRequest[];
    cameraMotionQueue: CameraMotionRequest[];
};

const initialContext: CameraContext = {
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