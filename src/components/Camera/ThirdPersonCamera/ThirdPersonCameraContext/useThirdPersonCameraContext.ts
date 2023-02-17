import { useContext } from "react";
import { ThirdPersonCameraContext } from "./ThirdPersonCameraContext";

/**
 * Use third person camera context.
 * 
 * This hook is used to access the third person camera context.
 * 
 * @public
 * 
 * @returns Third person camera context
 */
export function useThirdPersonCameraContext() {
    return useContext(ThirdPersonCameraContext);
}