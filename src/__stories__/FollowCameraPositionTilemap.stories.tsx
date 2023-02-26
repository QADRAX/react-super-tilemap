import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FirstLayerSprites, SecondLayerSprites, SpriteName } from './__Sprites__';
import { DemoFollowCameraPostion } from './demos/tilemap/DemoFollowCameraPostion';
import { defaultMotionSettings } from './__defaultArgs__';

export default {
  title: 'Examples/Follow camera position',
  component: DemoFollowCameraPostion,
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
    onMotionEnd: { control: 'function' },
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
} as ComponentMeta<typeof DemoFollowCameraPostion>;

const Template: ComponentStory<typeof DemoFollowCameraPostion> = (args) => (
  <DemoFollowCameraPostion {...args} />
);

export const FollowCameraPostion = Template.bind({});

FollowCameraPostion.args = {
  rows: 20,
  cols: 20,
  baseSprite: SpriteName.grass,
  elementSprite: SpriteName.selector,
  motionSpeed: 0.01,
  easing: defaultMotionSettings.easing,
  maxDuration: 0.04,
  minDuration: 0.03,
};
