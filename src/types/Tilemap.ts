import { TilePosition } from "./TilePosition";

/**
 * Base tilemap settings.
 * 
 * @public
 */
export type TilemapSettings = {
    /**
     * Tilemap's drag speed sensitivity.
     * 
     * If not provided, the default value will be used.
     * If provided, it must be greater than 0.
     * 
     * @default 1
     */
    dragSensitivity?: number;
    /**
     * canvas's background color.
     * 
     * If not provided, the default value will be used.
     * If provided, it must be a valid CSS color.
     * 
     * @example
     * backgroundColor: "#000000"
     * backgroundColor: "rgb(0, 0, 0)"
     * backgroundColor: "rgba(0, 0, 0, 0.5)"
     * 
     * @default '#cbf0ff'
     */
    backgroundColor?: string;
};

/**
 * Tilemap events.
 * 
 * @public
 */
export type TilemapEvents = {
    /**
     * It will be called when a tile is clicked.
     * 
     * @param tile tile position
     */
    onTileClick?: (tile: TilePosition) => void;
    /**
     * It will be called when a tile is double clicked.
     * 
     * @param tile tile position
     */
    onTileDoubleClick?: (tile: TilePosition) => void;
    /**
     * It will be called when a tile is right clicked.
     * 
     * @param tile tile position
     */
    onTileContextMenu?: (tile: TilePosition) => void;
    /**
     * It will be called when a tile is hovered.
     * 
     * @param tile tile position
     */
    onTileHover?: (tile: TilePosition) => void;
    /**
     * It will be called when a tile is hovered out.
     * 
     * @param tile tile position
     */
    onTileHoverOut?: (tile: TilePosition) => void;
};

/**
 * Main React Tilemap component props.
 * 
 * @public
 */
export interface TilemapProps extends TilemapEvents {
    /**
     * Tilemap's settings.
     */
    settings?: TilemapSettings;
    /**
     * Flag to indicate if the tilemap zoom control is enabled.
     * 
     * @default true
     */
    zoomeable?: boolean;
    /**
     * Flag to indicate if the tilemap drag controls to move the camera are enabled.
     * 
     * @default true
     */
    draggable?: boolean;
};