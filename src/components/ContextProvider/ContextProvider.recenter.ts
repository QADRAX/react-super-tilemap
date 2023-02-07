import { useEffect, useState } from "react";
import { MotionSettings } from "../../types/Motions";
import { ContextActions, ContextComputedState, ContextState } from "../../types/TilemapContext";
import { TilePosition } from "../../types/TilePosition";

export function recenterCameraOnResize(
    state: ContextState,
    computed: ContextComputedState,
    actions: ContextActions,
    motionSettings?: MotionSettings,
): void {
    const [lastPositionBeforeResize, setLastPositionBeforeResize] = useState<TilePosition | undefined>(undefined);

    useEffect(() => {
        if(!computed.isResizing) {
            setLastPositionBeforeResize(computed.cameraCenteredTilePosition);
        }
    }, [computed.isResizing, computed.cameraCenteredTilePosition]);

    useEffect(() => {
        if(!computed.isResizing && lastPositionBeforeResize && motionSettings){
            actions.addCameraMotionCentered(motionSettings);
        }
    }, [computed.isResizing]);
}