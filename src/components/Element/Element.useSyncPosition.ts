import { useEffect } from "react";
import { TilemapElement } from "../../types/TilemapElement";
import { useTilemapContext } from "../Tilemap/TilemapContext/useTilemapContext";

export function useSyncPosition(
    tilemapElement: TilemapElement,
    key: string,
) {
    const { actions } = useTilemapContext();

    const {
        setTilemapElement
    } = actions;

    useEffect(() => {
        setTilemapElement(key, tilemapElement);
    }, [tilemapElement, key]); // eslint-disable-line react-hooks/exhaustive-deps
}