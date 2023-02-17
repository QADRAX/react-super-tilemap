import React from "react";
import { FunctionComponent } from "react";
import { TilemapElement } from "../../types/TilemapElement";
import { useSyncPosition } from "./Element.useSyncPosition";

export type ElementProps = {
    tilemapElement: TilemapElement;
    key: string;
};

export const Element: FunctionComponent<ElementProps> = (props) => {
    useSyncPosition(props.tilemapElement, props.key)
    return (
        <>
            {props.children}
        </>
    );
};