import { useContext } from 'react';
import { TilemapContext } from './TilemapContext';

export function useTilemapContext() {
  return useContext(TilemapContext);
}
