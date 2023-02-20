import React from 'react';
import { SpriteDefinition } from "../../../types/SpriteDefinition";
import { Tilemap } from '../../../components/Tilemap/Tilemap';
import { ManualCamera } from '../../../components';
import { grass, ocean1_1, ocean1_2, ocean1_3, ocean1_4 } from '../../__Sprites__';

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
];

const scheme: string[][][] = [
    [
        ['grass'],
        ['grass'],
        ['grass'],
    ],
    [
        ['grass'],
        ['grass'],
        ['ocean'],
    ],
    [
        ['grass'],
        ['ocean'],
        ['ocean'],
    ],
];

export const DemoSpriteAnimated = () => {
    return (
        <Tilemap tilmapScheme={scheme} spriteDefinition={sprites}>
            <ManualCamera position={{ col: 1, row: 1 }} zoom={20} />
        </Tilemap>
    );
};
