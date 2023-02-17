import React, { useState } from "react";
import { ThirdPersonCameraProps } from "../../../types/ThirdPersonCamera";
import { TilePosition } from "../../../types/TilePosition";
import { CameraEventListener } from "../CameraEventListener/CameraEventListener";
import { ManualCamera } from "../ManualCamera/ManualCamera";
import { ThirdPersonCameraContext } from "./ThirdPersonCameraContext/ThirdPersonCameraContext";
import { useCameraRecenter } from "./ThirdPersonCamera.useCameraRecenter";
import { useHandlers } from "./ThirdPersonCamera.useHandlers";
import { useInitialCameraPosition } from "./ThirdPersonCamera.useInitialCameraPosition";
import { useMotions } from "./ThirdPersonCamera.useMotions";

/**
 * Use this component to operate with a third person camera in the tilemap.
 * 
 * Here you can forget about control the camera position and zoom because this component will do it for you enabling drag and zoom in/ zoom out controls by default.
 * 
 * You can disable these controls by setting the draggable and zoomeable props to false.
 * 
 * You can also set the initial camera position and zoom.
 * 
 * You can also set the drag sensitivity and zoom increment.
 * 
 * You can also set the camera to recenter on resize and zoom.
 * 
 * This component will provide a context to all its children.
 * 
 * @param props component props
 */
export const ThirdPersonCamera: React.FunctionComponent<ThirdPersonCameraProps> = (props) => {
    const initialZoom = props.initialZoom != undefined ? Math.abs(props.initialZoom) : 0;
    const [cameraPosition, setCameraPosition] = useState<TilePosition | undefined>(undefined);
    const [zoom, setZoom] = useState<number>(initialZoom);
    const [isCameraDragging, setIsDragging] = useState<boolean>(false);

    const {
        addZoomMotion,
        addCameraMotion,
        currentZoomMotion,
        currentCameraMotion,
        zoomMotionQueue,
        cameraMotionQueue,
    } = useMotions(
        isCameraDragging,
        cameraPosition,
        zoom,
        setCameraPosition,
        setZoom,
    );

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
        <ThirdPersonCameraContext.Provider value={{
            cameraPosition,
            zoom,
            addZoomMotion,
            addCameraMotion,
            currentCameraMotion,
            currentZoomMotion,
            zoomMotionQueue,
            cameraMotionQueue,
        }}> 
            <CameraEventListener handlers={handlers} />
            <ManualCamera 
                position={cameraPosition} 
                zoom={zoom} 
                clickable={false}
            >
                {props.children}
            </ManualCamera>
        </ThirdPersonCameraContext.Provider>
    );
}