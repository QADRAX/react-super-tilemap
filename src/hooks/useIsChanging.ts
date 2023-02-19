import { useEffect, useState } from 'react';

/**
 * Hook that returns true if the target is changing based on the detectionTimeout
 *
 * @internal
 *
 * @param target Target to detect changes
 * @param detectionTimeout Timeout to detect changes
 * @returns isChanging
 */
export function useIsChanging<T>(target: T, detectionTimeout: number): boolean {
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;
    if (target) {
      setIsChanging(true);
      timeoutId = window.setTimeout(() => {
        setIsChanging(false);
      }, detectionTimeout);
    }
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [target, detectionTimeout]);

  return isChanging;
}
