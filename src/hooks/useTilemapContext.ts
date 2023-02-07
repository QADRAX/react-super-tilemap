import { useContext } from 'react';
import { PublicTilemapContext } from '../Context/TilemapContext';

export function useTilemapContext() {
  return useContext(PublicTilemapContext);
}
