type StatsCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  color?: 'positive' | 'negative';
  isBusy?: boolean;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  color,
  isBusy,
}: StatsCardProps) {
  return (
    <div className="stats shadow w-full h-full">
      <div className="stat overflow-hidden">
        <div className="stat-title md:text-2xl text-wrap">{title}</div>
        <div className="flex justify-center gap-1 relative min-h-[4.5rem]">
          {/* Always render the value container to reserve space */}
          <div className="stat-value md:text-7xl flex items-center justify-center w-full">
            {isBusy ? (
              <span className="loading loading-spinner loading-xl" />
            ) : (
              value
            )}
          </div>
          {/* Always render the subtitle container to reserve space */}
          <div
            className={`stat-desc ${getColorAttr(color)} md:text-xl text-wrap`}
            style={{
              visibility: subtitle ? 'visible' : 'hidden',
              minHeight: '1.5rem',
            }}
          >
            {subtitle || ''}
          </div>
        </div>
      </div>
    </div>
  );
}

function getColorAttr(colorAttribute?: StatsCardProps['color']) {
  if (colorAttribute === 'positive') return 'text-success';
  if (colorAttribute === 'negative') return 'text-error';
  return 'text-neutral-content';
}
