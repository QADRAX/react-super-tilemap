import { TilePosition } from "../../../types/TilePosition";

export type ManualCameraProps = {
    /**
     * Camera position
     */
    position?: TilePosition;
    /**
     * Camera zoom
     */
    zoom?: number;
    /**
     * Flag that indicates if the tiles are clickable
     */
    clickable?: boolean;
};
