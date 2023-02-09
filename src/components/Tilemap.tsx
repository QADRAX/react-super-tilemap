import React, { FunctionComponent, useReducer } from 'react';
import { InternalTilemapContext } from '../Context/InternalTilemapContext';
import { initialState, PublicTilemapContext } from '../Context/TilemapContext';
import { tilemapReducer } from '../Context/TilemapContext.reducer';
import { TilemapProps } from '../types/Tilemap';
import { useTilemapActions } from './Tilemap.useTilemapActions';
import { useCameraMotions } from './Tilemap.useCameraMotions';
import { useComputedValues } from './Tilmeap.useComputedValues';
import { useCameraRecenter } from './Tilemap.useCameraRecenter';
import { useSpriteLoader } from './Tilemap.useSpriteLoader';
import { useZoomMotions } from './Tilemap.useZoomMotions';
import { CameraMotionManager } from './MotionManager/CameraMotionManager';
import { ZoomMotionManager } from './MotionManager/ZoomMotionManager';

/**
 * Tilemap main component.
 *
 * @public
 *
 * @param props
 */
export const Tilemap: FunctionComponent<TilemapProps> = (props) => {
  // Context Reducer

  const [state, dispatch] = useReducer(tilemapReducer, initialState);

  // Load sprites from the sprite definition

  useSpriteLoader(dispatch, props.spriteDefinition, props.onSpritesLoadError);

  // Computed values from the context state

  const computed = useComputedValues(state, props);

  // Context actions

  const actions = useTilemapActions(dispatch, computed, state);

  // Sync camera motions

  const endCameraMotion = useCameraMotions(dispatch, state, computed, props.onCameraMotionEnd);

  // Sync zoom motions

  const endZoomMotion = useZoomMotions(dispatch, state, props.onZoomMotionEnd);

  // Recenter on resize

  useCameraRecenter(computed.isResizing, computed.cameraTilePosition, actions, props.recenterCameraOnResize);

  // Recenter after zoom

  useCameraRecenter(computed.isZooming, computed.cameraTilePosition, actions, props.recenterCameraOnZoom);

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
