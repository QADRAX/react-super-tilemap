import React, { useState } from "react";
import { ThirdPersonCameraProps } from "../../../types/ThirdPersonCamera";
import { CameraEventListener } from "../CameraEventListener/CameraEventListener";
import { ThirdPersonCameraContext } from "./ThirdCameraContext/ThirdPersonCameraContext";
import { useCameraRecenter } from "./ThirdPersonCamera.useCameraRecenter";
import { useHandlers } from "./ThirdPersonCamera.useDragAndZoomHandlers";
import { useInitialCameraPosition } from "./ThirdPersonCamera.useInitialCameraPosition";
import { useMotions } from "./ThirdPersonCamera.useMotions";

export const ThirdPersonCamera: React.FunctionComponent<ThirdPersonCameraProps> = (props) => {
    const [isCameraDragging, setIsDragging] = useState<boolean>(false);

    const {
        addZoomMotion,
        addCameraMotion,
        currentZoomMotion,
        currentCameraMotion,
        zoomMotionQueue,
        cameraMotionQueue,
    } = useMotions(isCameraDragging);

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
    });

    useInitialCameraPosition(props.initialCameraPosition);

    useCameraRecenter(addCameraMotion, props.recenterCameraOnResize, props.recenterCameraOnZoom);

    return (
        <ThirdPersonCameraContext.Provider value={{
            addZoomMotion,
            addCameraMotion,
            currentCameraMotion,
            currentZoomMotion,
            zoomMotionQueue,
            cameraMotionQueue,
        }}> 
            <CameraEventListener handlers={handlers} />
            {props.children}
        </ThirdPersonCameraContext.Provider>
    );
}