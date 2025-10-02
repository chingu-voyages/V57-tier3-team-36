import CommitIcon from '@/icons/CommitIcon';
import ContributorIcon from '@/icons/ContributorIcon';
import QualityIcon from '@/icons/QualityIcon';
import ReviewIcon from '@/icons/ReviewIcon';
import SignInIcon from '@/icons/SignInIcon';
import SignOutIcon from '@/icons/SignOutIcon';
import HomeIcon from '@/icons/HomeIcon';

const icons = {
  Home: <HomeIcon />,
  Commits: <CommitIcon />,
  Contributors: <ContributorIcon />,
  Reviews: <ReviewIcon />,
  Quality: <QualityIcon />,
  'Sign In': <SignInIcon />,
  'Sign Out': <SignOutIcon />,
} as const;

type IconLabel = keyof typeof icons;

export default function SidebarIcon({ label }: { label: IconLabel }) {
  return icons[label] || null;
}
