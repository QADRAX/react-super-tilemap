import React, { FunctionComponent, useMemo, useState } from 'react';
import { getDirection } from '../../../utils/positions';
import { ManualElement } from '../ManualElement';
import { ElementSync } from './ElementSync/ElementSync';
import { MotionableElementProps } from './MotionableElement.types';
import { useMotions } from './MotionableElement.useMotions';
import { Position } from '../../../types/Position';

export const MotionableElement: FunctionComponent<MotionableElementProps> = (props) => {
  const {
    tilePosition: nextPosition,
    motionSettings,
    onMotionComplete,
    spriteKey,
    spriteKeyNorthMotion,
    spriteKeySouthMotion,
    spriteKeyWestMotion,
    spriteKeyEastMotion,
  } = props;

  const [elementPosition, setElementPosition] = useState<Position | undefined>(undefined);

  const { currentElementMotion, elementMotionQueue, addElementMotion } = useMotions(
    elementPosition,
    setElementPosition,
    motionSettings,
    onMotionComplete
  );

  const elementSprite = useMemo(() => {
    if (!currentElementMotion || !elementPosition) {
      return spriteKey;
    }
    const motionDirection = getDirection(elementPosition, currentElementMotion.targetPosition);

    switch (motionDirection) {
      case 'north':
        return spriteKeyNorthMotion || spriteKey;
      case 'south':
        return spriteKeySouthMotion || spriteKey;
      case 'west':
        return spriteKeyWestMotion || spriteKey;
      case 'east':
        return spriteKeyEastMotion || spriteKey;
    }
  }, [
    elementPosition,
    currentElementMotion,
    spriteKey,
    spriteKeyNorthMotion,
    spriteKeySouthMotion,
    spriteKeyWestMotion,
    spriteKeyEastMotion,
  ]);

  return (
    <>
      <ElementSync
        currentMotion={currentElementMotion}
        motionQueue={elementMotionQueue}
        nextPostion={nextPosition}
        position={elementPosition}
        addMotion={addElementMotion}
        setPostion={setElementPosition}
      />
      {elementPosition && (
        <ManualElement
          tilePosition={elementPosition}
          spriteKey={elementSprite}
          layer={props.layer}
          elementKey={props.elementKey}
        >
          {props.children}
        </ManualElement>
      )}
    </>
  );
};
