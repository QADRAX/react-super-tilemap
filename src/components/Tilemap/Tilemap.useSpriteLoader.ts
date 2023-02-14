import React, { useEffect } from 'react';
import {
  TilemapActions,
  _setIsSpriteMapLoading,
  _setSpriteMap,
} from '../../Context/TilemapContext.actions';
import { usePromise } from '../../hooks/usePromise';
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
  const [spriteMap, error, isLoading] = usePromise(
    async () => await loadSprites(spriteDefinition),
    undefined,
    [spriteDefinition]
  );

  useEffect(() => {
    if (error && onSpritesLoadError) {
      onSpritesLoadError(error);
    }
  }, [error, onSpritesLoadError]);

  useEffect(() => {
    dispatch(_setIsSpriteMapLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    dispatch(_setSpriteMap(spriteMap));
  }, [spriteMap, dispatch]);
}
