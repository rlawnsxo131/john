import type { RefObject } from 'react';
import { useEffect } from 'react';

import { usePreservedReference } from './usePreservedReference';

/**
 * @description infiniteScroll 을 조금더 편하게 구현하기 위한 hook 입니다.
 * hook 내부에서 따로 fetchNext 에 대한 debounce, throttle 을 구현하지 않습니다.
 *
 * @param ref
 * @param fetchNext
 * @param options
 *
 * @returns void
 */
export function useInfiniteScroll<E extends HTMLElement = HTMLElement>(
  ref: RefObject<E>,
  fetchNext: () => void | Promise<void>,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: [0],
  },
) {
  const preservedOptions = usePreservedReference(options);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNext();
        }
      });
    }, preservedOptions);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, fetchNext, preservedOptions]);
}
