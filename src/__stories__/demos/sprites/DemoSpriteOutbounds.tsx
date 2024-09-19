import React from 'react';
import { SpriteDefinition } from '../../../types/SpriteDefinition';
import { Tilemap } from '../../../components/Tilemap/Tilemap';
import { ThirdPersonCamera } from '../../../components';
import {
  building_1,
  building_2,
  grass,
  ocean1_1,
  ocean1_2,
  ocean1_3,
  ocean1_4,
} from '../../__Sprites__';
import { Position } from '../../../types/Position';

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
];

const scheme: string[][][] = [
  [['grass'], ['grass'], ['grass']],
  [['grass'], ['grass', 'building'], ['grass']],
  [['grass'], ['grass'], ['grass']],
];

export const DemoSpriteOutbounds = () => {
  const outboundSprite = (_pos: Position, layer: number) => layer == 0 ? 'ocean' : undefined;
  return (
    <Tilemap tilmapScheme={scheme} spriteDefinition={sprites} outboundSpriteKey={outboundSprite}>
      <ThirdPersonCamera zoomeable draggable />
    </Tilemap>
  );
};
