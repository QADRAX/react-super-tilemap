import { Size } from '../types/Size';
import { DEFAULT_BACKGROUND_COLOR } from '../constants';
import { isValidCSSColor } from '../utils/colors';
import { Position } from '../types/Position';
import { SpriteMap } from '../types/Sprite';
import { TilemapElementMap } from '../types/TilemapElement';

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

    const firstVisibleCol = Math.floor(-cameraPosition.x / tileSizePx);
    const lastVisibleCol = Math.ceil((canvasWidthPx - cameraPosition.x) / tileSizePx);

    const firstVisibleRow = Math.floor(-cameraPosition.y / tileSizePx);
    const lastVisibleRow = Math.ceil((canvasHeightPx - cameraPosition.y) / tileSizePx);

    // Calculate the max number of layers

    const maxLayers = schema.reduce((max, rows) => {
      const maxRows = rows.reduce((max, layers) => {
        return Math.max(max, layers.length);
      }, 0);

      return Math.max(max, maxRows);
    }, 0);

    // Draw the tilemap based on the schema

    for (let l = 0; l < maxLayers; l++) {
      for (let c = firstVisibleCol; c < lastVisibleCol; c++) {
        const rows = schema[c];

        if (!rows) {
          continue;
        }

        for (let r = firstVisibleRow; r < lastVisibleRow; r++) {
          const layers = rows[r];

          if (!layers) {
            continue;
          }

          const x = c * tileSizePx + cameraPosition.x;
          const y = r * tileSizePx + cameraPosition.y;

          const spriteKey = layers[l];
          if (spriteKey) {
            const sprite = spriteMap.get(spriteKey);

            if (sprite) {
              const spriteSize = sprite.size;
              const spriteWidthPx = spriteSize.width * tileSizePx;
              const spriteHeightPx = spriteSize.height * tileSizePx;
              const spriteX = x + tileSizePx * sprite.offset.col;
              const spriteY = y + tileSizePx * sprite.offset.row;

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

    // Draw the elements
    const visibleElements = Object.values(elementMap)
      .filter((element) => {
        const isVisible =
          element.tilePosition.col >= firstVisibleCol &&
          element.tilePosition.col <= lastVisibleCol &&
          element.tilePosition.row >= firstVisibleRow &&
          element.tilePosition.row <= lastVisibleRow;
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
          element.tilePosition.col * tileSizePx + cameraPosition.x + tileSizePx * sprite.offset.col;
        const spriteY =
          element.tilePosition.row * tileSizePx + cameraPosition.y + tileSizePx * sprite.offset.row;

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
