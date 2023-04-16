import { useEffect, useRef } from 'react';

/**
 * @description 한 단계 이전에 인자로 주어졌던 값을 반환합니다.
 * 이전 값이 없을 경우 인자로 주어진 값을 그대로 반환합니다.
 *
 * @param value
 *
 * @returns T
 */
export function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
