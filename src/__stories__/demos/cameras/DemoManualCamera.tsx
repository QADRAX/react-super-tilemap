import React, { FunctionComponent } from 'react';
import { SpriteDefinition } from '../../../types/SpriteDefinition';
import { Tilemap } from '../../../components/Tilemap/Tilemap';
import { ManualCamera } from '../../../components';
import { grass, mountain } from '../../__Sprites__';

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

export type DemoManualCameraProps = {
  y: number;
  x: number;
  zoom: number;
};

export const DemoManualCamera: FunctionComponent<DemoManualCameraProps> = (props) => {
  return (
    <Tilemap tilmapScheme={scheme} spriteDefinition={sprites}>
      <ManualCamera position={{ y: props.y, x: props.x }} zoom={props.zoom} />
    </Tilemap>
  );
};
