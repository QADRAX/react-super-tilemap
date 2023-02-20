import { Size } from '../types/Size';
import { TilePosition } from '../types/TilePosition';
import { Position } from '../types/Position';
import { MapDimensions } from '../types/MapDimensions';

export function getTilePosition(
  mousePosition: Position,
  cameraTilePosition: TilePosition,
  tileSize: number,
  canvasSize: Size
): TilePosition | null {
  const cameraPosition = getCameraPositionByTilePosition(cameraTilePosition, tileSize, canvasSize);

  const relativeMousePosition: Position = {
    x: mousePosition.x - cameraPosition.x,
    y: mousePosition.y - cameraPosition.y,
  };

  const tilePosition: TilePosition = {
    col: relativeMousePosition.x / tileSize,
    row: relativeMousePosition.y / tileSize,
  };

  return tilePosition;
}

export function floorTilePosition(tilePosition: TilePosition): TilePosition {
  const floorTilePosition: TilePosition = {
    col: Math.floor(tilePosition.col),
    row: Math.floor(tilePosition.row),
  };
  return floorTilePosition;
}

export function isTilePositionValid(
  tilePosition: TilePosition,
  dimensions: MapDimensions
): boolean {
  const isValid =
    tilePosition.col >= 0 &&
    tilePosition.col < dimensions.cols &&
    tilePosition.row >= 0 &&
    tilePosition.row < dimensions.rows;
  return isValid;
}

export function getCenteredCameraPosition(canvasSize: Size, mapSize: Size): Position {
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
    x: tilePosition.col * tileSize + tileSize / 2,
    y: tilePosition.row * tileSize + tileSize / 2,
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

export function getDistance(p1: TilePosition, p2: TilePosition): number {
  const dx = p1.col - p2.col;
  const dy = p1.row - p2.row;
  return Math.sqrt(dx * dx + dy * dy);
}
