import { useCallback, useEffect, useState } from "react";
import { useTilemapContext } from "../../../hooks/useTilemapContext";
import { CameraMotionRequest, CurrentCameraMotion, MotionSettings } from "../../../types/Motions";
import { Position } from "../../../types/Position";
import { TilePosition } from "../../../types/TilePosition";
import { createCurrentMotion } from "../../../utils/createCurrentMotion";
import { getCameraPositionByTilePosition, getCenteredCameraPosition, getDistance } from "../../../utils/positions";

export function useCameraMotions(
    props: {
        isCameraDragging: boolean;
        isZoomInMotion: boolean;
        currentCameraMotion: CurrentCameraMotion | undefined;
        setCurrentCameraMotion: (motion: CurrentCameraMotion | undefined) => void;
    }
) {
    const { state, computed } = useTilemapContext();

    const {
        cameraPosition,
        canvasSize,
    } = state;

    const {
        tileSize,
        mapSize,
    } = computed;

    const [cameraMotionQueue, setCameraMotionQueue] = useState<CameraMotionRequest[]>([]);

    const addCameraMotion = useCallback(
        (settings: MotionSettings, position: TilePosition | 'center') => {
            const motionRequest: CameraMotionRequest = {
                settings,
                target: position,
            };
            const nextMotionStack = [...cameraMotionQueue, motionRequest];
            setCameraMotionQueue(nextMotionStack);
        },
        [cameraMotionQueue, setCameraMotionQueue]
    );

    const sliceCameraMotionQueue = useCallback(
        () => {
            const nextQueue = cameraMotionQueue.slice(1);
            setCameraMotionQueue(nextQueue);
        },
        [cameraMotionQueue, setCameraMotionQueue]
    );

    const endCameraMotion = useCallback(() => {
        props.setCurrentCameraMotion(undefined);
    }, [props.setCurrentCameraMotion]);

    useEffect(() => {
        if (
            !props.isCameraDragging &&
            !props.currentCameraMotion &&
            cameraMotionQueue.length > 0 &&
            cameraPosition &&
            !props.isZoomInMotion &&
            canvasSize
        ) {
            // add next motion from the queue

            const nextMotionRequest = cameraMotionQueue[0];

            const targetTilePosition = nextMotionRequest.target;
            let targetPosition: Position;
            if (targetTilePosition == 'center') {
                targetPosition = getCenteredCameraPosition(
                    canvasSize,
                    mapSize,
                )
            } else {
                targetPosition = getCameraPositionByTilePosition(
                    targetTilePosition,
                    tileSize,
                    canvasSize
                );
            }
            const distance = getDistance(cameraPosition, targetPosition);

            const nextMotion = createCurrentMotion(
                cameraPosition,
                targetPosition,
                nextMotionRequest.settings.speed,
                distance,
                nextMotionRequest.settings.maxDuration,
                nextMotionRequest.settings.easing
            );

            props.setCurrentCameraMotion(nextMotion);

            sliceCameraMotionQueue();
        }
    }, [
        cameraPosition,
        props.currentCameraMotion,
        cameraMotionQueue,
        props.isCameraDragging,
        props.setCurrentCameraMotion,
        sliceCameraMotionQueue,
        props.isZoomInMotion,
        canvasSize,
        tileSize,
        mapSize,
    ]);

    return {
        addCameraMotion,
        endCameraMotion,
        cameraMotionQueue,
    }
}