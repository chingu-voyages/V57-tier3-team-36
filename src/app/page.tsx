import { AuthButton } from "@/components/AuthButton";
import { SearchComponent } from "@/components/search/SearchComponent";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Auth Section */}
        <div className="flex justify-end mb-6">
          <AuthButton />
        </div>

        {/* Repositories List Section */}
        <SearchComponent />
      </main>
    </div>
  );
}
