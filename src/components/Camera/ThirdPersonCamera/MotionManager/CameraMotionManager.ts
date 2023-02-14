import { Position } from '../../../../types/Position';
import { MotionManager } from './MotionManager';

export class CameraMotionManager extends MotionManager<Position> {
  protected get position(): Position | undefined {
    return this.context.state.cameraPosition;
  }
  protected set position(value: Position | undefined) {
    this.context.actions.setCameraPosition(value!);
  }
  protected getNextPosition(
    progress: number,
    initialPosition: Position,
    targetPoisition: Position
  ): Position {
    const easingProgress = this.easing(progress);

    let x = initialPosition.x + (targetPoisition.x - initialPosition.x) * easingProgress;
    let y = initialPosition.y + (targetPoisition.y - initialPosition.y) * easingProgress;

    if (isNaN(x)) {
      x = initialPosition.x;
    }

    if (isNaN(y)) {
      y = initialPosition.y;
    }

    const result: Position = {
      x: initialPosition.x + (targetPoisition.x - initialPosition.x) * easingProgress,
      y: initialPosition.y + (targetPoisition.y - initialPosition.y) * easingProgress,
    };
    return result;
  }
}
