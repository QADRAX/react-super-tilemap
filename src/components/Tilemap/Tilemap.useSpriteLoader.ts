import React, { useEffect } from 'react';
import {
  TilemapActions,
  _setIsSpriteMapLoading,
  _setSpriteMap,
} from '../../Context/TilemapContext.actions';
import { SpriteDefinition } from '../../types/SpriteDefinition';
import { loadSprites } from '../../utils/loadSprites';

/**
 * Load sprites by given sprites definition.
 *
 * Dispatch the result to the context and throw errors if the sprites cannot be loaded.
 * 
 * @private
 * 
 * @param dispatch context dispatch
 * @param spriteDefinition sprites definition
 * @param onSpritesLoadError callback to advise the consumer that the sprites cannot be loaded
 */
export function useSpriteLoader(
  dispatch: React.Dispatch<TilemapActions>,
  spriteDefinition?: SpriteDefinition[],
  onSpritesLoadError?: (error: Error) => void
): void {

  useEffect(() => {
    dispatch(_setSpriteMap(undefined));
    (async () => {
      if (spriteDefinition) {
        dispatch(_setIsSpriteMapLoading(true));
        try {
          const spriteMap = await loadSprites(spriteDefinition);
          dispatch(_setSpriteMap(spriteMap));
        } catch (error) {
          if (onSpritesLoadError) {
            onSpritesLoadError(error as Error);
          }
        }
        dispatch(_setIsSpriteMapLoading(false));
      }
    })();
  }, [spriteDefinition]); // eslint-disable-line react-hooks/exhaustive-dep
}
