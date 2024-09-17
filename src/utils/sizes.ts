import { MapDimensions } from '../types/MapDimensions';
import { Size } from '../types/Size';
import { DEFAULT_TILE_SIZE, ZOOM_RATIO } from '../constants';

export function getTileSize(zoom: number, tileSize: number = DEFAULT_TILE_SIZE): number {
  return tileSize * Math.pow(ZOOM_RATIO, zoom);
}

export function getMapSize(mapDimensions: MapDimensions, tileSize: number): Size {
  const width = mapDimensions.rows * tileSize;
  const height = mapDimensions.cols * tileSize;

  return {
    width,
    height,
  };
}

export function getMapDimensions(schema?: string[][][]): MapDimensions {
  if (!schema) {
    return {
      cols: 0,
      rows: 0,
    };
  }
  const rows = schema.length;
  const cols = schema[0]?.length ?? 0;

  const dims: MapDimensions = {
    cols,
    rows,
  };
  return dims;
}
