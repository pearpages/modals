import { useState } from "react";
import "./index.scss";

interface Props {
  title: React.ReactNode;
  description?: string;
  variant?: "success" | "info" | "warning";
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export function Demo({
  title,
  description,
  variant = "info",
  defaultExpanded = true,
  children,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const variantClass = `demo--${variant}`;

  return (
    <div className={`demo ${variantClass}`}>
      <button
        className="demo__header"
        onClick={handleToggle}
        aria-expanded={isExpanded}
        type="button"
      >
        <div className="demo__title">
          <span className="demo__icon">{isExpanded ? "▼" : "▶"}</span>
          <h3 className="demo__heading">{title}</h3>
        </div>
        {description && <p className="demo__description">{description}</p>}
      </button>

      {isExpanded && <div className="demo__content">{children}</div>}
    </div>
  );
}
