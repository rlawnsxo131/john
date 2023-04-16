import type { BaseSyntheticEvent, RefObject } from 'react';
import { useEffect } from 'react';

export type UseOnClickOutsideHandler = (
  e: BaseSyntheticEvent | MouseEvent | TouchEvent,
) => void | Promise<void>;

/**
 * @description ref 로 전달받은 html element 에 포함되지 않는 영역을 클릭했을때,
 * 동작하는 이벤트를 정의하는 hook 입니다.
 *
 * @param ref
 * @param handler
 *
 * @returns void
 */
export function useOnClickOutside<E extends HTMLElement = HTMLElement>(
  ref: RefObject<E>,
  handler: UseOnClickOutsideHandler,
) {
  useEffect(() => {
    const listener: UseOnClickOutsideHandler = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
