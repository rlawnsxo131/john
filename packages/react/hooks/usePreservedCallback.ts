import { useCallback, useEffect, useRef } from 'react';

/**
 * @link https://legacy.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 *
 * @description 컴포넌트가 mount 되어 있는 동안 인자로 주어진 callback 함수의 레퍼런스를 완전히 보존합니다.
 *
 * @param callback
 * @returns Callback
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
