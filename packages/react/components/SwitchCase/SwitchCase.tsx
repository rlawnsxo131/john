export type SwitchCaseProps<Case extends string> = {
  caseBy: Partial<Record<Case, JSX.Element | null>>;
  value?: Case;
  defaultComponent?: JSX.Element | null;
};

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
