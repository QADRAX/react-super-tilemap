import { createContext, Dispatch } from 'react';
import { TilemapActions } from './TilemapContext.actions';

export type InternalContext = {
  dispatch: Dispatch<TilemapActions>;
};

const initialContext: InternalContext = {
  dispatch: () => {},
};

/**
 * Internal tilemap context.
 *
 * This context is accessible only for the tilemap components.
 */
export const InternalTilemapContext = createContext<InternalContext>(initialContext);
