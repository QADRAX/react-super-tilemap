import React, { FunctionComponent, useMemo, useState } from 'react';
import { TilemapElement } from '../../../types/TilemapElement';
import { TilePosition } from '../../../types/TilePosition';
import { ManualElement } from '../ManualElement';
import { MotionableElementProps } from './MotionableElement.types';
import { useMotions } from './MotionableElement.useMotions';

export const MotionableElement: FunctionComponent<MotionableElementProps> = (props) => {
  const [elementPosition, setElementPosition] = useState<TilePosition | undefined>(undefined);

  useMotions(
    props.element.tilePosition,
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
      {elementPosition && element && (
        <ManualElement element={element} elementKey={props.elementKey}>
          {props.children}
        </ManualElement>
      )}
    </>
  );
};
