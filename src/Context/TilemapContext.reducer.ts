import { ContextState } from "../types/TilemapContext";
import { TilemapActions, TilemapActionType } from "./TilemapContext.actions";

export function tilemapReducer(
    state: ContextState,
    action: TilemapActions,
): ContextState {
    const nextState = { ...state };

    switch (action.type) {
        case TilemapActionType.SetCameraPosition:
            nextState.cameraPosition = action.payload.position;
            return nextState;
        case TilemapActionType.SetCurrentZoom:
            nextState.currentZoom = action.payload.zoom;
            return nextState;
        case TilemapActionType.SetDefaultTileSizePx:
            nextState.defaultTileSizePx = action.payload.defaultTileSizePx;
            return nextState;
        case TilemapActionType.SetSpriteSchema:
            nextState.spriteSchema = action.payload.spriteSchema;
            return nextState;
        case TilemapActionType.SetSpriteMap:
            nextState.spriteMap = action.payload.spriteMap;
            return nextState;
        case TilemapActionType.SetIsSpriteMapLoading:
            nextState.isSpriteMapLoading = action.payload.isSpriteMapLoading;
            return nextState;
        case TilemapActionType.SetCurrentCameraMotion:
            nextState.currentCameraMotion = action.payload.currentCameraMotion;
            return nextState;
        case TilemapActionType.SetCurrentZoomMotion:
            nextState.currentZoomMotion = action.payload.currentZoomMotion;
            return nextState;
        case TilemapActionType.SetCanvasSize:
            nextState.canvasSize = action.payload.canvasSize;
            return nextState;
        case TilemapActionType.SetCameraMotionQueue:
            nextState.cameraMotionQueue = action.payload.cameraMotionQueue;
            return nextState;
        case TilemapActionType.SetZoomMotionQueue:
            nextState.zoomMotionQueue = action.payload.zoomMotionQueue;
            return nextState;
        case TilemapActionType.SetIsCameraDragging:
            nextState.isCameraDragging = action.payload.isCameraDragging;
            return nextState;
        
        default:
            return state;
    }
}