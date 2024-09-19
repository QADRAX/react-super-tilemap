import {
  DEFAULT_ANIMATION_DELAY,
  DEFAULT_SPRITE_OFFSET,
  DEFAULT_SPRITE_TILESIZE,
  DIFERENT_SIZE_ERROR,
  EMPTY_SPRITE_ERROR,
  INVALID_SPRITE_IMAGE_ERROR,
} from '../constants';
import { Position } from '../types/Position';
import { Size } from '../types/Size';
import { Sprite } from '../types/Sprite';
import { SpriteDefinition } from '../types/SpriteDefinition';
/**
 * A sprite is a collection of images that are used to animate a game object
 * and are loaded from a sprite definition array.
 *
 * @internal
 */
export class SpriteImpl implements Sprite {
  private _imagesSrc: string[];
  private _animationDelay: number;
  private _offset: Position;
  private _htmlImages: HTMLImageElement[] | undefined;
  private _tileSize: Size;

  constructor(spriteDefinition: SpriteDefinition) {
    this._imagesSrc = spriteDefinition.imagesSrc;

    const animationDelay = spriteDefinition.animationDelay
      ? spriteDefinition.animationDelay > 0
        ? spriteDefinition.animationDelay
        : DEFAULT_ANIMATION_DELAY
      : DEFAULT_ANIMATION_DELAY;

    this._animationDelay = this._imagesSrc.length > 1 ? animationDelay : 0;

    if (
      spriteDefinition.size &&
      spriteDefinition.size.width > 0 &&
      spriteDefinition.size.height > 0
    ) {
      this._tileSize = spriteDefinition.size;
    } else {
      this._tileSize = DEFAULT_SPRITE_TILESIZE;
    }

    this._offset = spriteDefinition.offset || DEFAULT_SPRITE_OFFSET;
  }

  async load() {
    function loadImage(src: string): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(INVALID_SPRITE_IMAGE_ERROR));
        image.src = src;
      });
    }

    this._htmlImages = await Promise.all(this._imagesSrc.map(loadImage));
    this.checkImageSizes();
  }

  private checkImageSizes() {
    if (this._htmlImages) {
      const width = this._htmlImages[0].width;
      const height = this._htmlImages[0].height;
      for (let i = 1; i < this._htmlImages.length; i++) {
        if (this._htmlImages[i].width !== width || this._htmlImages[i].height !== height) {
          throw new Error(DIFERENT_SIZE_ERROR);
        }
      }
    } else {
      throw new Error(EMPTY_SPRITE_ERROR);
    }
  }

  get sizePx(): Size | undefined {
    return this._htmlImages
      ? {
          width: this._htmlImages[0].width,
          height: this._htmlImages[0].height,
        }
      : undefined;
  }

  get size(): Size {
    return this._tileSize;
  }

  get animationDelay() {
    return this._animationDelay;
  }

  get offset() {
    return this._offset;
  }

  getFrame(timestamp: number) {
    if (this._htmlImages) {
      if (this.animationDelay > 0) {
        const frame = Math.floor(timestamp / this._animationDelay) % this._htmlImages.length;
        return this._htmlImages[frame];
      } else {
        return this._htmlImages[0];
      }
    } else {
      throw new Error(EMPTY_SPRITE_ERROR);
    }
  }
}
