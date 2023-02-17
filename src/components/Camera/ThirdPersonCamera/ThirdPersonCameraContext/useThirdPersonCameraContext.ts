import { useContext } from "react";
import { ThirdPersonCameraContext } from "./ThirdPersonCameraContext";

export function useThirdPersonCameraContext() {
    return useContext(ThirdPersonCameraContext);
}