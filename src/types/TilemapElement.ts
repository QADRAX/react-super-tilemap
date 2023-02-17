import { TilePosition } from "./TilePosition";

export type TilemapElementMap = Record<string, TilemapElement>;

export interface TilemapElement {
    tilePosition: TilePosition;
    spriteKey: string;
    layer: number;
}