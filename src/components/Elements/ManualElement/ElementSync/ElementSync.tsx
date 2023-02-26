import React from 'react';
import { TilemapElement } from '../../../../types/TilemapElement';
import { isEqual } from '../../../../utils/deepCompare';
import { TilemapContext } from '../../../Tilemap/TilemapContext/TilemapContext';
import { ManualElementProps } from '../ManualElement.types';

/**
 * Syncs the element with the tilemap context.
 */
export class ElementSync extends React.PureComponent<ManualElementProps> {
  static contextType = TilemapContext;
  context!: React.ContextType<typeof TilemapContext>;

  componentDidUpdate(prevProps: Readonly<ManualElementProps>): void {
    const prevElement: TilemapElement = {
      tilePosition: prevProps.tilePosition,
      spriteKey: prevProps.spriteKey,
      layer: prevProps.layer,
    };

    const nextElement: TilemapElement = {
      tilePosition: this.props.tilePosition,
      spriteKey: this.props.spriteKey,
      layer: this.props.layer,
    };

    const isDifferentElement = !isEqual(prevElement, nextElement);
    const isDifferentKey = prevProps.elementKey !== this.props.elementKey;

    if (isDifferentElement) {
      this.syncElement();
      if (isDifferentKey) {
        this.deleteElement(prevProps.elementKey);
      }
    }
  }

  componentDidMount(): void {
    this.syncElement();
  }

  componentWillUnmount(): void {
    this.deleteElement(this.props.elementKey);
  }

  private syncElement() {
    const element: TilemapElement = {
      tilePosition: this.props.tilePosition,
      spriteKey: this.props.spriteKey,
      layer: this.props.layer,
    };

    const { elementKey } = this.props;
    const { actions } = this.context;

    actions.setTilemapElement(elementKey, element);
  }

  private deleteElement(elementKey: string) {
    const { actions } = this.context;

    actions.setTilemapElement(elementKey, undefined);
  }

  render() {
    return null;
  }
}
