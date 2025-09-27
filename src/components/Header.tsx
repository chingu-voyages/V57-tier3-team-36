'use client';

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="w-full flex p-4 items-center gap-4">
      {children}

      <h1 className="text-2xl font-bold tracking-tight">
        <span className="text-accent">Merge</span>
        <span>Force</span>
      </h1>
    </header>
  );
}
