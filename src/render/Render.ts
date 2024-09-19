import { Size } from '../types/Size';
import { DEFAULT_BACKGROUND_COLOR } from '../constants';
import { isValidCSSColor } from '../utils/colors';
import { Position } from '../types/Position';
import { SpriteMap } from '../types/Sprite';
import { TilemapElementMap } from '../types/TilemapElement';
import { getElementFrom3DArray } from '../utils/matrix';

export type RenderProps = {
  spriteMap?: SpriteMap;
  schema?: string[][][];
  cameraPosition: Position;
  canvasSizePx: Size;
  tileSizePx: number;
  timestamp: number;
  buffer: HTMLCanvasElement;
  canvas: HTMLCanvasElement;
  backgroundColor?: string;
  elementMap: TilemapElementMap;
  getDefaultSpriteKey?: (position: Position, layer: number) => string | undefined;
};

/**
 * This method renders the tilemap into the canvas.
 */
export function renderTileMap({
  spriteMap,
  schema,
  cameraPosition,
  canvasSizePx,
  tileSizePx,
  timestamp,
  buffer,
  canvas,
  backgroundColor,
  elementMap,
  getDefaultSpriteKey
}: RenderProps): void {
  const { width: canvasWidthPx, height: canvasHeightPx } = canvasSizePx;

  // Resize the canvas and buffer

  canvas.width = canvasWidthPx;
  canvas.height = canvasHeightPx;

  buffer.width = canvasWidthPx;
  buffer.height = canvasHeightPx;

  // Get the 2D contexts

  const bufferCtx = buffer.getContext('2d');
  const ctx = canvas.getContext('2d');

  if (!bufferCtx || !ctx) {
    return;
  }

  // Disable image smoothing

  bufferCtx.imageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  // Sets the background color

  const isValidColor = isValidCSSColor(backgroundColor);
  const bgColor: string =
    isValidColor && backgroundColor ? backgroundColor : DEFAULT_BACKGROUND_COLOR;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvasWidthPx, canvasHeightPx);

  if (schema && spriteMap) {
    // Calculate first and last visible columns and rows

    const firstVisibleRow = Math.floor(-cameraPosition.y / tileSizePx);
    const lastVisibleRow = Math.ceil((canvasHeightPx - cameraPosition.y) / tileSizePx);

    const firstVisibleCol = Math.floor(-cameraPosition.x / tileSizePx);
    const lastVisibleCol = Math.ceil((canvasWidthPx - cameraPosition.x) / tileSizePx);

    // Calculate the max number of layers

    const maxLayers = schema.reduce((max, rows) => {
      const maxRows = rows.reduce((max, layers) => {
        return Math.max(max, layers.length);
      }, 0);

      return Math.max(max, maxRows);
    }, 0);

    // Draw the tilemap based on the schema

    for (let l = 0; l < maxLayers; l++) {
      if (getDefaultSpriteKey) {
        drawLayerWithDefaultSprite(bufferCtx, spriteMap, schema, l, firstVisibleCol, lastVisibleCol, firstVisibleRow, lastVisibleRow, cameraPosition, tileSizePx, timestamp, getDefaultSpriteKey);
      } else {
        drawLayer(bufferCtx, spriteMap, schema, l, firstVisibleCol, lastVisibleCol, firstVisibleRow, lastVisibleRow, cameraPosition, tileSizePx, timestamp);
      }
    }

    // Draw the elements
    const visibleElements = Object.values(elementMap)
      .filter((element) => {
        const isVisible =
          element.tilePosition.y >= firstVisibleRow &&
          element.tilePosition.y <= lastVisibleRow &&
          element.tilePosition.x >= firstVisibleCol &&
          element.tilePosition.x <= lastVisibleCol;
        return isVisible;
      })
      .sort((a, b) => {
        return a.layer - b.layer;
      });

    visibleElements.forEach((element) => {
      const sprite = spriteMap.get(element.spriteKey);
      if (sprite) {
        const spriteSize = sprite.size;
        const spriteWidthPx = spriteSize.width * tileSizePx;
        const spriteHeightPx = spriteSize.height * tileSizePx;
        const spriteX =
          element.tilePosition.x * tileSizePx + cameraPosition.x + tileSizePx * sprite.offset.x;
        const spriteY =
          element.tilePosition.y * tileSizePx + cameraPosition.y + tileSizePx * sprite.offset.y;

        const frame = sprite.getFrame(timestamp);
        bufferCtx.drawImage(
          frame,
          spriteX,
          spriteY - spriteHeightPx + tileSizePx,
          spriteWidthPx,
          spriteHeightPx
        );
      }
    });
  }

  // Draw the buffer to the canvas

  ctx.drawImage(buffer, 0, 0, canvasWidthPx, canvasHeightPx);
}


