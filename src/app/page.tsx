import RepoDropdown from '@/components/TrackedRepo/RepoDropdown';

export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div>
        <div>
          <RepoDropdown />
        </div>
      </div>
    </div>
  );
}
