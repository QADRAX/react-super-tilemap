import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { defaultEasingTypes } from './__defaultArgs__';
import { DemoThirdPersonCameraContext } from './demos/cameras/DemoThirdPersonCameraContext';

export default {
  title: 'Third person camera context demo',
  component: DemoThirdPersonCameraContext,
  argTypes: {
    zoomMotionEasingType: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [...defaultEasingTypes],
      control: 'select',
    },
    zoomMotionSpeed: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    zoomMotionMaxDuration: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    zoomMotionMinDuration: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    cameraMotionEasingType: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [...defaultEasingTypes],
      control: 'select',
    },
    cameraMotionSpeed: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    cameraMotionMaxDuration: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    cameraMotionMinDuration: {
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
} as ComponentMeta<typeof DemoThirdPersonCameraContext>;

const Template: ComponentStory<typeof DemoThirdPersonCameraContext> = (args) => (
  <DemoThirdPersonCameraContext {...args} />
);

export const ThirdPersonCameraContextDemo = Template.bind({});

ThirdPersonCameraContextDemo.args = {
  zoomMotionEasingType: 'easeOutElastic',
  zoomMotionSpeed: 0.1,
  zoomMotionMaxDuration: 0.6,
  zoomMotionMinDuration: 0.3,
  cameraMotionEasingType: 'easeOutElastic',
  cameraMotionSpeed: 0.1,
  cameraMotionMaxDuration: 0.6,
  cameraMotionMinDuration: 0.3,
};
