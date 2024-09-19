import React, { useEffect } from 'react';
import { FunctionComponent } from 'react';
import { ThirdPersonCamera, Tilemap, useThirdPersonCameraContext } from '../../../components';
import { EasingType } from '../../../types/EasingType';
import { MotionSettings } from '../../../types/Motions';
import { SpriteDefinition } from '../../../types/SpriteDefinition';
import { grass, mountain } from '../../__Sprites__';
import { Position } from '../../../types/Position';

export type DemoThirdPersonCameraContextProps = {
  cameraMotionEasingType: EasingType;
  cameraMotionSpeed: number;
  cameraMotionMinDuration?: number;
  cameraMotionMaxDuration?: number;
  zoomMotionEasingType: EasingType;
  zoomMotionSpeed: number;
  zoomMotionMinDuration?: number;
  zoomMotionMaxDuration?: number;
};

const sprites: SpriteDefinition[] = [
  {
    key: 'grass',
    imagesSrc: [grass],
  },
  {
    key: 'mountain',
    imagesSrc: [mountain],
  },
];

const scheme: string[][][] = [
  [['grass'], ['grass'], ['grass']],
  [['grass'], ['mountain'], ['grass']],
  [['grass'], ['grass'], ['grass']],
];

const initialZoom = 20;

const ContextButtons = (props: {
  focusedTile: Position | null;
  cameraMotionEasingType: EasingType;
  cameraMotionSpeed: number;
  cameraMotionMinDuration?: number;
  cameraMotionMaxDuration?: number;
  zoomMotionEasingType: EasingType;
  zoomMotionSpeed: number;
  zoomMotionMinDuration?: number;
  zoomMotionMaxDuration?: number;
}) => {
  const { zoom, addCameraMotion, addZoomMotion } = useThirdPersonCameraContext();

  const cameraMotion: MotionSettings = {
    speed: props.cameraMotionSpeed,
    maxDuration: props.cameraMotionMaxDuration,
    minDuration: props.cameraMotionMinDuration,
    easing: props.cameraMotionEasingType,
  };

  const zoomMotion: MotionSettings = {
    speed: props.zoomMotionSpeed,
    maxDuration: props.zoomMotionMaxDuration,
    minDuration: props.zoomMotionMinDuration,
    easing: props.zoomMotionEasingType,
  };

  useEffect(() => {
    if (props.focusedTile) {
      addCameraMotion(cameraMotion, props.focusedTile);
    }
  }, [props.focusedTile]); // eslint-disable-line react-hooks/exhaustive-deps

  const centerCamera = () => {
    addCameraMotion(cameraMotion, 'center');
  };

  const resetZoom = () => {
    addZoomMotion(zoomMotion, initialZoom);
  };

  const zoomIn = () => {
    addZoomMotion(zoomMotion, zoom + 5);
  };

  const zoomOut = () => {
    addZoomMotion(zoomMotion, zoom - 5);
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          centerCamera();
        }}
      >
        Center camera
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          resetZoom();
        }}
      >
        Reset Zoom
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          resetZoom();
          centerCamera();
        }}
      >
        Reset all
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          zoomIn();
        }}
      >
        ZoomIn
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          zoomOut();
        }}
      >
        ZoomOut
      </button>
    </>
  );
};

export const DemoThirdPersonCameraContext: FunctionComponent<DemoThirdPersonCameraContextProps> = (
  props
) => {
  const [focusedTile, setFocusedTile] = React.useState<Position | null>(null);

  const handleTileClick = (tilePos: Position) => {
    setFocusedTile(tilePos);
  };

  return (
    <Tilemap spriteDefinition={sprites} tilmapScheme={scheme} onTileClick={handleTileClick}>
      <ThirdPersonCamera
        initialZoom={initialZoom}
        draggable
        zoomeable
        recenterCameraOnResize={{
          settings: {
            speed: props.cameraMotionSpeed,
            maxDuration: props.cameraMotionMaxDuration,
            minDuration: props.cameraMotionMinDuration,
            easing: props.cameraMotionEasingType,
          },
          target: 'center',
        }}
      >
        <ContextButtons
          focusedTile={focusedTile}
          cameraMotionEasingType={props.cameraMotionEasingType}
          cameraMotionSpeed={props.cameraMotionSpeed}
          cameraMotionMinDuration={props.cameraMotionMinDuration}
          cameraMotionMaxDuration={props.cameraMotionMaxDuration}
          zoomMotionEasingType={props.zoomMotionEasingType}
          zoomMotionSpeed={props.zoomMotionSpeed}
          zoomMotionMinDuration={props.zoomMotionMinDuration}
          zoomMotionMaxDuration={props.zoomMotionMaxDuration}
        />
      </ThirdPersonCamera>
    </Tilemap>
  );
};
