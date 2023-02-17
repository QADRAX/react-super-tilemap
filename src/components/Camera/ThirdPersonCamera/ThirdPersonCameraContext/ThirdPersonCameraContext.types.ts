import { CameraMotionRequest, CurrentCameraMotion, CurrentZoomMotion, MotionSettings, ZoomMotionRequest } from "../../../../types/Motions";
import { TilePosition } from "../../../../types/TilePosition";

/**
 * The context of the ThirdPersonCamera component.
 * 
 * @public
 */
export type CameraContext = {
    cameraPosition?: TilePosition;
    zoom: number;
    addCameraMotion: (settings: MotionSettings, target: TilePosition | 'center') => void;
    addZoomMotion: (settings: MotionSettings, target: number) => void;
    currentCameraMotion?: CurrentCameraMotion;
    currentZoomMotion?: CurrentZoomMotion;
    zoomMotionQueue: ZoomMotionRequest[];
    cameraMotionQueue: CameraMotionRequest[];
};