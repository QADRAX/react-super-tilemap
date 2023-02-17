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

    const handlers = props.clickable ?? true ? useHandlers() : {};

    return (
        <>
            {props.clickable && <CameraEventListener handlers={handlers} />}
        </>
    );
};