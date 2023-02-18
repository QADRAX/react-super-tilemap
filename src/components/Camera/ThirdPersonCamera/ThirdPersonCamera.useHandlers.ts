import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_DRAG_SENSITIVITY, DEFAULT_ZOOM_INCREMENT, DRAG_DELAY } from '../../../constants';
import { Position } from '../../../types/Position';
import { floorTilePosition, getTilePosition, isTilePositionValid } from '../../../utils/positions';
import { useTilemapContext } from '../../Tilemap/TilemapContext/useTilemapContext';
import { EventHandlers } from '../CameraEventListener/CameraEventListener.types';
import { TilePosition } from '../../../types/TilePosition';

/**
 * Bind mouse and touch events to drag and zoom logic.
 *
 * @private
 *
 * @param props
 * @returns
 */
export function useHandlers(
  props: {
    draggable?: boolean;
    zoomeable?: boolean;
    dragSensitivity?: number;
    zoomIncrement?: number;
    isCameraDragging: boolean;
    setIsDragging: (value: boolean) => void;
    isZoomInMotion: boolean;
    isCameraInMotion: boolean;
    cameraPosition: TilePosition | undefined;
    zoom: number;
    setCameraPosition: (position: TilePosition | undefined) => void;
    setZoom: (zoom: number) => void;
  },
): EventHandlers {
  // State from context

  const { state, computed, props: contextProps } = useTilemapContext();

  const {
    canvasSize,
  } = state;

  const {
    cameraPosition,
    zoom,
    setCameraPosition,
    setZoom,
  } = props;

  const {
    tileSize,
    mapDimensions,
  } = computed;

  // enable/disable drag and zoom flags

  const zoomEnabled = useMemo(() => {
    return props.zoomeable && !props.isZoomInMotion;
  }, [props.zoomeable, props.isZoomInMotion]);

  const dragEnabled = useMemo(() => {
    return props.draggable && !props.isCameraInMotion;
  }, [props.draggable, props.isCameraInMotion]);

  // Internal state

  const [clickCapture, setClickCapture] = useState<boolean>(false);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [currentMousePosition, setCurrentMousePosition] = useState<Position | null>(null);

  // Prevent click event from firing when dragging

  useEffect(() => {
    let timeoutId: number | undefined = undefined;
    if (clickCapture) {
      timeoutId = window.setTimeout(() => {
        setClickCapture(false);
      }, DRAG_DELAY);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [clickCapture]);

  useEffect(() => {
    if (!dragEnabled && props.isCameraDragging) {
      props.setIsDragging(false);
      setCurrentMousePosition(null);
    }
  }, [dragEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

  const getTilePositionByMousePosition = (mousePosition: Position) => {
    if (cameraPosition && canvasSize) {
      const position = getTilePosition(mousePosition, cameraPosition, tileSize, canvasSize);
      return position;
    }
    return null;
  };

  const handleMouseDown = (position: Position) => {
    if (dragEnabled) {
      setIsDown(true);
      setCurrentMousePosition(position);
    }
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (props.isCameraDragging) {
      props.setIsDragging(false);
      setClickCapture(true);
    }
    setCurrentMousePosition(null);
  };

  const handleMouseMove = (position: Position) => {
    const nextTilePosition = getTilePositionByMousePosition(position);
    const prevTilePosition = getTilePositionByMousePosition(currentMousePosition || position);
    if (isDown && dragEnabled && currentMousePosition && cameraPosition && nextTilePosition && prevTilePosition) {
      props.setIsDragging(true);

      const dragSensivility = props.dragSensitivity || DEFAULT_DRAG_SENSITIVITY;

      const relativeMovementX = (nextTilePosition.col - prevTilePosition.col) * dragSensivility;
      const relativeMovementY = (nextTilePosition.row - prevTilePosition.row) * dragSensivility;

      const nextCameraPosition: TilePosition = {
        col: cameraPosition.col - relativeMovementX,
        row: cameraPosition.row - relativeMovementY,
      };

      setCurrentMousePosition(position);
      setCameraPosition(nextCameraPosition);
    }
  };

  const increment = props.zoomIncrement || DEFAULT_ZOOM_INCREMENT;
  const handleWheel = (deltaY: number) => {
    if (zoomEnabled) {
      let nextZoom = zoom;

      if (deltaY < 0) {
        nextZoom = nextZoom + increment;
      } else {
          nextZoom = nextZoom - increment;
      }
      setZoom(nextZoom);
    }
  };

  const handleClick = (position: Position) => {
    if (cameraPosition && !clickCapture) {
      const tilePosition = getTilePositionByMousePosition(position);
      if (tilePosition) {
        const result = floorTilePosition(tilePosition);
        if (isTilePositionValid(result, mapDimensions)) {
          contextProps.onTileClick?.(result);
        }
        contextProps.onTilemapClick?.(result)
      }
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
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleWheel,
    handleClick,
    handleDoubleClick,
    handleContextMenu,
  };
}
