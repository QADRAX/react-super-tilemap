import React, { FunctionComponent, useReducer } from 'react';
import { initialState, PublicTilemapContext } from '../../Context/TilemapContext';
import { tilemapReducer } from '../../Context/TilemapContext.reducer';
import { TilemapProps } from '../../types/Tilemap';
import { useTilemapActions } from './Tilemap.useTilemapActions';
import { useComputedValues } from './Tilmeap.useComputedValues';
import { useSpriteLoader } from './Tilemap.useSpriteLoader';
import { TilemapDisplay } from './TilemapDisplay/TilemapDisplay';

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

  return (
    <PublicTilemapContext.Provider value={{ state, computed, actions, props }}>
        <TilemapDisplay>
          {props.children}
        </TilemapDisplay>
    </PublicTilemapContext.Provider>
  );
};