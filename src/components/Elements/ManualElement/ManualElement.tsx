import React, { FunctionComponent } from 'react';
import { ElementSync } from './ElementSync/ElementSync';
import { ElementWrapper } from './ElmentWrapper/ElementWrapper';
import { ManualElementProps } from './ManualElement.types';

export const ManualElement: FunctionComponent<ManualElementProps> = (props) => {
  const { tilePosition } = props.element;

  return (
    <>
      <ElementSync {...props} />
      <ElementWrapper tilePosition={tilePosition}>{props.children}</ElementWrapper>
    </>
  );
};
