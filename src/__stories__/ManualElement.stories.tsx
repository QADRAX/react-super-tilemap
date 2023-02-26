import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FirstLayerSprites, SecondLayerSprites, SpriteName } from './__Sprites__';
import { DemoManualElement } from './demos/elements/DemoManualElement';

export default {
  title: 'Manual Element demo',
  component: DemoManualElement,
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
    elementSprite: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [...SecondLayerSprites],
      control: 'select',
    },
    elementCol: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    elementRow: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
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
} as ComponentMeta<typeof DemoManualElement>;

const Template: ComponentStory<typeof DemoManualElement> = (args) => (
  <DemoManualElement {...args} />
);

export const ManualElementExample = Template.bind({});

ManualElementExample.args = {
  rows: 20,
  cols: 20,
  baseSprite: SpriteName.grass,
  elementSprite: SpriteName.armyIdle,
  elementCol: 10,
  elementRow: 10,
};
