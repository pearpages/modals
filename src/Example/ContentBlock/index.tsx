import "./index.scss";

export const ContentBlock = ({
  key,
  title,
  text,
  className,
}: {
  key: number;
  title: string;
  text: string;
  className: "even" | "odd";
}) => (
  <div key={key} className={`content-block content-block--${className}`}>
    <h6 className="content-block__title">{title}</h6>
    <p className="content-block__text">{text}</p>
  </div>
);
