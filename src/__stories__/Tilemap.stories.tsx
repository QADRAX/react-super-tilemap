import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tilemap } from '../components/Tilemap';
import { getFullfilledSchema } from './__MapGenerator__';
import { SpriteName, spritesDefinition } from './__Sprites__';
import { MotionSettings } from '../types/Motions';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_DRAG_SENSITIVITY, DEFAULT_TILE_SIZE } from '../constants';

const rows = 30;
const cols = 50;

const initialSchema = getFullfilledSchema(cols, rows, SpriteName.grass, 3);

const motionSettings: MotionSettings = {
    speed: 0.1,
    easing: 'easeOutElastic',
    maxDuration: 1,
};

export default {
    title: 'Tilemap/Basic',
    component: Tilemap,
    argTypes: {
        backgroundColor: {
            defaultValue: DEFAULT_BACKGROUND_COLOR,
            table: {
                type: {
                    summary: 'string',
                },
            },
            control: 'color',
        },
        defaultTileSize: {
            defaultValue: DEFAULT_TILE_SIZE,
            table: {
                type: {
                    summary: 'number',
                },
            },
            control: 'number',
        },
        tilmapSchema: {
            defaultValue: initialSchema,
            table: {
                type: {
                    summary: 'TilemapSchema',
                },
            },
            control: 'object',
        },
        spriteDefinition: {
            defaultValue: spritesDefinition,
            table: {
                type: {
                    summary: 'SpriteDefinition',
                },
            },
            control: 'object',
        },
        recenterCameraOnResize: {
            defaultValue: {
                settings: motionSettings,
                target: 'center',
            },
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
            defaultValue: true,
            table: {
                type: {
                    summary: 'boolean',
                },
            },
            control: 'boolean',
        },
        zoomeable: {
            defaultValue: true,
            table: {
                type: {
                    summary: 'boolean',
                },
            },
            control: 'boolean'
        },
        dragSensitivity: {
            defaultValue: DEFAULT_DRAG_SENSITIVITY,
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
    defaultTileSize: 16,
    tilmapSchema: initialSchema,
    spriteDefinition: spritesDefinition,
    draggable: true,
    zoomeable: true,
    dragSensitivity: 1.1,
    recenterCameraOnResize: {
        settings: motionSettings,
        target: 'center',
    },
};

