import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FirstLayerSprites, SecondLayerSprites, SpriteName } from './__Sprites__';
import { DemoMotionableElement } from './demos/elements/DemoMotionableElement';
import { defaultEasingTypes, defaultMotionSettings } from './__defaultArgs__';

export default {
  title: 'Motionable Element demo',
  component: DemoMotionableElement,
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
    motionSpeed: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    easing: {
      table: {
        type: {
          summary: 'EasingType',
        },
      },
      options: [...defaultEasingTypes],
      control: 'select',
    },
    maxDuration: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    minDuration: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
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
} as ComponentMeta<typeof DemoMotionableElement>;

const Template: ComponentStory<typeof DemoMotionableElement> = (args) => (
  <DemoMotionableElement {...args} />
);

export const ManualElementExample = Template.bind({});

ManualElementExample.args = {
  rows: 20,
  cols: 20,
  baseSprite: SpriteName.grass,
  elementSprite: SpriteName.armyIdle,
  elementCol: 10,
  elementRow: 10,
  motionSpeed: defaultMotionSettings.speed,
  easing: defaultMotionSettings.easing,
  maxDuration: defaultMotionSettings.maxDuration,
  minDuration: defaultMotionSettings.minDuration,
};
