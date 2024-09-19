import { ReactNode } from 'react';
import { Position } from '../../../types/Position';

export type ManualCameraSettings = {
  /**
   * Camera position
   */
  position?: Position;
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
