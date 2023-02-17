import { Position } from '../../../types/Position';
import { getTilePosition } from '../../../utils/positions';
import { useTilemapContext } from '../../../hooks/useTilemapContext';
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
  const { cameraPosition } = state;
  const {
    tileSize,
    mapSize,
  } = computed;

  const getTilePositionByMousePosition = (mousePosition: Position) => {
    if (cameraPosition) {
      const position = getTilePosition(mousePosition, cameraPosition, mapSize, tileSize);
      return position;
    }
    return null;
  };

  const handleClick = (position: Position) => {
      const tilePosition = getTilePositionByMousePosition(position);
      if (tilePosition && contextProps.onTileClick) {
        contextProps.onTileClick(tilePosition);
      }
  };

  const handleDoubleClick = (position: Position) => {
    if (cameraPosition) {
      const tilePosition = getTilePositionByMousePosition(position);
      if (tilePosition && contextProps.onTileDoubleClick) {
        contextProps.onTileDoubleClick(tilePosition);
      }
    }
  };

  const handleContextMenu = (position: Position) => {
    if (cameraPosition) {
      const tilePosition = getTilePositionByMousePosition(position);
      if (tilePosition && contextProps.onTileContextMenu) {
        contextProps.onTileContextMenu(tilePosition);
      }
    }
  };

  return {
    handleClick,
    handleDoubleClick,
    handleContextMenu,
  };
}
