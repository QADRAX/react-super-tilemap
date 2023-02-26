import React from 'react';
import { SpriteDefinition } from '../../../types/SpriteDefinition';
import { Tilemap } from '../../../components/Tilemap/Tilemap';
import { ManualCamera } from '../../../components';
import { grass } from '../../__Sprites__';

const sprites: SpriteDefinition[] = [
  {
    key: 'grass',
    imagesSrc: [grass],
  },
];

const scheme: string[][][] = [
  [['grass'], ['grass'], ['grass']],
  [['grass'], ['grass'], ['grass']],
  [['grass'], ['grass'], ['grass']],
];

export const DemoSpriteBasic = () => {
  return (
    <Tilemap tilmapScheme={scheme} spriteDefinition={sprites}>
      <ManualCamera position={{ col: 1, row: 1 }} zoom={20} />
    </Tilemap>
  );
};
