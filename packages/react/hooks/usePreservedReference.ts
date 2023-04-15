import { useEffect, useState } from 'react';

type NotNullishValue = Record<string, any>;

/**
 * @description comparator로 비교했을 때 값이 변경되었을 때에만 레퍼런스를 변경하도록 합니다.
 * 기본은 JSON.stringify를 했을 때 동일한 값이면 레퍼런스를 유지합니다.
 *
 * @param value
 * @param areValuesEqual
 * @returns T
 *
 * @returns void
 */
export function usePreservedReference<T extends NotNullishValue>(
  value: T,
  areValuesEqual: (a: T, b: T) => boolean = areDeeplyEqual,
) {
  const [reference, setReference] = useState<T>(value);

  useEffect(() => {
    if (!areValuesEqual(value, reference)) {
      setReference(value);
    }
  }, [areValuesEqual, reference, value]);

  return reference;
}

function areDeeplyEqual<T extends NotNullishValue>(x: T, y: T) {
  return JSON.stringify(x) === JSON.stringify(y);
}
