import React from 'react';
import { storiesOf } from '@storybook/react';
import { TilemapDisplay } from '../components/Tilemap/TilemapDisplay';
import { getFullfilledSchema } from './__MapGenerator__';
import { SpriteName, spritesDefinition } from './__Sprites__';
import { useTilemapContext } from '../hooks/useTilemapContext';
import { TilePosition } from '../types/TilePosition';
import { ContextProvider } from '../components/ContextProvider/ContextProvider';
import { MotionSettings, RecenterCameraMotion } from '../types/Motions';

const wrapperStyle: React.CSSProperties = {
  width: '100%',
  height: '500px',
};

const motionSettings: MotionSettings = {
  speed: 0.1,
  easing: 'easeOutElastic',
  maxDuration: 1,
};

const zoomMotionSettings: MotionSettings = {
  speed: 0.01,
  easing: 'easeOutBounce',
  maxDuration: 1,
};

const recenterCameraOnResizeSettings: RecenterCameraMotion = {
  settings: motionSettings,
  target: 'center',
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

  const [zoomeable, setZoomeable] = React.useState(true);
  const [draggable, setDraggable] = React.useState(true);
  const [isZoomeableIntervalActive, setIsZoomeableIntervalActive] = React.useState(false);
  const [isDraggableIntervalActive, setIsDraggableIntervalActive] = React.useState(false);

  React.useEffect(() => {
    let intervalId: number | undefined;
    if (isZoomeableIntervalActive) {
      intervalId = window.setInterval(() => {
        setZoomeable(!zoomeable);
      }, 2000);
    }
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isZoomeableIntervalActive, zoomeable]);

  React.useEffect(() => {
    let intervalId: number | undefined;
    if (isDraggableIntervalActive) {
      intervalId = window.setInterval(() => {
        setDraggable(!draggable);
      }, 2000);
    }
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isDraggableIntervalActive, draggable]);

  const onDoubleClick = (tilePos: TilePosition) => {
    actions.addCameraMotion(motionSettings, tilePos);
  };

  return (
    <>
      <TilemapDisplay
        onTileClick={props.onTileClick}
        onTileContextMenu={onDoubleClick}
        onTileDoubleClick={props.onTileRightClick}
        zoomeable={zoomeable}
        draggable={draggable}
      />
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
          Set camera position to 0,0
        </button>
        <button
          onClick={() => {
            actions.setCameraTilePosition({ col: 24, row: 14 });
          }}
        >
          Center the camera at col 24, row 14
        </button>
        <button
          onClick={() => {
            actions.centerCamera();
          }}
        >
          Center the camera
        </button>
        <button
          onClick={() => {
            setIsZoomeableIntervalActive(!isZoomeableIntervalActive);
          }}
        >
          Toggle zoomeable
        </button>
        <button
          onClick={() => {
            setIsDraggableIntervalActive(!isDraggableIntervalActive);
          }}
        >
          Toggle draggable
        </button>
        <button
          onClick={() => {
            actions.addCameraMotion(motionSettings, { col: 0, row: 0 });
          }}
        >
          Camera motion to 0,0
        </button>
        <button
          onClick={() => {
            actions.addCameraMotion(motionSettings, 'center');
          }}
        >
          Camera motion to center
        </button>
        <button
          onClick={() => {
            actions.addZoomMotion(zoomMotionSettings, state.zoom + 4);
          }}
        >
          Apply Zoom motion + 4
        </button>
        <button
          onClick={() => {
            actions.addZoomMotion(zoomMotionSettings, state.zoom - 2);
          }}
        >
          Apply Zoom motion to - 2
        </button>
        <button
          onClick={() => {
            actions.addZoomMotion(zoomMotionSettings, 1);
            actions.addCameraMotion(motionSettings, 'center')
          }}
        >
          Reset Zoom motion to 0
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
        <label>Camera absolute position X: {state.cameraPosition?.x}</label>
        <label>Camera absolute position Y: {state.cameraPosition?.y}</label>
        <label>Is resizing: {computed.isResizing ? 'true' : 'false'}</label>
        <label>Viewport width: {state.canvasSize?.width}</label>
        <label>Viewport height: {state.canvasSize?.height}</label>
        <label>Camera centered on tile COL: {computed.cameraTilePosition?.col}</label>
        <label>Camera centered on tile ROW: {computed.cameraTilePosition?.row}</label>
        <label>Is camera dragging: {state.isCameraDragging ? 'true' : 'false'}</label>
        <label>Is camera in motion: {computed.isCameraInMotion ? 'true' : 'false'}</label>
        <label>Is zoom in zooming: {computed.isZooming ? 'true' : 'false'}</label>
        <label>Is zoom in motion: {computed.isZoomInMotion ? 'true' : 'false'}</label>
        <label>
          Zoomeable: {zoomeable ? 'true' : 'false'}{' '}
          {isZoomeableIntervalActive && 'switching every 2s'}
        </label>
        <label>
          Draggable: {draggable ? 'true' : 'false'}{' '}
          {isDraggableIntervalActive && 'switching every 2s'}
        </label>
      </div>
    </>
  );
};

storiesOf('Tilemap: zoomeable & dragable', module)
  .addDecorator((storyFn) => <div style={wrapperStyle}>{storyFn()}</div>)
  .add('Disabling zoom & drag using intervals', () => {
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
      <ContextProvider
        spriteDefinition={spritesDefinition}
        tilmapSchema={schema}
        recenterCameraOnResize={recenterCameraOnResizeSettings}
        recenterCameraOnZoom={undefined}
      >
        <Demo onTileClick={onTileClick} onTileRightClick={onTileRightClick} />
      </ContextProvider>
    );
  });
