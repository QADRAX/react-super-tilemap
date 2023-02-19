import React from 'react';
import { TilemapContext } from '../../Tilemap/TilemapContext/TilemapContext';
import { ManualElementProps } from './ManualElement.types';

export class ManualElement extends React.PureComponent<ManualElementProps> {
  static contextType = TilemapContext;
  context!: React.ContextType<typeof TilemapContext>;

  componentDidUpdate(prevProps: Readonly<ManualElementProps>): void {
    const isDifferentElement = prevProps.element !== this.props.element;
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
    const { element, elementKey } = this.props;
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
