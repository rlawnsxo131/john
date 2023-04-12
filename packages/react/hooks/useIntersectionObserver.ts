import { useEffect } from 'react';

import { usePreservedReference } from './usePreservedReference';

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
  const preservedOptions = usePreservedReference(options);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          callback(entry);
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
  }, [ref, callback, preservedOptions]);
}
