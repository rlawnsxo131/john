/**
 * @description ref를 effect 처럼 실행하는 데 쓰이는 타입입니다.
 */
export type EffectRef<E extends HTMLElement = HTMLElement> = (
  element: E | null,
) => void;
export type CleanupCallback = () => void;
