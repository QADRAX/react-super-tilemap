import { Size } from './types/Size';

export const DEFAULT_TILE_SIZE = 16;
export const ZOOM_RATIO = 1.1;
export const DEFAULT_DRAG_SENSITIVITY = 0.7;
export const DEFAULT_ZOOM_INCREMENT = 1;
export const DEFAULT_BACKGROUND_COLOR = '#cbf0ff';
export const DEFAULT_ANIMATION_DELAY = 1000;
export const DRAG_DELAY = 100;
export const DEFAULT_SPRITE_TILESIZE: Size = { width: 1, height: 1 };

export const DIFERENT_SIZE_ERROR = `Sprite definition has images with different sizes`;
export const EMPTY_SPRITE_ERROR = `Sprite definition has no images`;
export const INVALID_SPRITE_IMAGE_ERROR = `Sprite definition has invalid image src`;
export const UNSIZED_CANVAS_ERROR = `Canvas has no size`;
