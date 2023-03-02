import React, { FunctionComponent, useEffect } from 'react';
import { ManualElement, ThirdPersonCamera } from '../../../components';
import { Tilemap } from '../../../components/Tilemap/Tilemap';
import { defaulThridPersonCameraArgs, defaultTilemapArgs } from '../../__defaultArgs__';
import { getFullfilledSchema } from '../../__MapGenerator__';

export type DemoManualElementProps = {
  rows: number;
  cols: number;
  baseSprite: string;
  elementSprite: string;
  elementCol: number;
  elementRow: number;
};

export const DemoManualElement: FunctionComponent<DemoManualElementProps> = (props) => {
  const initialSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 1);
  const [schema, setSchema] = React.useState(initialSchema);

  useEffect(() => {
    const newSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 1);
    setSchema(newSchema);
  }, [props.cols, props.rows, props.baseSprite]);

  return (
    <Tilemap {...defaultTilemapArgs} tilmapScheme={schema}>
      <ThirdPersonCamera {...defaulThridPersonCameraArgs}></ThirdPersonCamera>
      <ManualElement
        tilePosition={{
          col: props.elementCol,
          row: props.elementRow,
        }}
        spriteKey={props.elementSprite}
        layer={1}
        elementKey='element1'
      >
        <label
          style={{
            fontSize: 'calc(var(--tile-size) / 8)',
            position: 'absolute',
            backgroundColor: 'bisque',
            bottom: 0,
          }}
        >
          {'Element 1'}
        </label>
      </ManualElement>
    </Tilemap>
  );
};
