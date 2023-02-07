import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tilemap } from '../components/Tilemap/Tilemap';
import { getFullfilledSchema } from './__MapGenerator__';
import { SpriteName, spritesDefinition } from './__Sprites__';
import { useTilemapContext } from '../hooks/useTilemapContext';
import { TilePosition } from '../types/TilePosition';
import { ContextProvider } from '../components/ContextProvider/ContextProvider';
import { MotionSettings, ResizeCameraMotion } from '../types/Motions';

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
  easing: 'easeOutElastic',
  maxDuration: 1,
};

const recenterCameraOnResizeSettings: ResizeCameraMotion = {
  settings: motionSettings,
  type: 'center',
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

  return (
    <>
      <Tilemap
        onTileClick={props.onTileClick}
        onTileContextMenu={props.onTileRightClick}
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
            actions.setCurrentZoom(0);
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
            actions.centerCameraOnTilePosition({ col: 24, row: 14 });
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
            const tilePos: TilePosition = {
              col: 0,
              row: 0,
            };
            actions.addCameraMotionCenteredOnTilePosition(motionSettings, tilePos);
          }}
        >
          Camera motion to 0,0
        </button>
        <button
          onClick={() => {
            actions.addCameraMotionCentered(motionSettings);
          }}
        >
          Camera motion to center
        </button>
        <button
          onClick={() => {
            actions.addZoomMotion(zoomMotionSettings, 17);
          }}
        >
          Apply Zoom motion to 17
        </button>
        <button
          onClick={() => {
            actions.addZoomMotion(zoomMotionSettings, 0);
          }}
        >
          Apply Zoom motion to 0
        </button>
        <button
          onClick={() => {
            actions.addZoomMotion(zoomMotionSettings, 0);
            window.setTimeout(() => actions.addCameraMotionCentered(motionSettings));
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
        <label>Camera centered on tile COL: {computed.cameraCenteredTilePosition?.col}</label>
        <label>Camera centered on tile ROW: {computed.cameraCenteredTilePosition?.row}</label>
        <label>Is camera dragging: {state.isCameraDragging ? 'true' : 'false'}</label>
        <label>Is camera in motion: {computed.isCameraInMotion ? 'true' : 'false'}</label>
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
      >
        <Demo onTileClick={onTileClick} onTileRightClick={onTileRightClick} />
      </ContextProvider>
    );
  });
