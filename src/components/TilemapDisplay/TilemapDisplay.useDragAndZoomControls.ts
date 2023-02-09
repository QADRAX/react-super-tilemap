import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_DRAG_SENSITIVITY, DEFAULT_ZOOM_INCREMENT, DRAG_DELAY } from '../../constants';
import { Position } from '../../types/Position';
import { getTilePosition } from '../../utils/positions';
import { useTilemapContext } from '../../hooks/useTilemapContext';
import { useInternalContext } from '../../hooks/useInternalContext';
import { _setIsCameraDragging } from '../../Context/TilemapContext.actions';

/**
 * Bind mouse and touch events to drag and zoom logic.
 *
 * @private
 *
 * @param props
 * @returns
 */
export function useDragAndZoomControls() {
  // State from context

  const { state, computed, actions, props } = useTilemapContext();

  const { dispatch } = useInternalContext();

  const { cameraPosition, zoom: currentZoom, isCameraDragging: isDragging } = state;

  const {
    tileSize,
    mapSize,
    isZoomInMotion: isCurrentZoomAnimating,
    isCameraInMotion: isCameraAnimating,
  } = computed;

  const { setCameraPosition, setZoom: setCurrentZoom } = actions;

  const setIsDragging = (value: boolean) => dispatch(_setIsCameraDragging(value));

  // enable/disable drag and zoom flags

  const zoomEnabled = useMemo(() => {
    return props.zoomeable && !isCurrentZoomAnimating;
  }, [props.zoomeable, isCurrentZoomAnimating]);

  const dragEnabled = useMemo(() => {
    return props.draggable && !isCameraAnimating;
  }, [props.draggable, isCameraAnimating]);

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
    if (!dragEnabled && isDragging) {
      setIsDragging(false);
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
    if (isDragging) {
      setIsDragging(false);
      setClickCapture(true);
    }
    setCurrentMousePosition(null);
  };

  const handleMouseMove = (position: Position) => {
    if (isDown && dragEnabled && currentMousePosition && cameraPosition) {
      setIsDragging(true);

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
      let nextZoom = currentZoom;

      if (deltaY < 0) {
        nextZoom = nextZoom + DEFAULT_ZOOM_INCREMENT;
      } else {
        if (currentZoom > 0) {
          nextZoom = nextZoom - DEFAULT_ZOOM_INCREMENT;
        }
      }
      setCurrentZoom(nextZoom);
    }
  };

  const handleClick = (position: Position) => {
    if (cameraPosition && !clickCapture) {
      const tilePosition = getTilePositionByMousePosition(position);
      if (tilePosition && props.onTileClick) {
        props.onTileClick(tilePosition);
      }
    }
  };

  const handleDoubleClick = (position: Position) => {
    if (cameraPosition) {
      const tilePosition = getTilePositionByMousePosition(position);
      if (tilePosition && props.onTileDoubleClick) {
        props.onTileDoubleClick(tilePosition);
      }
    }
  };

  const handleContextMenu = (position: Position) => {
    if (cameraPosition) {
      const tilePosition = getTilePositionByMousePosition(position);
      if (tilePosition && props.onTileContextMenu) {
        props.onTileContextMenu(tilePosition);
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
