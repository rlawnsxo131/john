type Props<Case extends string> = {
  caseBy: Partial<Record<Case, JSX.Element | null>>;
  value?: Case;
  defaultComponent?: JSX.Element | null;
};

export default function SwitchCase<Case extends string>({
  value,
  caseBy,
  defaultComponent = null,
}: Props<Case>) {
  if (!value) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
}
