import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DemoSpriteBasic } from './demos/sprites/DemoSpriteBasic';
import { DemoSpriteAnimated } from './demos/sprites/DemoSpriteAnimated';
import { DemoSpriteOffset } from './demos/sprites/DemoSpriteOffset';
import { DemoSpriteOversize } from './demos/sprites/DemoSpriteOversize';

export default {
  title: 'Sprites demo',
} as Meta;

const Demo1: Story = () => <DemoSpriteBasic />;
const Demo2: Story = () => <DemoSpriteAnimated />;
const Demo3: Story = () => <DemoSpriteOversize />;
const Demo4: Story = () => <DemoSpriteOffset />;

export const SpritesBasic = Demo1.bind({});
export const SpritesAnimated = Demo2.bind({});
export const SpritesOversize = Demo3.bind({});
export const SpritesOffset = Demo4.bind({});