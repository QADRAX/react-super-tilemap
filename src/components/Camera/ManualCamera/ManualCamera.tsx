import React, { FunctionComponent } from "react";
import { TilePosition } from "../../../types/TilePosition";
import { CameraEventListener } from "../CameraEventListener/CameraEventListener";
import { useHandlers } from "./ManualCamera.useHandlers";
import { useSyncPosition } from "./ManualCamera.useSyncPosition";

export type ManualCameraProps = {
    position?: TilePosition | 'center';
    zoom?: number;
};

export const ManualCamera: FunctionComponent<ManualCameraProps> = (props) => {
    useSyncPosition(props.position, props.zoom);
    
    const handlers = useHandlers();

    return (
        <CameraEventListener handlers={handlers} />
    );
};