import { useEffect } from "react";
import { useTilemapContext } from "../../../hooks/useTilemapContext";
import { ManualCameraProps } from "./ManualCamera";

export function useSyncPosition(
    position: ManualCameraProps["position"],
    zoom: ManualCameraProps["zoom"],
) {
    const { state, actions } = useTilemapContext();

    const {
        canvasSize,
    } = state;

    const {
        setCameraPosition,
        setZoom,
    } = actions;

    useEffect(() => {
        if (canvasSize) {
            setZoom(zoom ?? 0);
            setCameraPosition(position);
        }
    }, [zoom, position, canvasSize]); // eslint-disable-line react-hooks/exhaustive-deps
}