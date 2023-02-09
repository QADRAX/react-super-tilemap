import React, { FunctionComponent } from 'react';
import { TilemapWrapper } from './TilemapWrapper/TilemapWrapper';
import { useCanvasSize } from './TilemapDisplay.useCanvasSize';
import { useDragAndZoomControls } from './TilemapDisplay.useDragAndZoomControls';
import { TilemapCanvas } from './TilemapCanvas/TilemapCanvas';

/**
 * Tilemap's display.
 * 
 * It Mounts the canvas and the HTML controls of the tilemap
 *
 * @internal
 *
 * @param props tilemap props
 */
export const TilemapDisplay: FunctionComponent = (props) => {
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
  } = useDragAndZoomControls();

  return (
    <TilemapWrapper
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      ref={wrapperRef}
    >
      <TilemapCanvas />
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        {props.children}
      </div>
    </TilemapWrapper>
  );
};
