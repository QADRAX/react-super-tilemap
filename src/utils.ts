import { MapDimensions } from './types/MapDimensions';
import { Size } from './types/Size';
import { TilePosition } from './types/TilePosition';
import { DEFAULT_TILE_SIZE, ZOOM_RATIO } from './constants';
import { Position } from './types/Position';

export function getTileSize(zoom: number, tileSize: number = DEFAULT_TILE_SIZE): number {
  return tileSize * Math.pow(ZOOM_RATIO, zoom);
}

export function getMapSize(mapDimensions: MapDimensions, tileSize: number): Size {
  const width = mapDimensions.cols * tileSize;
  const height = mapDimensions.rows * tileSize;

  return {
    width,
    height,
  };
}

export function getMapDimensions(schema?: string[][][]): MapDimensions {
  if (!schema) {
    return {
      cols: 0,
      rows: 0,
    };
  }
  const cols = schema.length;
  const rows = schema[0]?.length ?? 0;

  const dims: MapDimensions = {
    cols,
    rows,
  };
  return dims;
}

export function getTilePosition(
  mousePosition: Position,
  cameraPosition: Position,
  tilemapSize: Size,
  tileSize: number
): TilePosition | null {
  const relativeMousePosition: Position = {
    x: mousePosition.x - cameraPosition.x,
    y: mousePosition.y - cameraPosition.y,
  };

  const relativeTilePosition: Position = {
    x: relativeMousePosition.x / tileSize,
    y: relativeMousePosition.y / tileSize,
  };

  const tilePosition: TilePosition = {
    col: Math.floor(relativeTilePosition.x),
    row: Math.floor(relativeTilePosition.y),
  };

  const isTilePositionValid =
    tilePosition.col >= 0 &&
    tilePosition.col < tilemapSize.width / tileSize &&
    tilePosition.row >= 0 &&
    tilePosition.row < tilemapSize.height / tileSize;

  if (!isTilePositionValid) {
    return null;
  }

  return tilePosition;
}

export function getCenteredCameraPosition(canvas: Size, map: Size): Position {
  const centeredCameraPosition = {
    x: (canvas.width - map.width) / 2,
    y: (canvas.height - map.height) / 2,
  };
  return centeredCameraPosition;
}

export function getCenteredTilePositionByCameraPosition(
  cameraPosition: Position,
  tileSize: number,
  canvasSize: Size
): TilePosition {
  const relativeCenterPosition: Position = {
    x: canvasSize.width / 2 - cameraPosition.x,
    y: canvasSize.height / 2 - cameraPosition.y,
  };

  const relativeTilePosition: Position = {
    x: relativeCenterPosition.x / tileSize,
    y: relativeCenterPosition.y / tileSize,
  };

  const tilePosition: TilePosition = {
    col: Math.floor(relativeTilePosition.x),
    row: Math.floor(relativeTilePosition.y),
  };

  return tilePosition;
}

export function getCameraPositionByTilePosition(
  tilePosition: TilePosition,
  tileSize: number,
  canvasSize: Size
): Position {
  const relativeTilePosition: Position = {
    x: tilePosition.col * tileSize,
    y: tilePosition.row * tileSize,
  };

  const relativeCenterPosition: Position = {
    x: canvasSize.width / 2,
    y: canvasSize.height / 2,
  };

  const cameraPosition: Position = {
    x: relativeCenterPosition.x - relativeTilePosition.x,
    y: relativeCenterPosition.y - relativeTilePosition.y,
  };

  return cameraPosition;
}

export function isValidCSSColor(color?: string): boolean {
  if (!color) return false;
  const s = new Option().style;
  s.color = color;
  return s.color === color;
}

export function getDistance(p1: Position, p2: Position): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}
