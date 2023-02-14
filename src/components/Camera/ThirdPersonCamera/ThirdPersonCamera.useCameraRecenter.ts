import { useEffect, useState } from "react";
import { useTilemapContext } from "../../../hooks/useTilemapContext";
import { ThirdPersonCameraProps } from "../../../types/ThirdPersonCamera";
import { TilePosition } from "../../../types/TilePosition";
import { isTilePosition } from "../../../utils/typeGuards";
import { CameraContext } from "./ThirdCameraContext/ThirdPersonCameraContext";

export function useCameraRecenter(
    addCameraMotion: CameraContext["addCameraMotion"],
    recenterCameraMotion?: ThirdPersonCameraProps["recenterCameraOnResize"],
    zoomCameraMotion?: ThirdPersonCameraProps["recenterCameraOnZoom"],
): void {
    useCameraRecenterBeforeResize(addCameraMotion, recenterCameraMotion);
    useCameraRecenterBeforeZoom(addCameraMotion, zoomCameraMotion);
}

export function useCameraRecenterBeforeResize(
    addCameraMotion: CameraContext["addCameraMotion"],
    resizeCameraMotion?: ThirdPersonCameraProps["recenterCameraOnResize"],
): void {
    const { computed } = useTilemapContext();

    useCameraRecenterBeforeFlag(
        computed.isResizing,
        computed.cameraTilePosition,
        addCameraMotion,
        resizeCameraMotion,
    );
}

export function useCameraRecenterBeforeZoom(
    addCameraMotion: CameraContext["addCameraMotion"],
    zoomCameraMotion?: ThirdPersonCameraProps["recenterCameraOnZoom"],
): void {
    const { computed } = useTilemapContext();

    useCameraRecenterBeforeFlag(
        computed.isZooming,
        computed.cameraTilePosition,
        addCameraMotion,
        zoomCameraMotion,
    );
}

export function useCameraRecenterBeforeFlag(
    flag: boolean,
    currentCameraTilePosition: TilePosition | undefined,
    addCameraMotion: CameraContext["addCameraMotion"],
    resizeCameraMotion?: ThirdPersonCameraProps["recenterCameraOnResize"],
): void {
    const [lastPositionBeforeFlagChange, setLastPositionBeforeFlagChange] = useState<
        TilePosition | undefined
    >(undefined);

    useEffect(() => {
        if (!flag) {
            setLastPositionBeforeFlagChange(currentCameraTilePosition);
        }
    }, [flag, currentCameraTilePosition]);

    useEffect(() => {
        if (!flag && lastPositionBeforeFlagChange && resizeCameraMotion) {
            const target = resizeCameraMotion.target;
            if (target == 'center' || isTilePosition(target)) {
                addCameraMotion(resizeCameraMotion.settings, target);
            } else if (target == 'last-center') {
                addCameraMotion(resizeCameraMotion.settings, lastPositionBeforeFlagChange);
            }
        }
    }, [flag]); // eslint-disable-line react-hooks/exhaustive-deps
}