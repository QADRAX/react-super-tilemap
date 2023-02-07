import { CurrentMotion } from '../../../types/Motions';
import { MotionManager } from './MotionManager';

export class ZoomMotionManager extends MotionManager<number> {
  protected get position(): number {
    return this.context.state.currentZoom;
  }
  protected set position(value: number) {
    this.context.actions.setCurrentZoom(value);
  }
  protected get motion(): CurrentMotion<number> | undefined {
    return this.context.state.currentZoomMotion;
  }
  protected getNextPosition(
    progress: number,
    initialPosition: number,
    targetPoisition: number
  ): number {
    const easingProgress = this.easing(progress);
    let result = initialPosition + (targetPoisition - initialPosition) * easingProgress;
    if(isNaN(result)) {
        result = initialPosition;
    }

    return result;
  }
}
