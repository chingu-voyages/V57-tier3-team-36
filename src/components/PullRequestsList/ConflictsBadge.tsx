export default function ConflictsBadge({
  badgeStyle,
  hasConflicts,
  loading,
}: {
  badgeStyle: string;
  hasConflicts?: boolean;
  loading: boolean;
}) {
  const conflict = '⚠ conflicts' as const;
  const noConflict = 'no conflict' as const;
  const contentWidth = Math.max(noConflict.length, conflict.length);
  const conflictsBadgeStyle =
    `${badgeStyle} px-0 min-w-[${contentWidth}ch]` as const;

  return loading ? (
    <span
      aria-label="checking for file conflicts ..."
      className={`${conflictsBadgeStyle} skeleton`}
    ></span>
  ) : hasConflicts ? (
    <span
      aria-label="conflicting files detected"
      className={`${conflictsBadgeStyle} badge-warning`}
    >
      {conflict}
    </span>
  ) : (
    <span
      aria-label="no conflicts detected"
      className={`${conflictsBadgeStyle} badge-success`}
    >
      {noConflict}
    </span>
  );
}
