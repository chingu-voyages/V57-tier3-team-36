import { AuthButton } from '@/components/AuthButton';

export default function HomePage() {
  return (
    <div className="p-8">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My App</h1>
        <AuthButton />
      </nav>

      <main>
        {/* Your home page content */}
        <p>Welcome to our app!</p>
      </main>
    </div>
  );
}
