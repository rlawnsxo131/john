import { useEffect } from 'react';

/**
 * https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#advanced-configuration
 * @param ref
 * @param callback
 * @param options
 */
export function useIntersectionObserver<E extends HTMLElement = HTMLElement>(
  ref: React.RefObject<E>,
  callback: (entry: IntersectionObserverEntry, ...args: any[]) => any,
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
          callback(entry);
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
  }, [ref, callback, JSON.stringify(options)]);
}
