import React, { FunctionComponent, useMemo, useState } from 'react';
import { TilemapElement } from '../../../types/TilemapElement';
import { TilePosition } from '../../../types/TilePosition';
import { ManualElement } from '../ManualElement';
import { ElementSync } from './ElementSync/ElementSync';
import { MotionableElementProps } from './MotionableElement.types';
import { useMotions } from './MotionableElement.useMotions';

export const MotionableElement: FunctionComponent<MotionableElementProps> = (props) => {
  const nextPosition = props.element.tilePosition;
  const [elementPosition, setElementPosition] = useState<TilePosition | undefined>(undefined);

  const {
    currentElementMotion,
    elementMotionQueue,
    addElementMotion,
  } = useMotions(
    elementPosition,
    setElementPosition,
    props.motionSettings,
    props.onMotionComplete
  );

  const element: TilemapElement | undefined = useMemo(() => {
    if (elementPosition) {
      return {
        ...props.element,
        tilePosition: elementPosition,
      };
    } else {
      return undefined;
    }
  }, [elementPosition]);

  return (
    <>
      <ElementSync
        currentMotion={currentElementMotion}
        motionQueue={elementMotionQueue}
        nextPostion={nextPosition}
        position={elementPosition}
        addMotion={addElementMotion}
        setPostion={setElementPosition} />
      {elementPosition && element && (
        <ManualElement element={element} elementKey={props.elementKey}>
          {props.children}
        </ManualElement>
      )}
    </>
  );
};
