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
 * @param callback
 * @param deps
 * @returns
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
