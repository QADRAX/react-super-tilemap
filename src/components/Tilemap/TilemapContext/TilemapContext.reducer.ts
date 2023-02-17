import { ContextState } from '../../../types/TilemapContext';
import { TilemapActions, TilemapActionType } from './TilemapContext.actions';

export function tilemapReducer(state: ContextState, action: TilemapActions): ContextState {
  const nextState = { ...state };

  switch (action.type) {
    case TilemapActionType.SetCameraPosition:
      nextState.cameraPosition = action.payload.position;
      return nextState;
    case TilemapActionType.SetCurrentZoom:
      nextState.zoom = action.payload.zoom;
      return nextState;
    case TilemapActionType.SetSpriteMap:
      nextState.spriteMap = action.payload.spriteMap;
      return nextState;
    case TilemapActionType.SetIsSpriteMapLoading:
      nextState.isSpriteMapLoading = action.payload.isSpriteMapLoading;
      return nextState;
    case TilemapActionType.SetCanvasSize:
      nextState.canvasSize = action.payload.canvasSize;
      return nextState;
    case TilemapActionType.SetElementMap:
      nextState.elementMap = action.payload.elementMap;
      return nextState;

    default:
      return state;
  }
}
