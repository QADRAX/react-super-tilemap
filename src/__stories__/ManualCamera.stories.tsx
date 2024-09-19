import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DemoManualCamera } from './demos/cameras/DemoManualCamera';

export default {
  title: 'Manual Camera demo',
  component: DemoManualCamera,
  argTypes: {
    y: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    x: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    zoom: {
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
} as ComponentMeta<typeof DemoManualCamera>;

const Template: ComponentStory<typeof DemoManualCamera> = (args) => <DemoManualCamera {...args} />;

export const ManualCameraDemo = Template.bind({});

ManualCameraDemo.args = {
  y: 2,
  x: 2,
  zoom: 15,
};
