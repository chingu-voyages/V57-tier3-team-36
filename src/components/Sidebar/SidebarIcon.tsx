import CommitIcon from '@/components/icons/CommitIcon';
import ContributorIcon from '@/components/icons/ContributorIcon';
import QualityIcon from '@/components/icons/QualityIcon';
import ReviewIcon from '@/components/icons/ReviewIcon';
import HomeIcon from '@/components/icons/HomeIcon';

const icons = {
  Home: <HomeIcon />,
  Commits: <CommitIcon />,
  Contributors: <ContributorIcon />,
  Reviews: <ReviewIcon />,
  Quality: <QualityIcon />,
} as const;

type IconLabel = keyof typeof icons;

export default function SidebarIcon({ label }: { label: IconLabel }) {
  return icons[label] || null;
}
