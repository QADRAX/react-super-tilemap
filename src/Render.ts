import { Size } from "./types/Size";
import { DEFAULT_BACKGROUND_COLOR } from "./constants";
import { SpriteMap } from "./Sprite";
import { isValidCSSColor } from "./utils";
import { Position } from "./types/Position";

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
}: RenderProps): void {
    const {
        width: canvasWidthPx,
        height: canvasHeightPx
    } = canvasSizePx;

    // Resize the canvas and buffer

    canvas.width = canvasWidthPx;
    canvas.height = canvasHeightPx;

    buffer.width = canvasWidthPx;
    buffer.height = canvasHeightPx;

    // Get the 2D contexts

    const bufferCtx = buffer.getContext("2d");
    const ctx = canvas.getContext("2d");


    if (!bufferCtx || !ctx) {
        return;
    }

    // Disable image smoothing

    bufferCtx.imageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    // Sets the background color

    const isValidColor = isValidCSSColor(backgroundColor);
    const bgColor: string = isValidColor && backgroundColor
        ? backgroundColor
        : DEFAULT_BACKGROUND_COLOR;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidthPx, canvasHeightPx);

    if (schema && spriteMap) {

        // Draw the tilemap to the buffer. Only visible tiles are drawn.

        const firstVisibleCol = Math.floor(-cameraPosition.x / tileSizePx);
        const lastVisibleCol = Math.ceil((canvasWidthPx - cameraPosition.x) / tileSizePx);

        const maxLayers = schema.reduce((max, rows) => {
            const maxRows = rows.reduce((max, layers) => {
                return Math.max(max, layers.length);
            }, 0);

            return Math.max(max, maxRows);
        }, 0);

        for (let l = 0; l < maxLayers; l++) {
            for (let c = firstVisibleCol; c < lastVisibleCol; c++) {
                const rows = schema[c];

                if (!rows) {
                    continue;
                }

                const firstVisibleRow = Math.floor(-cameraPosition.y / tileSizePx);
                const lastVisibleRow = Math.ceil((canvasHeightPx - cameraPosition.y) / tileSizePx);

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

                            const frame = sprite.getFrame(timestamp);
                            bufferCtx.drawImage(
                                frame,
                                x,
                                y - spriteHeightPx + tileSizePx,
                                spriteWidthPx,
                                spriteHeightPx
                            );
                        }
                    }
                }
            }
        }

    }

    // Draw the buffer to the canvas

    ctx.drawImage(buffer, 0, 0, canvasWidthPx, canvasHeightPx);
}