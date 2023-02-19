import { TilemapEventChannel } from '../../../../EventBus/TilemapEventChannel';

export type TilemapWrapperProps = TilemapEventChannel & {
  children: React.ReactNode;
};

export type ControlEvent =
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.TouchEvent<HTMLDivElement>
  | React.WheelEvent<HTMLDivElement>;
