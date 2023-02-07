import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tilemap } from '../components/Tilemap/Tilemap';
import { getFullfilledSchema } from './__MapGenerator__';
import { SpriteName, spritesDefinition } from './__Sprites__';
import { useTilemapContext } from '../hooks/useTilemapContext';
import { TilePosition } from '../types/TilePosition';
import { ContextProvider } from '../components/ContextProvider/ContextProvider';

const wrapperStyle: React.CSSProperties = {
  width: '100%',
  height: '700px',
};

const rows = 30;
const cols = 50;

const initialSchema = getFullfilledSchema(cols, rows, SpriteName.grass, 3);

interface DemoProps {
  onTileClick: (tilePos: TilePosition) => void;
  onTileRightClick: (tilePos: TilePosition) => void;
}

const Demo = (props: DemoProps) => {
  const { state, computed, actions } = useTilemapContext();

  return (
    <>
      <Tilemap onTileClick={props.onTileClick} onTileContextMenu={props.onTileRightClick} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <button
          onClick={() => {
            actions.setZoom(0);
          }}
        >
          Reset zoom
        </button>
        <button
          onClick={() => {
            actions.setCameraPosition({ x: 0, y: 0 });
          }}
        >
          Center camera
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'flex-start',
        }}
      >
        <label>Current Zoom: {state.zoom}</label>
        <label>Tile size: {computed.tileSize}</label>
        <label>Camera X: {state.cameraPosition?.x}</label>
        <label>Camera Y: {state.cameraPosition?.y}</label>
      </div>
    </>
  );
};

storiesOf('Tilemap', module)
  .addDecorator((storyFn) => <div style={wrapperStyle}>{storyFn()}</div>)
  .add('Demo 1', () => {
    const [schema, setSchema] = React.useState(initialSchema);

    const onTileClick = (tilePos: TilePosition) => {
      console.log(tilePos);
      const newSchema = [...schema];
      const tile = newSchema[tilePos.col][tilePos.row];
      if (tile) {
        const layer = tile[1];
        if (layer) {
          tile[1] = '';
        } else {
          tile[1] = SpriteName.building;
        }
      }
      setSchema(newSchema);
    };

    const onTileRightClick = (tilePos: TilePosition) => {
      console.log(tilePos);
      const newSchema = [...schema];
      const tile = newSchema[tilePos.col][tilePos.row];
      if (tile) {
        const layer = tile[2];
        if (layer) {
          tile[2] = '';
        } else {
          tile[2] = SpriteName.armyIdle;
        }
      }
      setSchema(newSchema);
    };

    return (
      <ContextProvider spriteDefinition={spritesDefinition} tilmapSchema={schema}>
        <Demo onTileClick={onTileClick} onTileRightClick={onTileRightClick} />
      </ContextProvider>
    );
  });
