export function GridGroup({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        marginTop: "2rem",
      }}
    >
      {children}
    </div>
  );
}
