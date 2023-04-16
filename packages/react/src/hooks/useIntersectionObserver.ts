import { useEffect, useState } from 'react';

import { usePreservedReference } from './usePreservedReference';

export type UseInterSectionObserverCallback = (
  entry: IntersectionObserverEntry,
  idx: number,
  entries: IntersectionObserverEntry[],
) => any;

export type UseIntersectionObserverOptions = IntersectionObserverInit & {
  freezeOnceVisible: boolean;
};

/**
 * @description IntersectionObserver 를 조금더 편하게 사용하기 위한 hook 입니다.
 * freezeOnceVisible 이 true 일 경우 첫 가시성 영역 노출만을 관찰합니다.
 *
 * @param ref observe 할 html element
 * @param callback UseInterSectionObserverCallback
 * @param options UseIntersectionObserverOptions
 *
 * @returns void
 */
export function useIntersectionObserver<E extends HTMLElement = HTMLElement>(
  ref: React.RefObject<E>,
  callback: UseInterSectionObserverCallback,
  options: UseIntersectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: [0],
    freezeOnceVisible: false,
  },
) {
  const [frozen, setFrozen] = useState(false);
  const preservedOptions = usePreservedReference(options);

  useEffect(() => {
    if (!ref.current) return;
    if (frozen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx, entries) => {
          if (entry.isIntersecting && preservedOptions.freezeOnceVisible) {
            if (!frozen) {
              setFrozen(true);
            }
          }
          callback(entry, idx, entries);
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
  }, [ref, callback, preservedOptions, frozen]);
}
