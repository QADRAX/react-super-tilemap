import React, { useEffect } from 'react';
import {
  TilemapActions,
  _setIsSpriteMapLoading,
  _setSpriteMap,
} from '../../Context/TilemapContext.actions';
import { usePromise } from '../../hooks/usePromise';
import { Sprite } from '../../classes/Sprite';
import { SpriteDefinition } from '../../types/SpriteDefinition';

/**
 * Load sprites by given sprites definition.
 *
 * Dispatch the result to the context and throw errors if the sprites cannot be loaded.
 *
 * @param props
 * @param dispatch
 */
export function useSpriteLoader(
  dispatch: React.Dispatch<TilemapActions>,
  spriteDefinition: SpriteDefinition[],
  onSpritesLoadError?: (error: Error) => void
): void {
  const [spriteMap, error, isLoading] = usePromise(
    async () => {
      const spriteMap = await Sprite.loadSprites(spriteDefinition);
      return spriteMap;
    },
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
