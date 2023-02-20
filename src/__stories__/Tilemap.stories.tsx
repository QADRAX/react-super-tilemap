import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Tilemap } from '../components/Tilemap/Tilemap';
import { getRandomSpriteSchema } from './__MapGenerator__';
import { defaultTilemapArgs } from './__defaultArgs__';
import { TilemapProps } from '../components/Tilemap/Tilemap.types';
import { ManualCamera } from '../components';

const rows = 5;
const cols = 5;

const initialSchema = getRandomSpriteSchema(cols, rows);

export default {
  title: 'Tilemap demo',
  component: Tilemap,
  argTypes: {
    backgroundColor: {
      table: {
        type: {
          summary: 'string',
        },
      },
      control: 'color',
    },
    defaultTileSize: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    tilmapScheme: {
      table: {
        type: {
          summary: 'TilemapSchema',
        },
      },
      control: 'object',
    },
    spriteDefinition: {
      table: {
        type: {
          summary: 'SpriteDefinition',
        },
      },
      control: 'object',
    },
    onSpritesLoadError: { control: 'function' },
    onTileClick: { control: 'function' },
    onTileContextMenu: { control: 'function' },
    onTileDoubleClick: { control: 'function' },
    onTilemapClick: { control: 'function' },
    onTilemapContextMenu: { control: 'function' },
    onTilemapDoubleClick: { control: 'function' },
    onTileHover: { control: 'function' },
    onTileHoverOut: { control: 'function' },
    children: {
      control: false,
    },
  },
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
    controls: {
      expanded: true,
      hideNoControlsWarning: true,
    },
  },
} as Meta<TilemapProps>;

const Template: Story<TilemapProps> = (args) => (
  <Tilemap
    defaultTileSize={args.defaultTileSize}
    backgroundColor={args.backgroundColor}
    tilmapScheme={args.tilmapScheme}
    spriteDefinition={args.spriteDefinition}
    onSpritesLoadError={args.onSpritesLoadError}
    onTileClick={args.onTileClick}
    onTileContextMenu={args.onTileContextMenu}
    onTileDoubleClick={args.onTileDoubleClick}
    onTilemapClick={args.onTilemapClick}
    onTilemapContextMenu={args.onTilemapContextMenu}
    onTilemapDoubleClick={args.onTilemapDoubleClick}
    onTileHover={args.onTileHover}
    onTileHoverOut={args.onTileHoverOut}
  >
    <ManualCamera position={{ col: 2, row: 2}} zoom={15}/>
  </Tilemap>
);

export const TilemapPropsDemo = Template.bind({});

TilemapPropsDemo.args = {
  tilmapScheme: initialSchema,
  ...defaultTilemapArgs,
};
