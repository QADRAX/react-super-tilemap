import React, { FunctionComponent, useEffect } from 'react';
import {
  MotionableElement,
  ThirdPersonCamera,
  useThirdPersonCameraContext,
} from '../../../components';
import { Tilemap } from '../../../components/Tilemap/Tilemap';
import { EasingType } from '../../../types/EasingType';
import { floorTilePosition } from '../../../utils/positions';
import { defaulThridPersonCameraArgs, defaultTilemapArgs } from '../../__defaultArgs__';
import { getFullfilledSchema } from '../../__MapGenerator__';
import { Position } from '../../../types/Position';

export type DemoFollowCameraPostionProps = {
  rows: number;
  cols: number;
  baseSprite: string;
  elementSprite: string;
  motionSpeed: number;
  easing: EasingType;
  maxDuration?: number;
  minDuration?: number;
  onMotionEnd: () => void;
};

const CameraControl = (props: {
  onCameraPositionChange: (position: Position | undefined) => void;
}) => {
  const { cameraPosition } = useThirdPersonCameraContext();

  useEffect(() => {
    if (!cameraPosition) {
      props.onCameraPositionChange(undefined);
    } else {
      const flooredCameraPosition = floorTilePosition(cameraPosition);
      props.onCameraPositionChange(flooredCameraPosition);
    }
  }, [cameraPosition]);

  return null;
};

export const DemoFollowCameraPostion: FunctionComponent<DemoFollowCameraPostionProps> = (props) => {
  const initialSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 1);
  const [schema, setSchema] = React.useState(initialSchema);
  const [cameraPosition, setCameraPosition] = React.useState<Position | undefined>(undefined);

  useEffect(() => {
    const newSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 1);
    setSchema(newSchema);
  }, [props.cols, props.rows, props.baseSprite]);

  return (
    <Tilemap {...defaultTilemapArgs} tilmapScheme={schema}>
      <ThirdPersonCamera {...defaulThridPersonCameraArgs}>
        <CameraControl onCameraPositionChange={setCameraPosition} />
      </ThirdPersonCamera>
      {cameraPosition && (
        <MotionableElement
          tilePosition={cameraPosition}
          spriteKey={props.elementSprite}
          layer={1}
          elementKey='element1'
          motionSettings={{
            speed: props.motionSpeed,
            easing: props.easing,
            maxDuration: props.maxDuration,
            minDuration: props.minDuration,
          }}
          onMotionComplete={props.onMotionEnd}
        ></MotionableElement>
      )}
    </Tilemap>
  );
};
