import { useEffect, useMemo } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { _setCanvasSize } from '../../Context/TilemapContext.actions';
import { Size } from '../../types/Size';
import { useInternalContext } from '../../hooks/useInternalContext';

/**
 * Sync the size of the given wrapper with the context state.
 *
 * @private
 *
 * @param targetRef wrapper ref
 */
export function useCanvasSize(targetRef?: React.MutableRefObject<unknown>): void {
  const { dispatch } = useInternalContext();
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
    dispatch(_setCanvasSize(canvasSize));
  }, [canvasSize, dispatch]);
}
