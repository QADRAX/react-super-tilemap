import React, { FunctionComponent } from 'react';
import { Controls } from './Controls/Controls';
import { TilemapDisplayProps as TilemapDisplayProps } from '../../../types/TilemapDisplay';
import { useCanvasSize } from './TilemapDisplay.syncSize';
import { useDragAndZoomControls } from './TilemapDisplay.useControls';
import { Canvas } from './Canvas/Canvas';

/**
 * Mounts the canvas and the HTML controls of the tilemap
 *
 * @internal
 *
 * @param props tilemap props
 */
export const TilemapDisplay: FunctionComponent<TilemapDisplayProps> = (props) => {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  useCanvasSize(wrapperRef);

  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleWheel,
    handleClick,
    handleDoubleClick,
    handleContextMenu,
  } = useDragAndZoomControls({
    dragSensitivity: props.settings?.dragSensitivity,
    onTileClick: props.onTileClick,
    onTileDoubleClick: props.onTileDoubleClick,
    onTileContextMenu: props.onTileContextMenu,
    zoomeable: props.zoomeable ?? true,
    dragable: props.draggable ?? true,
  });

  return (
    <Controls
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      ref={wrapperRef}
    >
      <Canvas backgroundColor={props.settings?.backgroundColor} />
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        {props.children}
      </div>
    </Controls>
  );
};
