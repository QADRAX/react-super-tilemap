import React, { FunctionComponent, useEffect } from "react";
import { ThirdPersonCamera, Tilemap } from "../../../components";
import { TilePosition } from "../../../types/TilePosition";
import { defaulThridPersonCameraArgs, defaultTilemapArgs } from "../../__defaultArgs__";
import { getFullfilledSchema } from "../../__MapGenerator__";

export type DemoClickableTilemapProps = {
    rows: number;
    cols: number;
    baseSprite: string;
    spriteToAdd: string;
    onTileClick: (position: TilePosition) => void;
}

export const DemoClickableTilemap: FunctionComponent<DemoClickableTilemapProps> = (props) => {
    const initialSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 2);
    const [schema, setSchema] = React.useState(initialSchema);

    useEffect(() => {
        const newSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 2);
        setSchema(newSchema);
    }, [props.cols, props.rows, props.baseSprite]);

    const handleTileClick = (tilePos: TilePosition) => {
        const newSchema = [...schema];
        const tile = newSchema[tilePos.col][tilePos.row];
        if (tile) {
            const layer = tile[1];
            if (layer) {
                tile[1] = '';
            } else {
                tile[1] = props.spriteToAdd;
            }
        }
        setSchema(newSchema);
    };

    return (
        <Tilemap {...defaultTilemapArgs} tilmapScheme={schema} onTileClick={handleTileClick}>
            <ThirdPersonCamera {...defaulThridPersonCameraArgs} />
        </Tilemap>
    );
};