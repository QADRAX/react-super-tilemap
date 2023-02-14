import { TilemapControlsEvents } from "../../../../EventBus/TilemapEventChannel";

export type TilemapWrapperProps = TilemapControlsEvents & {
    children: React.ReactNode;
};

export type ControlEvent =
    | React.MouseEvent<HTMLDivElement, MouseEvent>
    | React.TouchEvent<HTMLDivElement>
    | React.WheelEvent<HTMLDivElement>;