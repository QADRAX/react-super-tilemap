import { createContext } from 'react';
import { DEFAULT_TILE_SIZE } from '../constants';
import { Context, ContextState } from '../types/TilemapContext';

export const initialState: ContextState = {
  currentZoom: 0,
  isSpriteMapLoading: false,
  isCameraDragging: false,
  cameraMotionQueue: [],
  zoomMotionQueue: [],
};

const initialContext: Context = {
  state: initialState,
  actions: {
    setCameraPosition: () => {},
    setCurrentZoom: () => {},
    centerCameraOnTilePosition: () => {},
    centerCamera: () => {},
    addCameraMotion: () => {},
    addCameraMotionCenteredOnTilePosition: () => {},
    addCameraMotionCentered: () => {},
  },
  computed: {
    tileSize: DEFAULT_TILE_SIZE,
    mapDimensions: {
      cols: 0,
      rows: 0,
    },
    mapSize: {
      width: 0,
      height: 0,
    },
    isCurrentZoomInMotion: false,
    isCameraInMotion: false,
    isResizing: false,
  },
  props: {
    defaultTileSizePx: DEFAULT_TILE_SIZE,
  },
};

/**
 * Public tilemap context.
 *
 * This context is accessible for the tilemap consumers.
 */
export const PublicTilemapContext = createContext<Context>(initialContext);
