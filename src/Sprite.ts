import {
  DEFAULT_ANIMATION_DELAY,
  DEFAULT_SPRITE_TILESIZE,
  DIFERENT_SIZE_ERROR,
  EMPTY_SPRITE_ERROR,
  INVALID_SPRITE_IMAGE_ERROR,
} from './constants';
import { Size } from './types/Size';
import { SpriteDefinition } from './types/SpriteDefinition';

export type SpriteMap = Map<string, Sprite>;

export class Sprite {
  private _imagesSrc: string[];
  private _animationDelay: number;
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
      spriteDefinition.tileSize &&
      spriteDefinition.tileSize.width > 0 &&
      spriteDefinition.tileSize.height > 0
    ) {
      this._tileSize = spriteDefinition.tileSize;
    } else {
      this._tileSize = DEFAULT_SPRITE_TILESIZE;
    }
  }

  static async loadSprites(
    spriteDefinitions: SpriteDefinition[] | undefined
  ): Promise<SpriteMap | undefined> {
    if (spriteDefinitions) {
      const spriteMap: SpriteMap = new Map();
      const promises: (() => Promise<void>)[] = [];

      for (const spriteDefinition of spriteDefinitions) {
        const loadSprite = async () => {
          const sprite = new Sprite(spriteDefinition);
          await sprite.load();
          spriteMap.set(spriteDefinition.key, sprite);
        };
        promises.push(loadSprite);
      }

      await Promise.all(promises.map((p) => p()));
      return spriteMap;
    } else {
      return undefined;
    }
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
