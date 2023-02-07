import { useContext } from "react";
import { InternalTilemapContext } from "../Context/InternalTilemapContext";

export function useInternalContext() {
    return useContext(InternalTilemapContext);
}