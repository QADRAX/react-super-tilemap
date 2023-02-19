import React, { useEffect } from 'react';
import {
  TilemapActions,
  _setIsSpriteMapLoading,
  _setSpriteMap,
} from './TilemapContext/TilemapContext.actions';
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
    let isMounted = true;
    dispatch(_setSpriteMap(undefined));

    if (spriteDefinition) {
      dispatch(_setIsSpriteMapLoading(true));

      loadSprites(spriteDefinition)
        .then((spriteMap) => {
          if (isMounted) {
            dispatch(_setSpriteMap(spriteMap));
          }
        })
        .catch((error) => {
          if (onSpritesLoadError && isMounted) {
            onSpritesLoadError(error as Error);
          }
        })
        .finally(() => {
          if (isMounted) {
            dispatch(_setIsSpriteMapLoading(false));
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [spriteDefinition]); // eslint-disable-line react-hooks/exhaustive-deps
}
