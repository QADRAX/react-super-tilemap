import React, { FunctionComponent, useEffect } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Tilemap } from '../components/Tilemap/Tilemap';
import { defaulthridPersonCameraArgs, defaultTilemapArgs } from './__defaultArgs__';
import { getFullfilledSchema } from './__MapGenerator__';
import { TilePosition } from '../types/TilePosition';
import { FirstLayerSprites, SecondLayerSprites, SpriteName } from './__Sprites__';
import { ThirdPersonCamera } from '../components/Camera/ThirdPersonCamera/ThirdPersonCamera';

export interface ExampleProps {
    rows: number;
    cols: number;
    baseSprite: string;
    spriteToAdd: string;
    onTileClick: (position: TilePosition) => void;
}

const Example: FunctionComponent<ExampleProps> = (props) => {
    const initialSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 2);
    const [schema, setSchema] = React.useState(initialSchema);

    useEffect(() => {
        const newSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 2);
        setSchema(newSchema);
    }, [props.cols, props.rows, props.baseSprite]);

    const handleTileClick = (tilePos: TilePosition) => {
        const newSchema = [...schema];
        const tile = newSchema[tilePos.col][tilePos.row];
        if (tile) {
            const layer = tile[1];
            if (layer) {
                tile[1] = '';
            } else {
                tile[1] = props.spriteToAdd;
            }
        }
        setSchema(newSchema);
    };

    return (
        <Tilemap {...defaultTilemapArgs}
            tilmapScheme={schema}
            onTileClick={handleTileClick}
        >
            <ThirdPersonCamera {...defaulthridPersonCameraArgs} />
        </Tilemap>
    );
};

export default {
    title: 'Tilemap/Tilemap',
    component: Example,
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
        spriteToAdd: {
            table: {
                type: {
                    summary: 'string',
                },
            },
            options: [...SecondLayerSprites],
            control: 'select',
        },
        onTileClick: {
            control: 'function',
        },
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
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = (args) => <Example {...args} />;

export const ClickableTilemapExample = Template.bind({});

ClickableTilemapExample.args = {
    rows: 20,
    cols: 20,
    baseSprite: SpriteName.grass,
    spriteToAdd: SpriteName.building,
};

