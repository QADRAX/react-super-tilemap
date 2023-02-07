import { SpriteMap } from '../classes/Sprite';
import { MapDimensions } from './MapDimensions';
import {
  CameraMotionRequest,
  CameraMotion,
  ZoomMotionRequest,
  ZoomMotion,
  MotionSettings,
} from './Motions';
import { Position } from './Position';
import { Size } from './Size';
import { TilePosition } from './TilePosition';

/**
 * Tilemap context state.
 *
 * @public
 */
export type ContextState = {
  /**
   * Camera position in the tilemap.
   */
  cameraPosition?: Position;
  /**
   * Current camera motion is being taken.
   */
  currentCameraMotion?: CameraMotion;
  /**
   * Flag to indicate if the camera is being moving by the user dragging the map.
   *
   * This flag is used to prevent running camera motions while the user is dragging the map.
   */
  isCameraDragging: boolean;
  /**
   * Camera motion queue.
   */
  cameraMotionQueue: CameraMotionRequest[];
  /**
   * Current zoom level.
   */
  zoom: number;
  /**
   * Current zoom motion is being taken.
   */
  currentZoomMotion?: ZoomMotion;
  /**
   * Zoom motion queue.
   */
  zoomMotionQueue: ZoomMotionRequest[];
  /**
   * Sprite map.
   *
   * This object contains all the sprites that can be used in the tilemap.
   */
  spriteMap?: SpriteMap;
  /**
   * Flag to indicate if the sprite map is loading.
   *
   * This flag is used to prevent the tilemap from rendering before the sprite map is completely loaded.
   *
   * @remarks
   * Any errors that occur while loading the sprite map will be thrown via component event.
   */
  isSpriteMapLoading: boolean;
  /**
   * Size of the canvas in pixels.
   */
  canvasSize?: Size;
};

/**
 * Set of actions tilemap consumers can use to interact with the tilemap.
 */
export type ContextActions = {
  /**
   * Sets the camera position to the given position
   *
   * @param position position to move the camera to
   */
  setCameraPosition: (position: Position) => void;
  /**
   * Centers the camera on the given tile position.
   *
   * @throws Error if the canvas has no size.
   *
   * @param tilePosition tile position to center the camera on
   */
  centerCameraOnTilePosition: (tilePosition: TilePosition) => void;
  /**
   * Centers the camera in the middle of the tilemap.
   *
   * @throws Error if the canvas has no size.
   */
  centerCamera: () => void;
  /**
   * Sets the current zoom level to the given zoom level
   * If the zoom level is less than 0, it will be set to 0.
   *
   * @param zoom zoom level
   */
  setCurrentZoom: (zoom: number) => void;
  /**
   * Adds a camera motion to the camera motion stack.
   *
   * @param motionRequest motion request
   * @param position position to move the camera to
   *
   * @throws Error if the canvas has no size.
   */
  addCameraMotion: (
    settings: MotionSettings,
    position: Position,
  ) => void;
  /**
   * Adds a camera motion centered on the given tile position to the camera motion stack.
   *
   * @param settings motion settings
   * @param tilePosition tile position to center the camera on
   *
   * @throws Error if the canvas has no size.
   */
  addCameraMotionCenteredOnTilePosition: (
    settings: MotionSettings,
    tilePosition: TilePosition
  ) => void;
  /**
   * Centers the camera in the middle of the tilemap using a camera motion.
   *
   * @param settings motion settings
   *
   * @throws Error if the canvas has no size.
   */
  addCameraMotionCentered: (settings: MotionSettings) => void;
  /**
   * Adds a zoom motion to the zoom motion stack.
   * If the zoom level is less than 0, it will be set to 0.
   * 
   * @param settings motion settings
   * @param targetZoom target zoom level
   * @returns 
   */
  addZoomMotion: (
    settings: MotionSettings,
    targetZoom: number,
  ) => void;
};

/**
 * Set of computed values from current state usful for tilemap consumers.
 */
export type ContextComputedState = {
  /**
   * Current size of a tile in pixels.
   * This is computed from default tile size and current zoom.
   */
  tileSize: number;
  /**
   * Current dimensions (number of rows and columns) of the tilemap.
   * This is computed from given sprite schema.
   */
  mapDimensions: MapDimensions;
  /**
   * Current size of the tilemap in pixels.
   * This is computed from map dimensions and tile size.
   */
  mapSize: Size;
  /**
   * Current tile position where the camera is centered.
   */
  cameraCenteredTilePosition?: TilePosition;
  /**
   * Indicates if the camera is beeing in a motion.
   */
  isCameraInMotion: boolean;
  /**
   * Indicates if zoom is beeing in a motion.
   */
  isZoomInMotion: boolean;
  /**
   * Indicates if the tilemap is beeing resizing.
   */
  isResizing: boolean;
};

export type ContextProps = {
  /**
   * The default size of a tile in pixels.
   */
  defaultTileSizePx: number;
  /**
   * Tilemap sprite schema.
   *
   * This three-dimensional matrix represents what sprites will be displayed for each column/row/layer of the tilemap.
   */
  spriteSchema?: string[][][];
};

/**
 * Tilemap context.
 */
export type Context = {
  /**
   * Current state of the tilemap.
   */
  readonly state: Readonly<ContextState>;
  /**
   * Set of actions tilemap consumers can use to interact with the tilemap.
   */
  readonly actions: Readonly<ContextActions>;
  /**
   * Set of computed values from current state usful for tilemap consumers.
   */
  readonly computed: Readonly<ContextComputedState>;
  /**
   * Props passed to the tilemap context provider.
   */
  readonly props: Readonly<ContextProps>;
};
