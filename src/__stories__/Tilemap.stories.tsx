import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tilemap } from '../components/Tilemap';
import { getRandomSpriteSchema } from './__MapGenerator__';
import { defaultTilemapArgs } from './__defaultArgs__';

const rows = 5;
const cols = 5;

const initialSchema = getRandomSpriteSchema(cols, rows);

export default {
    title: 'Tilemap/Basic example',
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
        tilmapSchema: {
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
        recenterCameraOnResize: {
            table: {
                type: {
                    summary: 'RecenterCameraMotion',
                },
            },
            control: 'object',
        },
        recenterCameraOnZoom: {
            table: {
                type: {
                    summary: 'RecenterCameraMotion',
                },
            },
            control: 'object',
        },
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
            control: 'boolean'
        },
        dragSensitivity: {
            table: {
                type: {
                    summary: 'number',
                },
            },
            control: 'number',
        },
        onTileClick: { control: 'function' },
        onTileContextMenu: { control: 'function' },
        onTileDoubleClick: { control: 'function' },
        onTileHover: { control: 'function' },
        onTileHoverOut: { control: 'function' },
        onCameraMotionEnd: { control: 'function' },
        onZoomMotionEnd: { control: 'function' },
        onSpritesLoadError: { control: 'function' },
        children: { 
            control: false,
        }
    },
    parameters: { 
        actions: { 
            argTypesRegex: '^on.*' 
        },
        controls: {
            expanded: true,
            hideNoControlsWarning: true,
          },        
    },
} as ComponentMeta<typeof Tilemap>;

const Template: ComponentStory<typeof Tilemap> = (args) => <Tilemap {...args} />;

export const Basic = Template.bind({});

Basic.args = {
    tilmapSchema: initialSchema,
    ...defaultTilemapArgs,
};

