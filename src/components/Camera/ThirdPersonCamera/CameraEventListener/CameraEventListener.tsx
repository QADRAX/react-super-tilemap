import React from "react";
import { tilemapEventChannel } from "../../../../EventBus/TilemapEventChannel";
import { DragAndZoomHandlers } from "../ThirdPersonCamera.useDragAndZoomHandlers";

export type CameraEventListenerProps = {
    handlers: DragAndZoomHandlers;
};

export class CameraEventListener extends React.PureComponent<CameraEventListenerProps> {
    private unsubscribeOnMouseDown?: () => void;
    private unsubscribeOnMouseUp?: () => void;
    private unsubscribeOnMouseMove?: () => void;
    private unsubscribeOnWheel?: () => void;
    private unsubscribeOnClick?: () => void;
    private unsubscribeOnDoubleClick?: () => void;
    private unsubscribeOnContextMenu?: () => void;


    componentDidMount(): void {
        this.unsubscribeOnMouseDown = tilemapEventChannel.on('onMouseDown', this.props.handlers.handleMouseDown);
        this.unsubscribeOnMouseUp = tilemapEventChannel.on('onMouseUp', this.props.handlers.handleMouseUp);
        this.unsubscribeOnMouseMove = tilemapEventChannel.on('onMouseMove', this.props.handlers.handleMouseMove);
        this.unsubscribeOnWheel = tilemapEventChannel.on('onWheel', this.props.handlers.handleWheel);
        this.unsubscribeOnClick = tilemapEventChannel.on('onClick', this.props.handlers.handleClick);
        this.unsubscribeOnDoubleClick = tilemapEventChannel.on('onDoubleClick', this.props.handlers.handleDoubleClick);
        this.unsubscribeOnContextMenu = tilemapEventChannel.on('onContextMenu', this.props.handlers.handleContextMenu);
    }

    componentWillUnmount(): void {
        this.unsubscribeOnMouseDown?.();
        this.unsubscribeOnMouseUp?.();
        this.unsubscribeOnMouseMove?.();
        this.unsubscribeOnWheel?.();
        this.unsubscribeOnClick?.();
        this.unsubscribeOnDoubleClick?.();
        this.unsubscribeOnContextMenu?.();
    }

    render() {
        return null;
    }
}