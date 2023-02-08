import { RecenterCameraMotionTarget } from "./Motions";
import { TilePosition } from "./TilePosition";

export function isTilePosition(motionTarget: RecenterCameraMotionTarget): motionTarget is TilePosition {
  return (motionTarget as TilePosition).col !== undefined;
}
