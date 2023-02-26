import React from 'react';
import { CurrentMotion, MotionRequest } from '../../../../types/Motions';
import { TilePosition } from '../../../../types/TilePosition';
import { isEqual } from '../../../../utils/deepCompare';

export type ElementSyncProps = {
  nextPostion: TilePosition;
  position: TilePosition | undefined;
  motionQueue: MotionRequest<TilePosition>[];
  currentMotion: CurrentMotion<TilePosition> | undefined;
  setPostion: (position: TilePosition | undefined) => void;
  addMotion: (motion: TilePosition) => void;
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
        | MotionRequest<TilePosition>
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
