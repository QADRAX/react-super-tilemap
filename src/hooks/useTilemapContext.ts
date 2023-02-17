import { useContext } from 'react';
import { TilemapContext } from '../Context/TilemapContext';

export function useTilemapContext() {
  return useContext(TilemapContext);
}
