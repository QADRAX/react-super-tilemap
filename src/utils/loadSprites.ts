import { SpriteImpl } from "../classes/SpriteImpl";
import { SpriteMap } from "../types/Sprite";
import { SpriteDefinition } from "../types/SpriteDefinition";

export async function loadSprites(
    spriteDefinitions: SpriteDefinition[] | undefined
  ): Promise<SpriteMap | undefined> {
    if (spriteDefinitions) {
      const spriteMap: SpriteMap = new Map();
      const promises: (() => Promise<void>)[] = [];

      for (const spriteDefinition of spriteDefinitions) {
        const loadSprite = async () => {
          const sprite = new SpriteImpl(spriteDefinition);
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
