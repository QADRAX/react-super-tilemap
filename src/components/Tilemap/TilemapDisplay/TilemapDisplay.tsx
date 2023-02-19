import React, { FunctionComponent } from 'react';
import { TilemapWrapper } from './TilemapWrapper/TilemapWrapper';
import { useCanvasSize } from './TilemapDisplay.useCanvasSize';
import { TilemapCanvas } from './TilemapCanvas/TilemapCanvas';
import { tilemapEventChannel } from '../../../EventBus/TilemapEventChannel';
import { Position } from '../../../types/Position';

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

  const emitOnWheel = (deltaY: number) => tilemapEventChannel.emit('onWheel', deltaY);
  const emitOnMouseDown = (mousePosition: Position) =>
    tilemapEventChannel.emit('onMouseDown', mousePosition);
  const emitOnMouseUp = () => tilemapEventChannel.emit('onMouseUp');
  const emitOnMouseMove = (mousePosition: Position) =>
    tilemapEventChannel.emit('onMouseMove', mousePosition);
  const emitOnClick = (mousePosition: Position) =>
    tilemapEventChannel.emit('onClick', mousePosition);
  const emitOnDoubleClick = (mousePosition: Position) =>
    tilemapEventChannel.emit('onDoubleClick', mousePosition);
  const emitOnContextMenu = (mousePosition: Position) =>
    tilemapEventChannel.emit('onContextMenu', mousePosition);

  return (
    <TilemapWrapper
      onWheel={emitOnWheel}
      onMouseDown={emitOnMouseDown}
      onMouseUp={emitOnMouseUp}
      onMouseMove={emitOnMouseMove}
      onClick={emitOnClick}
      onDoubleClick={emitOnDoubleClick}
      onContextMenu={emitOnContextMenu}
      ref={wrapperRef}
    >
      <TilemapCanvas />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        {props.children}
      </div>
    </TilemapWrapper>
  );
};
