import { useState } from "react";
import { CurrentCameraMotion, CurrentZoomMotion } from "../../../types/Motions";
import { useMotionRunner } from "./useMotionRunner";
import { useCameraMotions } from "./ThirdPersonCamera.useCameraMotions";
import { useZoomMotions } from "./ThirdPersonCamera.useZoomMotions";
import { TilePosition } from "../../../types/TilePosition";

export function useMotions(
    isCameraDragging: boolean,
    cameraPosition: TilePosition | undefined,
    zoom: number,
    setCameraPosition: (position: TilePosition | undefined) => void,
    setZoom: (zoom: number) => void,
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
        zoom,
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
        cameraPosition,
    });


    useMotionRunner(currentZoomMotion, (zoom) => setZoom(zoom!), endZoomMotion);
    useMotionRunner(currentCameraMotion, (camera) => setCameraPosition(camera!), endCameraMotion);

    return {
        addZoomMotion,
        addCameraMotion,
        currentZoomMotion,
        currentCameraMotion,  
        zoomMotionQueue,
        cameraMotionQueue, 
    };
}