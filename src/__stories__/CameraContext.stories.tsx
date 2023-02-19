import React, { FunctionComponent, useEffect } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Tilemap } from '../components/Tilemap/Tilemap';
import { defaultEasingTypes, defaulthridPersonCameraArgs, defaultMotionSettings, defaultTilemapArgs, defaultZoomMotionSettings } from './__defaultArgs__';
import { getFullfilledSchema } from './__MapGenerator__';
import { TilePosition } from '../types/TilePosition';
import { FirstLayerSprites, SecondLayerSprites, SpriteName } from './__Sprites__';
import { ThirdPersonCamera } from '../components/Camera/ThirdPersonCamera/ThirdPersonCamera';
import { useThirdPersonCameraContext } from '../components/Camera/ThirdPersonCamera/ThirdPersonCameraContext/useThirdPersonCameraContext';
import { ManualElement } from '../components/Elements/ManualElement/ManualElement';
import { EasingType } from '../types/EasingType';
import { MotionSettings } from '../types/Motions';

export interface ExampleProps {
    rows: number;
    cols: number;
    baseSprite: string;
    spriteToAdd: string;
    elementCol: number;
    elementRow: number;
    motionEasingType: EasingType;
    zoomEasingType: EasingType;
    onTileClick: (position: TilePosition) => void;
}

const ContextButtons = (props: {
    focusedTile: TilePosition | null;
    motionEasingType: EasingType;
    zoomEasingType: EasingType;
}) => {
    const {
        zoom,
        addCameraMotion,
        addZoomMotion,
    } = useThirdPersonCameraContext();

    const cameraMotion: MotionSettings = {
        ...defaultMotionSettings,
        easing: props.motionEasingType,
    };

    const zoomMotion: MotionSettings = {
        ...defaultZoomMotionSettings,
        easing: props.zoomEasingType,
    };

    useEffect(() => {
        if (props.focusedTile) {
            addCameraMotion(cameraMotion, props.focusedTile);
        }
    }, [props.focusedTile]);

    const centerCamera = () => {
        addCameraMotion(cameraMotion, 'center');
    };

    const resetZoom = () => {
        addZoomMotion(zoomMotion, 0);
    };

    const zoomIn = () => {
        addZoomMotion(zoomMotion, zoom + 5);
    };

    const zoomOut = () => {
        addZoomMotion(zoomMotion, zoom - 5);
    };

    return (
        <>
            <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                centerCamera();
            }}>Center camera</button>
            <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                resetZoom();
            }}>Reset Zoom</button>
            <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                resetZoom();
                centerCamera();
            }}>Reset all</button>
            <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                zoomIn();
            }}>ZoomIn</button>
            <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                zoomOut();
            }}>ZoomOut</button>
        </>
    );
};

const Example: FunctionComponent<ExampleProps> = (props) => {
    const initialSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 2);
    const [schema, setSchema] = React.useState(initialSchema);
    const [focusedTile, setFocusedTile] = React.useState<TilePosition | null>(null);

    useEffect(() => {
        const newSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 2);
        setSchema(newSchema);
    }, [props.cols, props.rows, props.baseSprite]);

    const handleTileContextMenu = (tilePos: TilePosition) => {
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

    const handleTileClick = (tilePos: TilePosition) => {
        setFocusedTile(tilePos);
    };

    return (
        <Tilemap {...defaultTilemapArgs}
            tilmapScheme={schema}
            onTileClick={handleTileClick}
            onTileContextMenu={handleTileContextMenu}
        >
            <ThirdPersonCamera {...defaulthridPersonCameraArgs}>
                <ContextButtons
                    focusedTile={focusedTile}
                    motionEasingType={props.motionEasingType}
                    zoomEasingType={props.zoomEasingType} />
            </ThirdPersonCamera>
            <ManualElement
                element={{
                    tilePosition: {
                        col: props.elementCol,
                        row: props.elementRow,
                    },
                    spriteKey: SpriteName.armyIdle,
                    layer: 1,
                }}
                elementKey="army" />
        </Tilemap>
    );
};

export default {
    title: 'Tilemap/Cameras',
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
        motionEasingType: {
            table: {
                type: {
                    summary: 'EasingType',
                },
            },
            options: [...defaultEasingTypes],
            control: 'select',
        },
        zoomEasingType: {
            table: {
                type: {
                    summary: 'EasingType',
                },
            },
            options: [...defaultEasingTypes],
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

export const ThirdPersonCameraExample = Template.bind({});

ThirdPersonCameraExample.args = {
    rows: 20,
    cols: 20,
    baseSprite: SpriteName.grass,
    spriteToAdd: SpriteName.building,
    elementCol: 10,
    elementRow: 10,
    motionEasingType: defaultMotionSettings.easing,
    zoomEasingType: defaultMotionSettings.easing,
};

