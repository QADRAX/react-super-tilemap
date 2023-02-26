import React, { FunctionComponent } from 'react';
import { ElementSync } from './ElementSync/ElementSync';
import { ElementWrapper } from './ElmentWrapper/ElementWrapper';
import { ManualElementProps } from './ManualElement.types';

export const ManualElement: FunctionComponent<ManualElementProps> = (props) => {
  return (
    <>
      <ElementSync {...props} />
      <ElementWrapper tilePosition={props.tilePosition}>{props.children}</ElementWrapper>
    </>
  );
};
