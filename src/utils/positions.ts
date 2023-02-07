import { Size } from '../types/Size';
import { TilePosition } from '../types/TilePosition';
import { Position } from '../types/Position';

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

export function getCenteredCameraPosition(
  canvasSize: Size,
  mapSize: Size
): Position {
  const centeredCameraPosition = {
    x: (canvasSize.width - mapSize.width) / 2,
    y: (canvasSize.height - mapSize.height) / 2,
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

export function getDistance(p1: Position, p2: Position): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}
