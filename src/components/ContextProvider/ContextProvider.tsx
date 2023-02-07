import React, { FunctionComponent, useReducer } from 'react';
import { InternalTilemapContext } from '../../Context/InternalTilemapContext';
import { initialState, PublicTilemapContext } from '../../Context/TilemapContext';
import { _setCameraPosition, _setCurrentZoom, _setDefaultTileSizePx, _setSpriteMap, _setSpriteSchema } from '../../Context/TilemapContext.actions';
import { tilemapReducer } from '../../Context/TilemapContext.reducer';
import { TilemapContextProviderProps } from '../../types/TilemapContextProvider';
import { useTilemapContextActions } from './ContextProvider.actions';
import { syncCameraMotions } from './ContextProvider.cameraMotions';
import { useComputedTilemapState } from './ContextProvider.computed';
import { recenterCameraOnResize } from './ContextProvider.recenter';
import { useSyncTilemapContext } from './ContextProvider.sync';
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

    // Sync context state with props

    useSyncTilemapContext(props, dispatch);

    // Computed values from the context state

    const computed = useComputedTilemapState(state);

    // Context actions

    const actions = useTilemapContextActions(dispatch, computed, state);

    // Sync camera motions

    const onCameraMotionEnd = syncCameraMotions(dispatch, state, props.onCameraMotionEnd);

    // Recenter on resize

    recenterCameraOnResize(state, computed, actions, props.recenterCameraOnResize);

    return (
        <PublicTilemapContext.Provider value={{ state, computed, actions }}>
            <InternalTilemapContext.Provider value={{ dispatch }} >
                <CameraMotionManager onMotionEnd={onCameraMotionEnd} />
                {props.children}
            </InternalTilemapContext.Provider>
        </PublicTilemapContext.Provider>
    );
};