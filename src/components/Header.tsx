'use client';

export default function Header() {
  return (
    <header className="w-full p-4">
      <div
        data-label="HeaderContents"
        className="w-full flex items-center gap-4"
      >
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-accent">Merge</span>
          <span>Force</span>
        </h1>
      </div>
    </header>
  );
}
