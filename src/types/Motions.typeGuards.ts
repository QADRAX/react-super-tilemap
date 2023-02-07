import { ResizeCameraMotionTarget } from "./Motions";
import { TilePosition } from "./TilePosition";

export function isTilePosition(motionTarget: ResizeCameraMotionTarget): motionTarget is TilePosition {
  return (motionTarget as TilePosition).col !== undefined;
}
