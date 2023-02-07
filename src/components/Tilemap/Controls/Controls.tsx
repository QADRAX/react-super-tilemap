import React from 'react';
import { Position } from '../../../types/Position';

export type ControlsProps = {
  children: React.ReactNode;
  onMouseDown: (mousePosition: Position) => void;
  onMouseMove: (mousePosition: Position) => void;
  onMouseUp: () => void;
  onWheel: (deltaY: number) => void;
  onClick: (mousePosition: Position) => void;
  onContextMenu: (mousePosition: Position) => void;
  onDoubleClick: (mousePosition: Position) => void;
};

type ControlEvent =
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.TouchEvent<HTMLDivElement>
  | React.WheelEvent<HTMLDivElement>;

function getDataFromEvent(event: ControlEvent): {
  mousePosition: Position;
  deltaY?: number;
} {
  const bounds = event.currentTarget.getBoundingClientRect();

  const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
  const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;

  const x = clientX - bounds.left;
  const y = clientY - bounds.top;

  const position: Position = { x, y };

  if ('deltaY' in event) {
    return { mousePosition: position, deltaY: event.deltaY };
  }

  return { mousePosition: position };
}

/**
 * Wrapper for the Tilemap.
 *
 * It handles mouse and touch events and forwards them to the Tilemap.
 *
 * @internal
 */
const Controls = React.forwardRef<HTMLDivElement, ControlsProps>((props, wrapperRef) => {
  // Events

  const onMouseDown = (event: ControlEvent) => {
    const { mousePosition } = getDataFromEvent(event);
    props.onMouseDown(mousePosition);
  };

  const onMouseMove = (event: ControlEvent) => {
    const { mousePosition } = getDataFromEvent(event);
    props.onMouseMove(mousePosition);
  };

  const onMouseUp = () => {
    props.onMouseUp();
  };

  const onWheel = (event: ControlEvent) => {
    event.stopPropagation();
    const { deltaY } = getDataFromEvent(event);
    if (deltaY) {
      props.onWheel(deltaY);
    }
  };

  const onClick = (event: ControlEvent) => {
    event.stopPropagation();

    const { mousePosition } = getDataFromEvent(event);

    props.onClick(mousePosition);
  };

  const onDoubleClick = (event: ControlEvent) => {
    event.stopPropagation();

    const { mousePosition } = getDataFromEvent(event);
    props.onDoubleClick(mousePosition);
  };

  const onContextMenu = (event: ControlEvent) => {
    event.preventDefault();

    const { mousePosition } = getDataFromEvent(event);
    props.onContextMenu(mousePosition);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
      onTouchStart={onMouseDown}
      onTouchMove={onMouseMove}
      onTouchEnd={onMouseUp}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      ref={wrapperRef}
    >
      {props.children}
    </div>
  );
});

Controls.displayName = 'Controls';

export { Controls };
