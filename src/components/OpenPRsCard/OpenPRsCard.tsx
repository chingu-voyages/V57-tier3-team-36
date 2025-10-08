'use client';

import { useEffect, useState } from 'react';
import StatsCard from '@/components/StatsCard/StatsCard';
//import reposJson from '@/mocks/data/repos-public.json';   // public repos' data
import reposJson from '@/mocks/data/our-project-repo.json'; // our project repo data
import type { Repo } from './openprs-helpers';
import { totalOpenPrs } from './openprs-helpers';

export default function OpenPrsStatsCard({
  // component exports a stats card
  data = reposJson as Repo[],
  repoName,
  title = 'Open PRs',
  color,
  subtitle,
}: {
  data?: Repo[];
  repoName?: string;
  title?: string;
  color?: 'positive' | 'negative';
  subtitle?: string;
}) {
  const [value, setValue] = useState<number | null>(null);

  const scoped = repoName
    ? (data as Repo[]).filter(
        repo => repo.name?.toLowerCase() === repoName.toLowerCase()
      )
    : (data as Repo[]);

  const computedSubtitle =
    scoped.length === 0
      ? undefined
      : scoped.length === 1
        ? `for ${scoped[0].name}`
        : 'for all repos';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const total = await totalOpenPrs(scoped);
      if (!cancelled) setValue(total);
    })();
    return () => {
      cancelled = true;
    };
  }, [scoped]);

  return (
    <StatsCard
      title={title}
      value={scoped.length === 0 ? '—' : value === null ? '—' : String(value)}
      subtitle={subtitle ?? computedSubtitle}
      color={color}
      isBusy={scoped.length > 0 && value === null}
    />
  );
}
