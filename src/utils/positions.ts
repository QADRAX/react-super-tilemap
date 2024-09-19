import { Size } from '../types/Size';
import { Position } from '../types/Position';
import { MapDimensions } from '../types/MapDimensions';
import { Direction } from '../types/Directions';

export function getTilePosition(
  mousePosition: Position,
  cameraTilePosition: Position,
  tileSize: number,
  canvasSize: Size
): Position | null {
  const cameraPosition = getCameraPositionByTilePosition(cameraTilePosition, tileSize, canvasSize);

  const relativeMousePosition: Position = {
    x: mousePosition.x - cameraPosition.x,
    y: mousePosition.y - cameraPosition.y,
  };

  const tilePosition: Position = {
    y: relativeMousePosition.y / tileSize,
    x: relativeMousePosition.x / tileSize,
  };

  return tilePosition;
}

export function getAbsolutePosition(
  tilePosition: Position,
  cameraPosition: Position,
  tileSize: number
): Position {
  const relativeTilePosition: Position = {
    x: tilePosition.x * tileSize,
    y: tilePosition.y * tileSize,
  };

  const mousePosition: Position = {
    x: relativeTilePosition.x + cameraPosition.x,
    y: relativeTilePosition.y + cameraPosition.y,
  };

  return mousePosition;
}

export function floorTilePosition(tilePosition: Position): Position {
  const floorTilePosition: Position = {
    y: Math.floor(tilePosition.y),
    x: Math.floor(tilePosition.x),
  };
  return floorTilePosition;
}

export function isTilePositionValid(
  tilePosition: Position,
  dimensions: MapDimensions
): boolean {
  const isValid =
    tilePosition.y >= 0 &&
    tilePosition.y < dimensions.rows &&
    tilePosition.x >= 0 &&
    tilePosition.x < dimensions.cols;
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
): Position {
  const relativeCenterPosition: Position = {
    x: canvasSize.width / 2 - cameraPosition.x,
    y: canvasSize.height / 2 - cameraPosition.y,
  };

  const relativeTilePosition: Position = {
    x: relativeCenterPosition.x / tileSize,
    y: relativeCenterPosition.y / tileSize,
  };

  const tilePosition: Position = {
    y: Math.floor(relativeTilePosition.x),
    x: Math.floor(relativeTilePosition.y),
  };

  return tilePosition;
}

export function getCameraPositionByTilePosition(
  tilePosition: Position,
  tileSize: number,
  canvasSize: Size
): Position {
  const relativeTilePosition: Position = {
    x: tilePosition.x * tileSize + tileSize / 2,
    y: tilePosition.y * tileSize + tileSize / 2,
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

export function getDirection(p1: Position, p2: Position): Direction {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? 'west' : 'east';
  } else {
    return dy > 0 ? 'north' : 'south';
  }
}
