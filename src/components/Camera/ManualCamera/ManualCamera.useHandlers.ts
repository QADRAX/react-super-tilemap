import { useRef } from 'react';
import { Position } from '../../../types/Position';
import { floorTilePosition, getTilePosition, isTilePositionValid } from '../../../utils/positions';
import { useTilemapContext } from '../../Tilemap/TilemapContext/useTilemapContext';
import { EventHandlers } from '../CameraEventListener/CameraEventListener.types';

/**
 * Bind mouse and touch events to drag and zoom logic.
 *
 * @private
 *
 * @param props
 * @returns
 */
export function useHandlers(): Partial<EventHandlers> {
  const { state, computed, props: contextProps } = useTilemapContext();
  const { cameraPosition, canvasSize } = state;
  const { tileSize, mapDimensions } = computed;

  const lastHoveredTileRef = useRef<Position | null>(null);

  const getTilePositionByMousePosition = (mousePosition: Position) => {
    if (cameraPosition && canvasSize) {
      const position = getTilePosition(mousePosition, cameraPosition, tileSize, canvasSize);
      return position;
    }
    return null;
  };

  const handleMouseMove = (position: Position) => {
    const tilePosition = getTilePositionByMousePosition(position);
    if (!tilePosition) return;

    const result = floorTilePosition(tilePosition);
    const last = lastHoveredTileRef.current;

    const isValid = isTilePositionValid(result, mapDimensions);

    if (!isValid) {
      if (last !== null) {
        contextProps.onTileHoverOut?.(last);
        lastHoveredTileRef.current = null;
      }
      return;
    }

    if (!last || last.x !== result.x || last.y !== result.y) {
      if (last) {
        contextProps.onTileHoverOut?.(last);
      }
      contextProps.onTileHover?.(result);
      lastHoveredTileRef.current = result;
    }
  };

  const handleClick = (position: Position) => {
    const tilePosition = getTilePositionByMousePosition(position);
    if (tilePosition) {
      const result = floorTilePosition(tilePosition);
      if (isTilePositionValid(result, mapDimensions)) {
        contextProps.onTileClick?.(result);
      }
      contextProps.onTilemapClick?.(result);
    }
  };

  const handleDoubleClick = (position: Position) => {
    if (cameraPosition) {
      const tilePosition = getTilePositionByMousePosition(position);
      if (tilePosition) {
        const result = floorTilePosition(tilePosition);
        if (isTilePositionValid(result, mapDimensions)) {
          contextProps.onTileDoubleClick?.(result);
        }
        contextProps.onTilemapDoubleClick?.(result);
      }
    }
  };

  const handleContextMenu = (position: Position) => {
    if (cameraPosition) {
      const tilePosition = getTilePositionByMousePosition(position);
      if (tilePosition) {
        const result = floorTilePosition(tilePosition);
        if (isTilePositionValid(result, mapDimensions)) {
          contextProps.onTileContextMenu?.(result);
        }
        contextProps.onTilemapContextMenu?.(result);
      }
    }
  };

  return {
    handleClick,
    handleDoubleClick,
    handleContextMenu,
    handleMouseMove,
  };
}
