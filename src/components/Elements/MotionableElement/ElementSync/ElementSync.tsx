import React from 'react';
import { CurrentMotion, MotionRequest } from '../../../../types/Motions';
import { isEqual } from '../../../../utils/deepCompare';
import { Position } from '../../../../types/Position';

export type ElementSyncProps = {
  nextPostion: Position;
  position: Position | undefined;
  motionQueue: MotionRequest<Position>[];
  currentMotion: CurrentMotion<Position> | undefined;
  setPostion: (position: Position | undefined) => void;
  addMotion: (motion: Position) => void;
};

/**
 * Syncs the element with the tilemap context.
 */
export class ElementSync extends React.PureComponent<ElementSyncProps> {
  componentDidUpdate(): void {
    this.syncElement();
  }

  componentDidMount(): void {
    this.syncElement();
  }

  syncElement(): void {
    const { nextPostion, position, motionQueue, currentMotion, setPostion, addMotion } = this.props;
    if (!position) {
      setPostion(nextPostion);
    } else {
      const lastMotionInQueue = motionQueue[motionQueue.length - 1] as
        | MotionRequest<Position>
        | undefined;

      const samePositionAsCurrent = isEqual(position, nextPostion);
      const samePositionAsCurrentMotion =
        currentMotion != undefined && isEqual(currentMotion.targetPosition, nextPostion);
      const samePositionAsLastMotionInQueue =
        lastMotionInQueue != undefined && isEqual(lastMotionInQueue.target, nextPostion);

      if (
        !samePositionAsCurrent &&
        !samePositionAsCurrentMotion &&
        !samePositionAsLastMotionInQueue
      ) {
        addMotion(nextPostion);
      }
    }
  }

  render() {
    return null;
  }
}
