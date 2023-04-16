import throttle from 'lodash.throttle';
import { useEffect, useMemo } from 'react';

import { usePreservedCallback } from './usePreservedCallback';
import { usePreservedReference } from './usePreservedReference';

/**
 * @description lodash throttle 을 조금더 편하게 사용하기 위한 hook 입니다.
 *
 * @param callback
 * @param wait
 * @param options
 *
 * @returns DebouncedFunc<Callback>
 */
export function useThrottle<Callback extends (...args: any[]) => any>(
  callback: Callback,
  wait: number,
  options: Parameters<typeof throttle>[2] = {},
) {
  const preservedCallback = usePreservedCallback(callback);
  const preservedOptions = usePreservedReference(options);

  const throttled = useMemo(() => {
    return throttle(preservedCallback, wait, preservedOptions);
  }, [preservedCallback, preservedOptions, wait]);

  useEffect(() => {
    return () => {
      throttled.cancel();
    };
  }, [throttled]);

  return throttled;
}
