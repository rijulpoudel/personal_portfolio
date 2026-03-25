export default function GridBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          /* extend beyond edges so drift never shows a gap */
          inset: "-60px",
          backgroundImage: [
            "linear-gradient(to right, var(--border) 1px, transparent 1px)",
            "linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "60px 60px",
          opacity: 0.35,
          animation: "gridDrift 28s linear infinite",
        }}
      />
    </div>
  );
}
