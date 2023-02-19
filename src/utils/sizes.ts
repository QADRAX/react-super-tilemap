import { MapDimensions } from '../types/MapDimensions';
import { Size } from '../types/Size';
import { DEFAULT_TILE_SIZE, ZOOM_RATIO } from '../constants';

export function getTileSize(zoom: number, tileSize: number = DEFAULT_TILE_SIZE): number {
  return tileSize * Math.pow(ZOOM_RATIO, zoom);
}

export function getMapSize(mapDimensions: MapDimensions, tileSize: number): Size {
  const width = mapDimensions.cols * tileSize;
  const height = mapDimensions.rows * tileSize;

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
  const cols = schema.length;
  const rows = schema[0]?.length ?? 0;

  const dims: MapDimensions = {
    cols,
    rows,
  };
  return dims;
}
