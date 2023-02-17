import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_DRAG_SENSITIVITY, DEFAULT_ZOOM_INCREMENT, DRAG_DELAY } from '../../../constants';
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
  },
): EventHandlers {
  // State from context

  const { state, computed, actions, props: contextProps } = useTilemapContext();

  const { cameraPosition, zoom } = state;

  const {
    tileSize,
    mapSize,
  } = computed;

  const { setCameraPosition, setZoom: setCurrentZoom } = actions;

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
    if (cameraPosition) {
      const position = getTilePosition(mousePosition, cameraPosition, mapSize, tileSize);
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
    if (isDown && dragEnabled && currentMousePosition && cameraPosition) {
      props.setIsDragging(true);

      const dragSensivility = props.dragSensitivity || DEFAULT_DRAG_SENSITIVITY;

      const relativeMovementX = (position.x - currentMousePosition.x) * dragSensivility;
      const relativeMovementY = (position.y - currentMousePosition.y) * dragSensivility;

      const nextCameraPosition: Position = {
        x: cameraPosition.x + relativeMovementX,
        y: cameraPosition.y + relativeMovementY,
      };

      setCurrentMousePosition(position);
      setCameraPosition(nextCameraPosition);
    }
  };

  const handleWheel = (deltaY: number) => {
    if (zoomEnabled) {
      let nextZoom = zoom;

      if (deltaY < 0) {
        nextZoom = nextZoom + DEFAULT_ZOOM_INCREMENT;
      } else {
        if (zoom > 0) {
          nextZoom = nextZoom - DEFAULT_ZOOM_INCREMENT;
        }
      }
      setCurrentZoom(nextZoom);
    }
  };

  const handleClick = (position: Position) => {
    if (cameraPosition && !clickCapture) {
      const tilePosition = getTilePositionByMousePosition(position);
      if (tilePosition && contextProps.onTileClick) {
        contextProps.onTileClick(tilePosition);
      }
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
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleWheel,
    handleClick,
    handleDoubleClick,
    handleContextMenu,
  };
}
