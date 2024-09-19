import React, { FunctionComponent, useEffect } from 'react';
import { ThirdPersonCamera, Tilemap } from '../../../components';
import { defaulThridPersonCameraArgs, defaultTilemapArgs } from '../../__defaultArgs__';
import { getFullfilledSchema } from '../../__MapGenerator__';
import { Position } from '../../../types/Position';

export type DemoClickableTilemapProps = {
  rows: number;
  cols: number;
  baseSprite: string;
  spriteToAdd: string;
  onTileClick: (position: Position) => void;
};

export const DemoClickableTilemap: FunctionComponent<DemoClickableTilemapProps> = (props) => {
  const initialSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 2);
  const [schema, setSchema] = React.useState(initialSchema);

  useEffect(() => {
    const newSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 2);
    setSchema(newSchema);
  }, [props.cols, props.rows, props.baseSprite]);

  const handleTileClick = (tilePos: Position) => {
    console.log(tilePos)
    const newSchema = [...schema];
    const tile = newSchema[tilePos.y][tilePos.x];
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
