import { AuthButton } from '@/components/AuthButton';
import { ReposList } from '@/components/ReposList';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Auth Section */}
        <div className="flex justify-end mb-6">
          <AuthButton />
        </div>

        {/* Repos List */}
        <ReposList />
      </main>
    </div>
  );
}