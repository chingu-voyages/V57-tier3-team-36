//const statsCardStyle = 'card bg-base-100 w-full px-3 py-2 h-28 md:h-full';

type StatsCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  color: ColorAttribute;
};

type ColorAttribute = 'positive' | 'negative' | string;

export default function StatsCard({
  title,
  value,
  subtitle,
  color,
}: StatsCardProps) {
  return (
    <div className="stats shadow h-full w-full">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        {subtitle && (
          <div className={`stat-desc ${getColorAttr(color)}`}>{subtitle}</div>
        )}
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
