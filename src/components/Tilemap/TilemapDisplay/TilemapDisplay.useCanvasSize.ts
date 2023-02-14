import { useEffect, useMemo } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { _setCanvasSize } from '../../../Context/TilemapContext.actions';
import { useTilemapContext } from '../../../hooks/useTilemapContext';
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
    actions.setCanvasSize(canvasSize);
  }, [canvasSize, actions.setCanvasSize]);
}
