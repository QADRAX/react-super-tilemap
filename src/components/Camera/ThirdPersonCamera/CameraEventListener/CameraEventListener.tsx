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

    get handlers() {
        return this.props.handlers;
    }

    componentDidMount(): void {
        this.unsubscribeOnMouseDown = tilemapEventChannel.on('onMouseDown', (mousePosition) => {
            this.handlers.handleMouseDown(mousePosition);
        });
        this.unsubscribeOnMouseUp = tilemapEventChannel.on('onMouseUp', () => {
            this.handlers.handleMouseUp();
        });
        this.unsubscribeOnMouseMove = tilemapEventChannel.on('onMouseMove', (mousePosition) => {
            this.handlers.handleMouseMove(mousePosition);
        });
        this.unsubscribeOnWheel = tilemapEventChannel.on('onWheel', (deltaY) => {
            this.props.handlers.handleWheel(deltaY)
        });
        this.unsubscribeOnClick = tilemapEventChannel.on('onClick', (mousePosition) => {
            this.props.handlers.handleClick(mousePosition)
        });
        this.unsubscribeOnDoubleClick = tilemapEventChannel.on('onDoubleClick', (mousePosition) => {
            this.props.handlers.handleDoubleClick(mousePosition)
        });
        this.unsubscribeOnContextMenu = tilemapEventChannel.on('onContextMenu', (mousePosition) => { 
            this.props.handlers.handleContextMenu(mousePosition)
        });
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