import "./index.scss";

export function List({
  title,
  children,
  variant,
}: {
  title?: string;
  children: React.ReactNode;
  variant: "success" | "warning";
}): React.ReactElement {
  return (
    <div className={`list list--${variant}`}>
      {title && <strong>{title}</strong>}
      {children}
    </div>
  );
}
