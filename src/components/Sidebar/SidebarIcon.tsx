import CommitIcon from '@/icons/CommitIcon';
import ContributorIcon from '@/icons/ContributorIcon';
import QualityIcon from '@/icons/QualityIcon';
import ReviewIcon from '@/icons/ReviewIcon';
import HomeIcon from '@/icons/HomeIcon';

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
