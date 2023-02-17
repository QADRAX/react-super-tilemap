import { Position } from '../../../types/Position';
import { Size } from '../../../types/Size';
import { SpriteMap } from '../../../types/Sprite';
import { TilemapElementMap } from '../../../types/TilemapElement';

// Action types

export enum TilemapActionType {
  SetCameraPosition,
  SetCurrentZoom,
  SetSpriteMap,
  SetIsSpriteMapLoading,
  SetCanvasSize,
  SetElementMap,
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

export interface SetCanvasSize {
  type: TilemapActionType.SetCanvasSize;
  payload: {
    canvasSize?: Size;
  };
}

export interface SetElementMap {
  type: TilemapActionType.SetElementMap;
  payload: {
    elementMap: TilemapElementMap;
  };
}


// Actions

export type TilemapActions =
  | SetCameraPosition
  | SetCurrentZoom
  | SetSpriteMap
  | SetIsSpriteMapLoading
  | SetCanvasSize
  | SetElementMap;

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

export const _setCanvasSize = (canvasSize?: Size): SetCanvasSize => ({
  type: TilemapActionType.SetCanvasSize,
  payload: {
    canvasSize,
  },
});

export const _setElementMap = (elementMap: TilemapElementMap): SetElementMap => ({
  type: TilemapActionType.SetElementMap,
  payload: {
    elementMap,
  },
});
