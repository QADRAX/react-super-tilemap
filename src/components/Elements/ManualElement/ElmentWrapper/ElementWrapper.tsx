import React, { FunctionComponent, useMemo } from "react";
import { TilePosition } from "../../../../types/TilePosition";
import { getAbsolutePosition } from "../../../../utils/positions";
import { useTilemapContext } from "../../../Tilemap/TilemapContext/useTilemapContext";

export type ElementWrapperProps = {
    tilePosition: TilePosition;
}

/**
 * Wrapper for elements that are positioned in the tilemap.
 * it will calculate the absolute position of the element and it will render childrens.
 * @param props 
 */
export const ElementWrapper: FunctionComponent<ElementWrapperProps> = (props) => {
    const { computed } = useTilemapContext();

    const {
        tilePosition,
    } = props;

    const {
        tileSize,
        cameraAbsolutePosition,
    } = computed;

    const absolutePosition = useMemo(() => {
        if (!cameraAbsolutePosition) {
            return null;
        }
        const result = getAbsolutePosition(tilePosition, cameraAbsolutePosition, tileSize);
        return result;
    }, [
        cameraAbsolutePosition,
        tileSize,
        tilePosition,
    ]);

    if(!absolutePosition || !props.children) {
        return null;
    }

    const wrapperStyle = {
        position: 'absolute',
        left: absolutePosition.x,
        top: absolutePosition.y,
        width: `${tileSize}px`,
        height: `${tileSize}px`,
        '--tile-size': `${tileSize}px`,
    } as React.CSSProperties;

    return (
        <div style={wrapperStyle}>
            {props.children}
        </div>
    );
}