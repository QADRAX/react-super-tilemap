import React from "react";
import { PublicTilemapContext } from "../../../Context/TilemapContext";
import { EasingFunction, getEasingFunction } from "../../../easing/easings";
import { Motion, MotionPosition } from "../../../types/Motions";

export interface MotionManagerProps {
    onMotionEnd?: () => void;
}

export abstract class MotionManager<T extends MotionPosition> extends React.PureComponent<MotionManagerProps> {
    static contextType = PublicTilemapContext;
    context!: React.ContextType<typeof PublicTilemapContext>;

    private animationFrameId?: number;

    protected abstract get position(): T | undefined;
    protected abstract set position(value: T | undefined);

    protected abstract get motion(): Motion<T> | undefined;

    protected get easing(): EasingFunction {
        return getEasingFunction(this.motion?.easing);
    }

    protected abstract getNextPosition(
        progress: number,
        initialPosition: T,
        targetPoisition: T
    ): T;

    protected motionLoop = (timestamp: number) => {
        if (this.motion) {
            const {
                startAt,
                endAt,
                initialPosition,
                targetPosition,
            } = this.motion;
            const duration = timestamp - startAt;
            const progress = duration / (endAt - startAt);
            if (progress < 1) {
                const nextPosition = this.getNextPosition(progress, initialPosition, targetPosition);
                this.position = nextPosition;
            } else {
                this.position = targetPosition;
                if (this.props.onMotionEnd) {
                    this.props.onMotionEnd();
                }
            }
        }
        this.animationFrameId = window.requestAnimationFrame(this.motionLoop);
    }

    componentDidMount() {
        this.animationFrameId = window.requestAnimationFrame(this.motionLoop);
    }

    componentWillUnmount() {
        if (this.animationFrameId) {
            window.cancelAnimationFrame(this.animationFrameId);
        }
    }


    render(): React.ReactNode {
        return null;
    }
}