// TODO: sort out colors as I am using daisyUi defaults for now
export const PrStatusBadge = ({
  state,
}: {
  state?: "open" | "closed" | "merged";
}) => {
  if (state === "closed") {
    // Red is the default daisyUi color for "error"
    return <div className="badge badge-error">Closed</div>;
  }
  if (state === "open") {
    // Green is the default daisyUi color for "accent"
    return <div className="badge badge-accent">Open</div>;
  }
  if (state === "merged") {
    // The default daisyUi color is purple
    return <div className="badge badge-primary">Merged</div>;
  }

  return <div className="badge badge-neutral">Unknown</div>;
};