function drawLayer(
  bufferCtx: CanvasRenderingContext2D,
  spriteMap: SpriteMap,
  schema: string[][][],
  layer: number,
  firstVisibleCol: number,
  lastVisibleCol: number,
  firstVisibleRow: number,
  lastVisibleRow: number,
  cameraPosition: Position,
  tileSizePx: number,
  timestamp: number,
) {
  for (let r = firstVisibleRow; r < lastVisibleRow; r++) {
    const rows = schema[r];
    if (!rows) continue;

    for (let c = firstVisibleCol; c < lastVisibleCol; c++) {
      const layers = rows[c];
      if (!layers) continue;

      const x = c * tileSizePx + cameraPosition.x;
      const y = r * tileSizePx + cameraPosition.y;

      const spriteKey = layers[layer];
      if (spriteKey) {
        const sprite = spriteMap.get(spriteKey);
        if (sprite) {
          const spriteSize = sprite.size;
          const spriteWidthPx = spriteSize.width * tileSizePx;
          const spriteHeightPx = spriteSize.height * tileSizePx;
          const spriteX = x + tileSizePx * sprite.offset.x;
          const spriteY = y + tileSizePx * sprite.offset.y;

          const frame = sprite.getFrame(timestamp);
          bufferCtx.drawImage(
            frame,
            spriteX,
            spriteY - spriteHeightPx + tileSizePx,
            spriteWidthPx,
            spriteHeightPx
          );
        }
      }
    }
  }
}

function drawLayerWithDefaultSprite(
  bufferCtx: CanvasRenderingContext2D,
  spriteMap: SpriteMap,
  schema: string[][][],
  layer: number,
  firstVisibleCol: number,
  lastVisibleCol: number,
  firstVisibleRow: number,
  lastVisibleRow: number,
  cameraPosition: Position,
  tileSizePx: number,
  timestamp: number,
  getDefaultSpriteKey: (position: Position, layer: number) => string | undefined,
) {
  for (let r = firstVisibleRow; r < lastVisibleRow; r++) {
    for (let c = firstVisibleCol; c < lastVisibleCol; c++) {
      const x = c * tileSizePx + cameraPosition.x;
      const y = r * tileSizePx + cameraPosition.y;
      const schemaSpriteKey = getElementFrom3DArray(schema, r, c, layer);

      let sprite;
      if (schemaSpriteKey) {
        sprite = spriteMap.get(schemaSpriteKey);
      } else {
        const defaultSchemaKey = getDefaultSpriteKey({ x: c, y: r }, layer);
        if (defaultSchemaKey) {
          sprite = spriteMap.get(defaultSchemaKey);
        }
      }

      if (sprite) {
        const spriteSize = sprite.size;
        const spriteWidthPx = spriteSize.width * tileSizePx;
        const spriteHeightPx = spriteSize.height * tileSizePx;
        const spriteX = x + tileSizePx * sprite.offset.x;
        const spriteY = y + tileSizePx * sprite.offset.y;

        const frame = sprite.getFrame(timestamp);
        bufferCtx.drawImage(
          frame,
          spriteX,
          spriteY - spriteHeightPx + tileSizePx,
          spriteWidthPx,
          spriteHeightPx
        );
      }
    }
  }
}

