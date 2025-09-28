import "./Section.scss";

export const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="section">
    <h3 className="section__title">{title}</h3>
    <p className="section__description">{description}</p>
    {children}
  </div>
);
