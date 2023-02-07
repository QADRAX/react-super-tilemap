import { Size } from "./Size";

/**
 * Definition of a sprite to be used in the tilemap.
 * 
 * The sprite is defined by a list of images that will be used as frames.
 * 
 * The first image will be used as the default image.
 * 
 * The rest of the images will be used for animation.
 * 
 * If there is only one image, the animation will be disabled.
 * 
 * The images must have the same size.
 * 
 * @example
 * 
 * const spriteDefinition = {
 *   key: "my-sprite",
 *   imagesSrc: [
 *      "https://example.com/image1.png",
 *      "https://example.com/image2.png",
 *      "https://example.com/image3.png",
 *   ],
 *   animationDelay: 1000,
 *   tileSize: { width: 1, height: 1 },
 * };
 * 
 * @public
 */
export type SpriteDefinition = {
    /**
     * Unique key to identify the sprite.
     */
    key: string;
    /**
     * List of image sources to be used as sprite frames.
     * 
     * The first image will be used as the default image.
     * 
     * The rest of the images will be used for animation.
     * 
     * If there is only one image, the animation will be disabled
     * The images must have the same size.
     * 
     * @example
     * imagesSrc: [
     *    "https://example.com/image1.png",
     *    "https://example.com/image2.png",
     *    "https://example.com/image3.png",
     * ],
     */
    imagesSrc: string[];
    /**
     * Delay in milliseconds between each animation frame.
     * 
     * If not provided, the default value will be used.
     * 
     * If there is only one image, the animation will be disabled.
     * 
     * The delay must be greater than 0.
     * 
     * @default 1000
     */
    animationDelay?: number;
    /**
     * Sprite's size in tiles. Indicates how many tiles the sprite will occupy.
     * 
     * If not provided, the default value will be used.
     * 
     * The size width and height must be greater than 0.
     * 
     * @default { width: 1, height: 1 }
     */
    tileSize?: Size;
};