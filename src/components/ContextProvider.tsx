import React, { FunctionComponent, useReducer } from 'react';
import { InternalTilemapContext } from '../Context/InternalTilemapContext';
import { initialState, PublicTilemapContext } from '../Context/TilemapContext';
import { tilemapReducer } from '../Context/TilemapContext.reducer';
import { TilemapProps } from '../types/TilemapContextProvider';
import { useTilemapContextActions } from './ContextProvider.actions';
import { useCameraMotions } from './ContextProvider.cameraMotions';
import { useComputedTilemapState } from './ContextProvider.computed';
import { useCameraRecenter } from './ContextProvider.recenter';
import { useSpriteLoader } from './ContextProvider.spriteLoader';
import { useZoomMotions } from './ContextProvider.zoomMotions';
import { CameraMotionManager } from './MotionManager/CameraMotionManager';
import { ZoomMotionManager } from './MotionManager/ZoomMotionManager';

/**
 * Tilemap's context provider
 *
 * @public
 *
 * @param props
 * @returns Context provider for the tilemap
 */
export const ContextProvider: FunctionComponent<TilemapProps> = (props) => {
  // Context Reducer

  const [state, dispatch] = useReducer(tilemapReducer, initialState);

  // Load sprites from the sprite definition

  useSpriteLoader(dispatch, props.spriteDefinition, props.onSpritesLoadError);

  // Computed values from the context state

  const computed = useComputedTilemapState(state, props);

  // Context actions

  const actions = useTilemapContextActions(dispatch, computed, state);

  // Sync camera motions

  const endCameraMotion = useCameraMotions(dispatch, state, computed, props.onCameraMotionEnd);

  // Sync zoom motions

  const endZoomMotion = useZoomMotions(dispatch, state, props.onZoomMotionEnd);

  // Recenter on resize

  useCameraRecenter(computed.isResizing, computed.cameraCenteredTilePosition, actions, props.recenterCameraOnResize);

  // Recenter after zoom

  useCameraRecenter(computed.isZooming, computed.cameraCenteredTilePosition, actions, props.recenterCameraOnZoom);

  return (
    <PublicTilemapContext.Provider value={{ state, computed, actions, props }}>
      <InternalTilemapContext.Provider value={{ dispatch }}>
        <CameraMotionManager onMotionEnd={endCameraMotion} />
        <ZoomMotionManager onMotionEnd={endZoomMotion} />
        {props.children}
      </InternalTilemapContext.Provider>
    </PublicTilemapContext.Provider>
  );
};
