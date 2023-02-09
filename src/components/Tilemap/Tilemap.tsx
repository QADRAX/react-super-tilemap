import React, { FunctionComponent } from 'react';
import { Controls } from './Controls/Controls';
import { TilemapProps } from '../../types/Tilemap';
import { useCanvasSize } from './Tilemap.syncSize';
import { useDragAndZoomControls } from './Tilemap.useControls';
import { Canvas } from './Canvas/Canvas';

/**
 * Tilemap's main component
 *
 * @public
 *
 * @param props tilemap props
 */
export const Tilemap: FunctionComponent<TilemapProps> = (props) => {
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
