import { TilemapElement, TilemapElementMap } from '../../../types/TilemapElement';
import { MapDimensions } from '../../../types/MapDimensions';
import { Size } from '../../../types/Size';
import { SpriteMap } from '../../../types/Sprite';
import { Position } from '../../../types/Position';
import { TilemapProps } from '../Tilemap.types';

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
   * Current zoom level.
   */
  zoom: number;
  /**
   * Sprite map.
   *
   * This object contains all the sprites that can be used in the tilemap.
   */
  spriteMap?: SpriteMap;
  /**
   * Tilmap element map.
   *
   * This object contains all the elements that are currently in the tilemap.
   */
  elementMap: TilemapElementMap;
  /**
   * Size of the canvas in pixels.
   */
  canvasSize?: Size;
  /**
   * Flag to indicate if the sprite map is loading.
   *
   * @remarks
   * This flag is used to prevent the tilemap from rendering before the sprite map is completely loaded.
   */
  isSpriteMapLoading: boolean;
};

/**
 * Set of actions tilemap that consumers can use to interact with the tilemap.
 */
export type ContextActions = {
  /**
   * Sets the camera position to the given position.
   *
   * @throws Error if the canvas has no size.
   *
   * @param position position to move the camera to
   */
  setCameraPosition: (position?: Position) => void;
  /**
   * Sets the current zoom level to the given zoom level
   * If the zoom level is less than 0, it will be set to 0.
   *
   * @param zoom zoom level
   */
  setZoom: (zoom: number) => void;
  /**
   * Sets the canvas size.
   * @param size canvas size
   */
  setCanvasSize: (size?: Size) => void;
  /**
   * Sets a tilemap element.
   *
   * @param elementKey key of the tilemap element to set
   * @param element tilemap element to set or undefined to remove the element
   */
  setTilemapElement: (elementKey: string, element?: TilemapElement) => void;
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
  cameraTilePosition?: Position;
  /**
   * Current position where the camera is centered in pixels.
   */
  cameraAbsolutePosition?: Position;
  /**
   * Indicates if the tilemap is beeing resizing.
   */
  isResizing: boolean;
  /**
   * Indicates if the tilemap is beeing zooming.
   */
  isZooming: boolean;
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
  readonly props: Readonly<TilemapProps>;
};
