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
        {isBusy ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="flex justify-center gap-1">
            <div className="stat-value md:text-7xl">{value}</div>
            {subtitle && (
              <div
                className={`stat-desc ${getColorAttr(color)} md:text-xl text-wrap`}
              >
                {subtitle}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function getColorAttr(colorAttribute?: StatsCardProps['color']) {
  if (colorAttribute === 'positive') return 'text-success';
  if (colorAttribute === 'negative') return 'text-error';
  return 'text-neutral-content';
}
