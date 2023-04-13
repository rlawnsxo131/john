import type { RefObject } from 'react';
import { useEffect } from 'react';

import { usePreservedReference } from './usePreservedReference';

/**
 * https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#advanced-configuration
 * @description infiniteScroll 을 조금더 편하게 구현하기 위한 hook 입니다.
 * @param ref
 * @param fetchNext
 * @param options
 */
export function useInfiniteScroll<E extends HTMLElement = HTMLElement>(
  ref: RefObject<E>,
  fetchNext: () => void | Promise<void>,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  },
) {
  const preservedOptions = usePreservedReference(options);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNext();
          }
        });
      },
      {
        ...preservedOptions,
      },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref, fetchNext, preservedOptions]);
}
