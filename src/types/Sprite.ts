import { Size } from './Size';
import { TilePosition } from './TilePosition';

export type SpriteMap = Map<string, Sprite>;

export type Sprite = {
  /**
   * Real image size in pixels.
   */
  readonly sizePx: Size | undefined;
  /**
   * Configured image sizing in tiles.
   */
  readonly size: Size;
  /**
   * Configured offset of the sprite.
   */
  readonly offset: TilePosition;
  /**
   * Configured animation delay in milliseconds.
   */
  readonly animationDelay: number;
  /**
   * Load the sprite images.
   *
   * @throws Error if the sprite images cannot be loaded in a browser.
   * @throws Error if the sprite images are not all the same size.
   *
   * @returns A promise that resolves when the sprite images are loaded.
   */
  load(): Promise<void>;
  /**
   * Calculates the frame to be displayed based on the system time.
   *
   * @throws Error if the sprite is not loaded.
   *
   * @param timestamp system time in milliseconds.
   */
  getFrame(timestamp: number): HTMLImageElement;
};
