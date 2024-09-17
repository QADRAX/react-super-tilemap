import React from 'react';
import { SpriteDefinition } from '../../../types/SpriteDefinition';
import { Tilemap } from '../../../components/Tilemap/Tilemap';
import { ManualCamera } from '../../../components';
import {
  building_1,
  building_2,
  grass,
  ocean1_1,
  ocean1_2,
  ocean1_3,
  ocean1_4,
  selector1,
  selector2,
} from '../../__Sprites__';

const sprites: SpriteDefinition[] = [
  {
    key: 'grass',
    imagesSrc: [grass],
  },
  {
    key: 'ocean',
    imagesSrc: [ocean1_1, ocean1_2, ocean1_3, ocean1_4],
    animationDelay: 300,
  },
  {
    key: 'building',
    imagesSrc: [building_1, building_2],
    animationDelay: 800,
    size: {
      width: 1,
      height: 2,
    },
  },
  {
    key: 'selector',
    imagesSrc: [selector2, selector1],
    animationDelay: 800,
    size: {
      width: 2,
      height: 2,
    },
    offset: {
      col: 0.5,
      row: -0.5,
    },
  },
];

const scheme: string[][][] = [
  [['grass'], ['grass'], ['grass']],
  [['grass'], ['grass', 'building'], ['ocean']],
  [['grass', 'selector'], ['ocean'], ['ocean']],
];

export const DemoSpriteOffset = () => {
  return (
    <Tilemap tilmapScheme={scheme} spriteDefinition={sprites}>
      <ManualCamera position={{ col: 1, row: 1 }} zoom={20} />
    </Tilemap>
  );
};
