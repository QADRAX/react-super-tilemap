import React from 'react';
import { getDataFromEvent } from './TilemapWrapper.helper';
import { ControlEvent, TilemapWrapperProps } from './TilemapWrapper.types';

/**
 * Tilemap's wrapper.
 *
 * It handles mouse and touch events and forwards them to the Tilemap.
 *
 * @internal
 */
const TilemapWrapper = React.forwardRef<HTMLDivElement, TilemapWrapperProps>(
  (props, wrapperRef) => {
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
          position: 'relative',
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
  }
);

TilemapWrapper.displayName = 'TilemapWrapper';

export { TilemapWrapper };
