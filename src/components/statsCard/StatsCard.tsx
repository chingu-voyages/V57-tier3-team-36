const statsCardStyle = 'card bg-base-100 w-full px-3 py-2 h-28 md:h-full';

type StatsCardProps = {
  title: string;
  value: string;
  auxiliaryStat?: {
    title: string;
    colorAttribute?: ColorAttribute;
  };
};

type ColorAttribute = 'positive' | 'negative' | 'neutral' | 'other';
export default function StatsCard({
  title,
  value,
  auxiliaryStat,
}: StatsCardProps) {
  return (
    <div className={statsCardStyle}>
      <div className="text-lg font-medium">{title}</div>
      <div className="flex gap-1 items-baseline">
        <div className="text-4xl font-bold lg:text-6xl">{value}</div>
        {auxiliaryStat && (
          <div
            className={`text-sm ${getColorAttr(auxiliaryStat.colorAttribute)} lg:text-lg`}
          >
            {auxiliaryStat.title}
          </div>
        )}
      </div>
    </div>
  );
}

function getColorAttr(colorAttribute?: ColorAttribute) {
  if (colorAttribute === 'positive') return 'text-green-500';
  if (colorAttribute === 'negative') return 'text-red-500';
  if (colorAttribute === 'neutral') return 'text-yellow-500';
  if (colorAttribute === 'other') return 'text-white';
  return '';
}
