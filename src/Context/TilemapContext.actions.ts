import { SpriteMap } from '../classes/Sprite';
import { CameraMotion, CameraMotionRequest, ZoomMotion, ZoomMotionRequest } from '../types/Motions';
import { Position } from '../types/Position';
import { Size } from '../types/Size';

// Action types

export enum TilemapActionType {
  SetCameraPosition,
  SetCurrentZoom,
  SetSpriteMap,
  SetIsSpriteMapLoading,
  SetCurrentCameraMotion,
  SetCurrentZoomMotion,
  SetCanvasSize,
  SetCameraMotionQueue,
  SetZoomMotionQueue,
  SetIsCameraDragging,
}

// Action interfaces

export interface SetCameraPosition {
  type: TilemapActionType.SetCameraPosition;
  payload: {
    position?: Position;
  };
}

export interface SetCurrentZoom {
  type: TilemapActionType.SetCurrentZoom;
  payload: {
    zoom: number;
  };
}

export interface SetSpriteMap {
  type: TilemapActionType.SetSpriteMap;
  payload: {
    spriteMap?: SpriteMap;
  };
}

export interface SetIsSpriteMapLoading {
  type: TilemapActionType.SetIsSpriteMapLoading;
  payload: {
    isSpriteMapLoading: boolean;
  };
}

export interface SetCurrentCameraMotion {
  type: TilemapActionType.SetCurrentCameraMotion;
  payload: {
    currentCameraMotion?: CameraMotion;
  };
}

export interface SetCurrentZoomMotion {
  type: TilemapActionType.SetCurrentZoomMotion;
  payload: {
    currentZoomMotion?: ZoomMotion;
  };
}

export interface SetCanvasSize {
  type: TilemapActionType.SetCanvasSize;
  payload: {
    canvasSize?: Size;
  };
}

export interface SetCameraMotionQueue {
  type: TilemapActionType.SetCameraMotionQueue;
  payload: {
    cameraMotionQueue: CameraMotionRequest[];
  };
}

export interface SetZoomMotionQueue {
  type: TilemapActionType.SetZoomMotionQueue;
  payload: {
    zoomMotionQueue: ZoomMotionRequest[];
  };
}

export interface SetIsCameraDragging {
  type: TilemapActionType.SetIsCameraDragging;
  payload: {
    isCameraDragging: boolean;
  };
}

// Actions

export type TilemapActions =
  | SetCameraPosition
  | SetCurrentZoom
  | SetSpriteMap
  | SetIsSpriteMapLoading
  | SetCurrentCameraMotion
  | SetCurrentZoomMotion
  | SetCanvasSize
  | SetCameraMotionQueue
  | SetZoomMotionQueue
  | SetIsCameraDragging;

// Action creators

export const _setCameraPosition = (position?: Position): SetCameraPosition => ({
  type: TilemapActionType.SetCameraPosition,
  payload: {
    position,
  },
});

export const _setCurrentZoom = (zoom: number): SetCurrentZoom => ({
  type: TilemapActionType.SetCurrentZoom,
  payload: {
    zoom,
  },
});

export const _setSpriteMap = (spriteMap?: SpriteMap): SetSpriteMap => ({
  type: TilemapActionType.SetSpriteMap,
  payload: {
    spriteMap,
  },
});

export const _setIsSpriteMapLoading = (isSpriteMapLoading: boolean): SetIsSpriteMapLoading => ({
  type: TilemapActionType.SetIsSpriteMapLoading,
  payload: {
    isSpriteMapLoading,
  },
});

export const _setCurrentCameraMotion = (
  currentCameraMotion?: CameraMotion
): SetCurrentCameraMotion => ({
  type: TilemapActionType.SetCurrentCameraMotion,
  payload: {
    currentCameraMotion,
  },
});

export const _setCurrentZoomMotion = (currentZoomMotion?: ZoomMotion): SetCurrentZoomMotion => ({
  type: TilemapActionType.SetCurrentZoomMotion,
  payload: {
    currentZoomMotion,
  },
});

export const _setCanvasSize = (canvasSize?: Size): SetCanvasSize => ({
  type: TilemapActionType.SetCanvasSize,
  payload: {
    canvasSize,
  },
});

export const _setCameraMotionQueue = (
  cameraMotionQueue: CameraMotionRequest[]
): SetCameraMotionQueue => ({
  type: TilemapActionType.SetCameraMotionQueue,
  payload: {
    cameraMotionQueue,
  },
});

export const _setZoomMotionQueue = (zoomMotionQueue: ZoomMotionRequest[]): SetZoomMotionQueue => ({
  type: TilemapActionType.SetZoomMotionQueue,
  payload: {
    zoomMotionQueue,
  },
});

export const _setIsCameraDragging = (isCameraDragging: boolean): SetIsCameraDragging => ({
  type: TilemapActionType.SetIsCameraDragging,
  payload: {
    isCameraDragging,
  },
});
