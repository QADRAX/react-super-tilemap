import { useState } from "react";
import { CurrentCameraMotion, CurrentZoomMotion } from "../../../types/Motions";
import { useCameraMotions } from "./ThirdPersonCamera.useCameraMotions";
import { useZoomMotions } from "./ThirdPersonCamera.useZoomMotions";

export function useMotions(
    isCameraDragging: boolean,
) {
    const [currentZoomMotion, setCurrentZoomMotion] = useState<CurrentZoomMotion | undefined>(undefined);
    const [currentCameraMotion, setCurrentCameraMotion] = useState<CurrentCameraMotion | undefined>(undefined);

    const isCameraInMotion = !!currentCameraMotion;
    const isZoomInMotion = !!currentZoomMotion;

    const {
        addZoomMotion,
        endZoomMotion,
        zoomMotionQueue,
    } = useZoomMotions({
        isCameraDragging,
        isCameraInMotion,
        currentZoomMotion,
        setCurrentZoomMotion,
    });

    const {
        addCameraMotion,
        endCameraMotion,
        cameraMotionQueue,
    } = useCameraMotions({
        isCameraDragging,
        isZoomInMotion,
        currentCameraMotion,
        setCurrentCameraMotion,
    });

    return {
        addZoomMotion,
        endZoomMotion,
        addCameraMotion,
        endCameraMotion,
        currentZoomMotion,
        currentCameraMotion,  
        zoomMotionQueue,
        cameraMotionQueue, 
    };
}