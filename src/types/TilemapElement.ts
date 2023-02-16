import { TilePosition } from "./TilePosition";

export type TilemapElementMap = Map<string, TilemapElement>;

export interface TilemapElement {
    tilePosition: TilePosition;
    spriteKey: string;
    renderLayer: number;
}