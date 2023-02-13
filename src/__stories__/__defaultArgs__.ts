import { DEFAULT_BACKGROUND_COLOR, DEFAULT_DRAG_SENSITIVITY } from "../constants";
import { MotionSettings } from "../types/Motions";
import { TilemapProps } from "../types/Tilemap";
import { spritesDefinition } from "./__Sprites__";

export const defaultMotionSettings: MotionSettings = {
    speed: 0.1,
    easing: 'easeOutElastic',
    maxDuration: 1,
};

export const defaultTilemapArgs: Partial<TilemapProps> = {
    defaultTileSize: 16,
    spriteDefinition: spritesDefinition,
    draggable: true,
    zoomeable: true,
    dragSensitivity: DEFAULT_DRAG_SENSITIVITY,
    recenterCameraOnResize: {
        settings: defaultMotionSettings,
        target: 'center',
    },
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    initialCameraPosition: 'center',

};