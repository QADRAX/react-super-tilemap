import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThirdPersonCamera, Tilemap } from '../components';
import { defaulThridPersonCameraArgs, defaultTilemapArgs } from './__defaultArgs__';

const scheme: string[][][] = [
  [
      ['grass'],
      ['grass'],
      ['grass'],
  ],
  [
      ['grass'],
      ['mountain'],
      ['grass'],
  ],
  [
      ['grass'],
      ['grass'],
      ['grass'],
  ],
];

export default {
  title: 'Third person camera demo',
  component: ThirdPersonCamera,
  argTypes: {
    draggable: {
      table: {
        type: {
          summary: 'boolean',
        },
      },
      control: 'boolean',
    },
    zoomeable: {
      table: {
        type: {
          summary: 'boolean',
        },
      },
      control: 'boolean',
    },
    initialZoom: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    dragSensitivity: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    zoomIncrement: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
  },
  parameters: {
    controls: {
      expanded: true,
      hideNoControlsWarning: true,
    },
  },
} as ComponentMeta<typeof ThirdPersonCamera>;

const Template: ComponentStory<typeof ThirdPersonCamera> = (args) => (
  <Tilemap {...defaultTilemapArgs} tilmapScheme={scheme}>
    <ThirdPersonCamera {...args} />
  </Tilemap>
);

export const ThirdPersonCameraDemo = Template.bind({});

ThirdPersonCameraDemo.args = {
  ...defaulThridPersonCameraArgs,
};
