import { useCallback, useEffect, useRef } from 'react';

/**
 * https://legacy.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 * @param callback
 * @returns
 */
export function usePreservedCallback<Callback extends (...args: any[]) => any>(
  callback: Callback,
): Callback {
  const callbackRef = useRef<Callback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: any[]) => {
      return callbackRef.current(...args);
    },
    [callbackRef],
  ) as Callback;
}
