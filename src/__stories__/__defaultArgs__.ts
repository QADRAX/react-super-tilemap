import { ThirdPersonCameraProps } from '../components/Camera/ThirdPersonCamera/ThirdPersonCamera.types';
import { TilemapProps } from '../components/Tilemap/Tilemap.types';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_DRAG_SENSITIVITY } from '../constants';
import { EasingType } from '../types/EasingType';
import { MotionSettings } from '../types/Motions';
import { spritesDefinition } from './__Sprites__';

export const defaultMotionSettings: MotionSettings = {
  speed: 0.01,
  easing: 'easeOutQuint',
  maxDuration: 0.6,
  minDuration: 0.3,
};

export const defaultZoomMotionSettings: MotionSettings = {
  speed: 0.01,
  easing: 'easeOutBack',
  maxDuration: 0.6,
  minDuration: 0.3,
};

export const defaultTilemapArgs: Partial<TilemapProps> = {
  defaultTileSize: 16,
  spriteDefinition: spritesDefinition,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
};

export const defaulThridPersonCameraArgs: Partial<ThirdPersonCameraProps> = {
  draggable: true,
  zoomeable: true,
  dragSensitivity: DEFAULT_DRAG_SENSITIVITY,
  recenterCameraOnResize: {
    settings: defaultMotionSettings,
    target: 'center',
  },
  initialCameraPosition: 'center',
};

export const defaultEasingTypes: EasingType[] = [
  'linear',
  'easeInQuad',
  'easeOutQuad',
  'easeInOutQuad',
  'easeInCubic',
  'easeOutCubic',
  'easeInOutCubic',
  'easeInQuart',
  'easeOutQuart',
  'easeInOutQuart',
  'easeInQuint',
  'easeOutQuint',
  'easeInOutQuint',
  'easeInSine',
  'easeOutSine',
  'easeInOutSine',
  'easeInExpo',
  'easeOutExpo',
  'easeInOutExpo',
  'easeInCirc',
  'easeOutCirc',
  'easeInOutCirc',
  'easeInBack',
  'easeOutBack',
  'easeInOutBack',
  'easeInElastic',
  'easeOutElastic',
  'easeInOutElastic',
  'easeInBounce',
  'easeOutBounce',
  'easeInOutBounce',
];
