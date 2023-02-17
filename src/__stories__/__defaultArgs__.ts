import { DEFAULT_BACKGROUND_COLOR, DEFAULT_DRAG_SENSITIVITY } from "../constants";
import { MotionSettings } from "../types/Motions";
import { ThirdPersonCameraProps } from "../types/ThirdPersonCamera";
import { TilemapProps } from "../types/Tilemap";
import { spritesDefinition } from "./__Sprites__";

export const defaultMotionSettings: MotionSettings = {
    speed: 0.01,
    easing: 'easeOutBack',
    maxDuration: 0.3,
    minDuration: 0.1,
};

export const defaultZoomMotionSettings: MotionSettings = {
    speed: 0.01,
    easing: 'easeOutBack',
    maxDuration: 1,
};

export const defaultTilemapArgs: Partial<TilemapProps> = {
    defaultTileSize: 16,
    spriteDefinition: spritesDefinition,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
};

export const defaulthridPersonCameraArgs: Partial<ThirdPersonCameraProps> = {
    draggable: true,
    zoomeable: true,
    dragSensitivity: DEFAULT_DRAG_SENSITIVITY,
    recenterCameraOnResize: {
        settings: defaultMotionSettings,
        target: 'center',
    },
    initialCameraPosition: 'center',
};