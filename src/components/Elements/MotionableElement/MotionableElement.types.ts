import { ReactNode } from 'react';
import { MotionSettings } from '../../../types/Motions';
import { ManualElementSettings } from '../ManualElement/ManualElement.types';

export type MotionableElementSettings = ManualElementSettings & {
  spriteKeyNorthMotion?: string;
  spriteKeySouthMotion?: string;
  spriteKeyEastMotion?: string;
  spriteKeyWestMotion?: string;
  motionSettings: MotionSettings;
};

export type MotionableElementEvents = {
  onMotionComplete?: () => void;
};

export type MotionableElementProps = MotionableElementSettings &
  MotionableElementEvents & {
    children?: ReactNode;
  };
