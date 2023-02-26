import React, { FunctionComponent, useState } from 'react';
import { TilePosition } from '../../../types/TilePosition';
import { ManualElement } from '../ManualElement';
import { ElementSync } from './ElementSync/ElementSync';
import { MotionableElementProps } from './MotionableElement.types';
import { useMotions } from './MotionableElement.useMotions';

export const MotionableElement: FunctionComponent<MotionableElementProps> = (props) => {
  const nextPosition = props.tilePosition;
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

  return (
    <>
      <ElementSync
        currentMotion={currentElementMotion}
        motionQueue={elementMotionQueue}
        nextPostion={nextPosition}
        position={elementPosition}
        addMotion={addElementMotion}
        setPostion={setElementPosition} />
      {elementPosition && (
        <ManualElement tilePosition={elementPosition} 
          spriteKey={props.spriteKey} 
          layer={props.layer} 
          elementKey={props.elementKey}>
          {props.children}
        </ManualElement>
      )}
    </>
  );
};
