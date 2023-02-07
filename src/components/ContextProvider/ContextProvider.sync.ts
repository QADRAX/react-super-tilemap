import React, { useEffect } from "react";
import { TilemapActions, _setDefaultTileSizePx, _setIsSpriteMapLoading, _setSpriteMap, _setSpriteSchema } from "../../Context/TilemapContext.actions";
import { usePromise } from "../../hooks/usePromise";
import { Sprite } from "../../Sprite";
import { TilemapContextProviderProps } from "../../types/TilemapContextProvider";

/**
 * Syncs the ContextProvider props with the tilemap context state.
 * 
 * @param props 
 * @param dispatch 
 */
export function useSyncTilemapContext(
    props: TilemapContextProviderProps, 
    dispatch: React.Dispatch<TilemapActions>
): void {
    const [spriteMap, error, isLoading] = usePromise(
        async () => {
            const spriteMap = await Sprite.loadSprites(props.sprites);
            return spriteMap;
        },
        undefined,
        [props.sprites]
    );

    useEffect(() => {
        if (error && props.onSpritesLoadError) {
            props.onSpritesLoadError(error);
        }
    }, [error]);

    useEffect(() => {
        dispatch(_setIsSpriteMapLoading(isLoading));
    }, [isLoading]);

    useEffect(() => {
        dispatch(_setSpriteMap(spriteMap));
    }, [spriteMap]);

    useEffect(() => {
        dispatch(_setSpriteSchema(props.schema));
    }, [props.schema])

    useEffect(() => {
        const defaultTileSizePx = props.defaultTileSizePx;
        if (defaultTileSizePx && defaultTileSizePx > 0) {
            dispatch(_setDefaultTileSizePx(defaultTileSizePx));
        }
    }, [props.defaultTileSizePx]);
}