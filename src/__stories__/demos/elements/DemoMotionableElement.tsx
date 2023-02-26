import React, { FunctionComponent, useEffect } from "react";
import { ThirdPersonCamera } from "../../../components";
import { MotionableElement } from "../../../components/Elements/MotionableElement/MotionableElement";
import { Tilemap } from "../../../components/Tilemap/Tilemap";
import { MotionSettings } from "../../../types/Motions";
import { defaulThridPersonCameraArgs, defaultTilemapArgs } from "../../__defaultArgs__";
import { getFullfilledSchema } from "../../__MapGenerator__";

export type DemoMotionableElementProps = {
    rows: number;
    cols: number;
    baseSprite: string;
    elementSprite: string;
    elementCol: number;
    elementRow: number;
    motionSettings: MotionSettings,
    onMotionEnd: () => void;
}

export const DemoMotionableElement: FunctionComponent<DemoMotionableElementProps> = (props) => {
    const initialSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 1);
    const [schema, setSchema] = React.useState(initialSchema);

    useEffect(() => {
        const newSchema = getFullfilledSchema(props.cols, props.rows, props.baseSprite, 1);
        setSchema(newSchema);
    }, [props.cols, props.rows, props.baseSprite]);

    return (
        <Tilemap
            {...defaultTilemapArgs}
            tilmapScheme={schema}
        >
            <ThirdPersonCamera {...defaulThridPersonCameraArgs}>
            </ThirdPersonCamera>
            <MotionableElement
                element={{
                    tilePosition: {
                        col: props.elementCol,
                        row: props.elementRow,
                    },
                    spriteKey: props.elementSprite,
                    layer: 1,
                }}
                elementKey='element1'
                motionSettings={props.motionSettings}
                onMotionComplete={props.onMotionEnd}
            >
                <label>Element 1</label>
            </MotionableElement>
        </Tilemap>
    );
};