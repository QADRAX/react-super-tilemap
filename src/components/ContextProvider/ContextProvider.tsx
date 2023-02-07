import React, { FunctionComponent, useMemo, useReducer } from 'react';
import { DEFAULT_TILE_SIZE } from '../../constants';
import { InternalTilemapContext } from '../../Context/InternalTilemapContext';
import { initialState, PublicTilemapContext } from '../../Context/TilemapContext';
import { tilemapReducer } from '../../Context/TilemapContext.reducer';
import { ContextProps } from '../../types/TilemapContext';
import { TilemapContextProviderProps } from '../../types/TilemapContextProvider';
import { useTilemapContextActions } from './ContextProvider.actions';
import { useCameraMotions } from './ContextProvider.cameraMotions';
import { useComputedTilemapState } from './ContextProvider.computed';
import { useCameraRecenterOnResize } from './ContextProvider.recenter';
import { useSpriteLoader } from './ContextProvider.spriteLoader';
import { CameraMotionManager } from './MotionManager/CameraMotionManager';

/**
 * Tilemap's context provider
 *
 * @public
 *
 * @param props
 * @returns Context provider for the tilemap
 */
export const ContextProvider: FunctionComponent<TilemapContextProviderProps> = (props) => {
  // Context Reducer

  const [state, dispatch] = useReducer(tilemapReducer, initialState);

  // Context props

  const contextProps = useMemo(() => {
    const contextProps: ContextProps = {
      defaultTileSizePx: props.defaultTileSizePx || DEFAULT_TILE_SIZE,
      spriteSchema: props.schema,
    };

    return contextProps;
  }, [props.defaultTileSizePx, props.schema]);

  // Load sprites from the sprite definition

  useSpriteLoader(dispatch, props.sprites, props.onSpritesLoadError);

  // Computed values from the context state

  const computed = useComputedTilemapState(state, contextProps);

  // Context actions

  const actions = useTilemapContextActions(dispatch, computed, state);

  // Sync camera motions

  const onCameraMotionEnd = useCameraMotions(dispatch, state, props.onCameraMotionEnd);

  // Recenter on resize

  useCameraRecenterOnResize(computed, actions, props.recenterCameraOnResize);

  return (
    <PublicTilemapContext.Provider value={{ state, computed, actions, props: contextProps }}>
      <InternalTilemapContext.Provider value={{ dispatch }}>
        <CameraMotionManager onMotionEnd={onCameraMotionEnd} />
        {props.children}
      </InternalTilemapContext.Provider>
    </PublicTilemapContext.Provider>
  );
};
