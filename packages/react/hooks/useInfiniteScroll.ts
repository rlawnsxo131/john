import type { RefObject } from 'react';
import { useEffect } from 'react';

/**
 * https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#advanced-configuration
 * @param ref
 * @param fetchNext
 * @param options
 */
export function useInfiniteScroll<E extends HTMLElement = HTMLElement>(
  ref: RefObject<E>,
  fetchNext?: () => void,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  },
) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!fetchNext) return;
            fetchNext();
          }
        });
      },
      {
        ...options,
      },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, fetchNext, JSON.stringify(options)]);
}
