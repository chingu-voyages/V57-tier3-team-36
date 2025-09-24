import CommitsIcon from '@/components/icons/CommitsIcon';

export const CommitsCounter = ({ commits }: { commits?: number }) => {
  return (
    <div className="flex items-center gap-1 ml-auto">
      <CommitsIcon />
      <p>{commits || 0}</p>
    </div>
  );
};
