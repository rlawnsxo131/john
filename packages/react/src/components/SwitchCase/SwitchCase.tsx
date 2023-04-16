export type SwitchCaseProps<Case extends string> = {
  caseBy: Partial<Record<Case, JSX.Element | null>>;
  value?: Case;
  defaultComponent?: JSX.Element | null;
};

/**
 * @description switch-case 구문을 선언적으로 사용할 수 있는 컴포넌트입니다
 *
 * @param value
 * @param caseBy
 * @param defaultComponent
 *
 * @returns JSX.Element | null
 */
export function SwitchCase<Case extends string>({
  value,
  caseBy,
  defaultComponent = null,
}: SwitchCaseProps<Case>) {
  if (!value) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
}
