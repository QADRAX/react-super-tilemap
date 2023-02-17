import { useState } from "react";
import { useTilemapContext } from "../../../hooks/useTilemapContext";
import { CurrentCameraMotion, CurrentZoomMotion } from "../../../types/Motions";
import { useMotionRunner } from "./useMotionRunner";
import { useCameraMotions } from "./ThirdPersonCamera.useCameraMotions";
import { useZoomMotions } from "./ThirdPersonCamera.useZoomMotions";

export function useMotions(
    isCameraDragging: boolean,
) {
    const { actions } = useTilemapContext();

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


    useMotionRunner(currentZoomMotion, (zoom) => actions.setZoom(zoom!), endZoomMotion);
    useMotionRunner(currentCameraMotion, (camera) => actions.setCameraPosition(camera!), endCameraMotion);

    return {
        addZoomMotion,
        addCameraMotion,
        currentZoomMotion,
        currentCameraMotion,  
        zoomMotionQueue,
        cameraMotionQueue, 
    };
}