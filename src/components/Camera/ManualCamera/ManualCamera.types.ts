import { ReactNode } from 'react';
import { TilePosition } from '../../../types/TilePosition';

export type ManualCameraSettings = {
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

export type ManualCameraProps = ManualCameraSettings & {
  children?: ReactNode;
};
