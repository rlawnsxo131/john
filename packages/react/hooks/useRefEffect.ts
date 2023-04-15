import type { DependencyList } from 'react';
import { useCallback, useRef } from 'react';

import { usePreservedCallback } from './usePreservedCallback';

export type EffectRef<E extends HTMLElement = HTMLElement> = (
  element: E | null,
) => void;

export type EffectRefCleanupCallback = () => void;
export type EffectRefCallback<E extends HTMLElement = HTMLElement> = (
  element: E,
) => EffectRefCleanupCallback | void;

/**
 * @link facebook/react#15176 - ref의 cleanup을 구현해달라고 요청하는 GitHub Issue
 *
 * @description useRef에 저장되는 값에 안전하게 이펙트를 발생시키고자 할 때 사용할 수 있는 hook입니다.
 * eslint react-hooks/exhaustive-deps 에 추가해서 안전하게 사용하세요.
 *
 * @param callback
 * @param deps
 * @returns EffectRef<E>
 */
export function useRefEffect<E extends HTMLElement = HTMLElement>(
  callback: EffectRefCallback<E>,
  deps: DependencyList,
): EffectRef<E> {
  const preservedCallback = usePreservedCallback(callback);
  const disposeRef = useRef<EffectRefCleanupCallback>(noop);

  const effect = useCallback(
    (element: E | null) => {
      disposeRef.current();
      disposeRef.current = noop;

      if (element) {
        const cleanup = callback(element);

        if (typeof cleanup === 'function') {
          disposeRef.current = cleanup;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [preservedCallback, ...deps],
  );

  return effect;
}

function noop() {
  // noop
}
