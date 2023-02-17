import React, { FunctionComponent } from "react";
import { TilePosition } from "../../../types/TilePosition";
import { CameraEventListener } from "../CameraEventListener/CameraEventListener";
import { useHandlers } from "./ManualCamera.useHandlers";
import { useSyncPosition } from "./ManualCamera.useSyncPosition";

export type ManualCameraProps = {
    position?: TilePosition | 'center';
    zoom?: number;
    clickable?: boolean;
};

export const ManualCamera: FunctionComponent<ManualCameraProps> = (props) => {
    useSyncPosition(props.position, props.zoom);

    const clickable = props.clickable ?? true;

    const handlers = clickable ? useHandlers() : {};

    return (
        <>
            {clickable && <CameraEventListener handlers={handlers} />}
        </>
    );
};