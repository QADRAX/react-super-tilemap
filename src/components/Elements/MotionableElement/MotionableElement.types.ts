import { MotionSettings } from "../../../types/Motions";
import { ManualElementProps } from "../ManualElement/ManualElement.types";

export type MotionableElementSettings = ManualElementProps & {
    motionSettings: MotionSettings;
};

export type MotionableElementEvents = {
    onMotionComplete?: () => void;
};

export type MotionableElementProps = MotionableElementSettings & MotionableElementEvents;