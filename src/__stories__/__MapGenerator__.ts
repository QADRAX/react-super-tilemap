import { FirstLayerSprites, SpriteName } from "./__Sprites__";

export function getRandomSpriteSchemaWithLayers(
    rows: number,
    cols: number,
): string[][][] {
    const schema: string[][][] = [];
    for (let i = 0; i < rows; i++) {
        const row: string[][] = [];
        for (let j = 0; j < cols; j++) {
            const randomSpriteId = Math.floor(Math.random() * FirstLayerSprites.length);
            const randomSprite = FirstLayerSprites[randomSpriteId];
            const isRandomLayer = Math.random() > 0.9;
            if (isRandomLayer) {
                row.push([randomSprite, SpriteName.armyIdle]);
            } else {
                row.push([randomSprite]);
            }
        }
        schema.push(row);
    }
    return schema;
};

export function getRandomSpriteSchema(
    rows: number,
    cols: number,
): string[][][] {
    const schema: string[][][] = [];
    for (let i = 0; i < rows; i++) {
        const row: string[][] = [];
        for (let j = 0; j < cols; j++) {
            const randomSpriteId = Math.floor(Math.random() * FirstLayerSprites.length);
            const randomSprite = FirstLayerSprites[randomSpriteId];
            row.push([randomSprite]);
        }
        schema.push(row);
    }
    return schema;
};

export function getFullfilledSchema(
    rows: number,
    cols: number,
    sprite: string,
    numLayers: number = 1,
): string[][][] {
    const schema: string[][][] = [];
    for (let i = 0; i < rows; i++) {
        const row: string[][] = [];
        for (let j = 0; j < cols; j++) {
            const extraLayers = Array(numLayers-1).fill('');
            row.push([sprite, ...extraLayers]);
        }
        schema.push(row);
    }
    return schema;
};