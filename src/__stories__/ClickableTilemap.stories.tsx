import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FirstLayerSprites, SecondLayerSprites, SpriteName } from './__Sprites__';
import { DemoClickableTilemap } from './demos/tilemap/DemoClickableTilemap';

export default {
  title: 'Examples/Clickable Tilemap',
  component: DemoClickableTilemap,
  argTypes: {
    rows: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    cols: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    baseSprite: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [...FirstLayerSprites],
      control: 'select',
    },
    spriteToAdd: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [...SecondLayerSprites],
      control: 'select',
    },
    onTileClick: {
      control: 'function',
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
} as ComponentMeta<typeof DemoClickableTilemap>;

const Template: ComponentStory<typeof DemoClickableTilemap> = (args) => (
  <DemoClickableTilemap {...args} />
);

export const ClickableTilemapExample = Template.bind({});

ClickableTilemapExample.args = {
  rows: 20,
  cols: 20,
  baseSprite: SpriteName.grass,
  spriteToAdd: SpriteName.building,
};
