import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Tilemap } from '../components/Tilemap/Tilemap';
import { getRandomSpriteSchema } from './__MapGenerator__';
import { defaulthridPersonCameraArgs, defaultTilemapArgs } from './__defaultArgs__';
import { TilemapProps } from '../types/Tilemap';
import { ThirdPersonCameraProps } from '../types/ThirdPersonCamera';
import { ThirdPersonCamera } from '../components/Camera/ThirdPersonCamera/ThirdPersonCamera';

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
} as Meta<TilemapProps & ThirdPersonCameraProps>;

const Template: Story<TilemapProps & ThirdPersonCameraProps> = (args) => (
    <Tilemap 
        defaultTileSize={args.defaultTileSize}
        backgroundColor={args.backgroundColor}
        tilmapSchema={args.tilmapSchema}
        spriteDefinition={args.spriteDefinition}
        onSpritesLoadError={args.onSpritesLoadError}
        onTileClick={args.onTileClick}
        onTileContextMenu={args.onTileContextMenu}
        onTileDoubleClick={args.onTileDoubleClick}
        onTileHover={args.onTileHover}
        onTileHoverOut={args.onTileHoverOut}
    >
        <ThirdPersonCamera 
            draggable={args.draggable}
            zoomeable={args.zoomeable}
            dragSensitivity={args.dragSensitivity}
            recenterCameraOnResize={args.recenterCameraOnResize}
            recenterCameraOnZoom={args.recenterCameraOnZoom}
            onCameraMotionEnd={args.onCameraMotionEnd}
            onZoomMotionEnd={args.onZoomMotionEnd}
            initialCameraPosition={args.initialCameraPosition} />
    </Tilemap>
);

export const Basic = Template.bind({});

Basic.args = {
    tilmapSchema: initialSchema,
    ...defaultTilemapArgs,
    ...defaulthridPersonCameraArgs
};

