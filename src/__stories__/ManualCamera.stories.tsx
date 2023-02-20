import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DemoManualCamera } from './demos/cameras/DemoManualCamera';

export default {
  title: 'Manual Camera demo',
  component: DemoManualCamera,
  argTypes: {
    col: {
      table: {
        type: {
          summary: 'number',
        },
      },
      control: 'number',
    },
    row: {
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
  col: 2,
  row: 2,
  zoom: 15,
};
