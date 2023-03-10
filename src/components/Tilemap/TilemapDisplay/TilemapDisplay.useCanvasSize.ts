import { useEffect, useMemo } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { _setCanvasSize } from '../TilemapContext/TilemapContext.actions';
import { useTilemapContext } from '../TilemapContext/useTilemapContext';
import { Size } from '../../../types/Size';

/**
 * Sync the size of the given wrapper with the context state.
 *
 * @private
 *
 * @param targetRef wrapper ref
 */
export function useCanvasSize(targetRef?: React.MutableRefObject<unknown>): void {
  const { actions } = useTilemapContext();

  const { setCanvasSize } = actions;

  const { width, height } = useResizeDetector({
    targetRef,
  });

  const canvasSize = useMemo(() => {
    let result: Size | undefined;
    if (width && height) {
      result = {
        width,
        height,
      };
    }
    return result;
  }, [width, height]);

  useEffect(() => {
    setCanvasSize(canvasSize);
  }, [canvasSize, setCanvasSize]);
}
