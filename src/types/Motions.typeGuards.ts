import { MoveCameraMotionTarget } from "./Motions";
import { Position } from "./Position";
import { TilePosition } from "./TilePosition";

export function isTilePosition(motionTarget: MoveCameraMotionTarget): motionTarget is TilePosition {
  return (motionTarget as TilePosition).col !== undefined;
}

export function isPosition(motionTarget: MoveCameraMotionTarget): motionTarget is Position {
  return (motionTarget as Position).x !== undefined;
}