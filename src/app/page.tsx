import { AuthButton } from '@/components/AuthButton';

export default function HomePage() {
  return (
    <div>
      <nav className="flex items-center justify-between px-5 py-3">
        <h1>App Name Goes Here</h1>
        <AuthButton />
      </nav>
    </div>
  );
}
