import { MotionManager } from './MotionManager';

export class ZoomMotionManager extends MotionManager<number> {
  protected get position(): number {
    return this.context.state.zoom;
  }
  protected set position(value: number) {
    this.context.actions.setZoom(value);
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
