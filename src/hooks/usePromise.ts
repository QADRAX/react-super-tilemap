import { useEffect, useState } from 'react';

/**
 * Hook to manage async calls in function components preventing perform actions on unmounted components
 *
 * @internal
 */
export function usePromise<T>(
  /**
   * Target promise
   */
  promise: () => Promise<T>,
  /**
   * Initial value
   */
  defaultValue: T,
  /**
   * Dependency list to control the effect
   */
  deps: any[]
): [T, Error | null, boolean] {
  const [value, setValue] = useState<T>(defaultValue);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;

    setError(null);
    setIsPending(true);

    promise()
      .then((nextValue) => {
        if (isSubscribed) {
          if (nextValue != defaultValue) {
            setValue(nextValue);
          }
          setIsPending(false);
        }
      })
      .catch((nextError) => {
        if (isSubscribed) {
          setError(nextError);
          setValue(defaultValue);
          setIsPending(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [...deps, promise, defaultValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return [value, error, isPending];
}
