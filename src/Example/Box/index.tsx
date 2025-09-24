import "./index.scss";

export function Box({
  title,
  children,
  variant,
}: {
  title?: string;
  children: React.ReactNode;
  variant: "success" | "warning" | "danger";
}): React.ReactElement {
  return (
    <div className={`box box--${variant}`}>
      {title && <strong>{title}</strong>}
      {children}
    </div>
  );
}
