import { createContext } from 'react';
import { DEFAULT_TILE_SIZE } from '../../../constants';
import { Context, ContextState } from './TilemapContext.types';

export const initialState: ContextState = {
  zoom: 0,
  isSpriteMapLoading: false,
  elementMap: {},
};

const initialContext: Context = {
  state: initialState,
  actions: {
    setCameraPosition: () => {},
    setZoom: () => {},
    setCanvasSize: () => {},
    setTilemapElement: () => {},
  },
  computed: {
    tileSize: DEFAULT_TILE_SIZE,
    mapDimensions: {
      rows: 0,
      cols: 0,
    },
    mapSize: {
      width: 0,
      height: 0,
    },
    isResizing: false,
    isZooming: false,
  },
  props: {},
};

/**
 * Public tilemap context.
 *
 * This context is accessible for the tilemap consumers.
 */
export const TilemapContext = createContext<Context>(initialContext);
