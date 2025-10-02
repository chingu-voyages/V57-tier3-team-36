type StatsCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  color?: ColorAttribute;
};

type ColorAttribute = 'positive' | 'negative' | string;

export default function StatsCard({
  title,
  value,
  subtitle,
  color,
}: StatsCardProps) {
  return (
    <div data-label="StatsCard" className="stats shadow w-full h-full">
      <div className="stat overflow-hidden">
        <div className="stat-title md:text-2xl text-wrap">{title}</div>
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
      </div>
    </div>
  );
}

function getColorAttr(colorAttribute?: ColorAttribute) {
  if (colorAttribute === 'positive') return 'text-success';
  if (colorAttribute === 'negative') return 'text-error';
  if (colorAttribute === 'neutral') return 'text-warning';
  return 'text-neutral-content';
}
