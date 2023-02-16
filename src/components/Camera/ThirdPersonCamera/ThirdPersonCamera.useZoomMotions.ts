import { useCallback, useEffect, useState } from 'react';
import { useTilemapContext } from '../../../hooks/useTilemapContext';
import { CurrentZoomMotion, MotionSettings, ZoomMotionRequest } from '../../../types/Motions';
import { createCurrentMotion } from '../../../utils/createCurrentMotion';

export function useZoomMotions(
    props: {
        isCameraDragging: boolean;
        isCameraInMotion: boolean;
        currentZoomMotion: CurrentZoomMotion | undefined;
        setCurrentZoomMotion: (motion: CurrentZoomMotion | undefined) => void;
    }
) {

    const [zoomMotionQueue, setZoomMotionQueue] = useState<ZoomMotionRequest[]>([]);

    const { state } = useTilemapContext();

    const { zoom } = state;

    const addZoomMotion = useCallback(
        (settings: MotionSettings, targetZoom: number) => {
            const motionRequest: ZoomMotionRequest = {
                settings,
                target: targetZoom,
            };
            const nextMotionQueue = [...zoomMotionQueue, motionRequest];
            setZoomMotionQueue(nextMotionQueue);
        },
        [zoomMotionQueue, setZoomMotionQueue]
    );

    const sliceZoomMotionQueue = useCallback(
        () => {
            const nextMotionQueue = zoomMotionQueue.slice(1);
            setZoomMotionQueue(nextMotionQueue);
        },
        [zoomMotionQueue, setZoomMotionQueue]
    );

    const endZoomMotion = useCallback(
        () => {
            props.setCurrentZoomMotion(undefined);
        },
        [props.setCurrentZoomMotion]
    );

    useEffect(() => {
        if (
            !props.currentZoomMotion &&
            zoomMotionQueue.length > 0 &&
            !props.isCameraInMotion
        ) {
            // add next motion from the queue

            const nextMotionRequest = zoomMotionQueue[0];

            const targetZoom = nextMotionRequest.target;
            const distance = Math.abs(zoom - targetZoom);

            const nextMotion = createCurrentMotion(
                zoom,
                targetZoom,
                nextMotionRequest.settings.speed,
                distance,
                nextMotionRequest.settings.maxDuration,
                nextMotionRequest.settings.easing
            );
            props.setCurrentZoomMotion(nextMotion);
            sliceZoomMotionQueue();
        }
    }, [
        props.currentZoomMotion,
        zoomMotionQueue,
        zoom,
        props.isCameraInMotion,
        props.setCurrentZoomMotion,
        sliceZoomMotionQueue,
    ]);


    return { 
        endZoomMotion,
        addZoomMotion,
        zoomMotionQueue,
    };
}
